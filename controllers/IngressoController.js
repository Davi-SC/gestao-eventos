import Ingresso from "../models/Ingresso.js";
import Compra from "../models/Compra.js";

class IngressoController {
  index = async function (req, res) {
    const { id } = req.params;
    const ingressos = await Ingresso.findAll({
      where: {
        evento_id: id,
        status: 1,
      },
      order: [["preco", "ASC"]],
    });
    res.render("ingresso/index", { ingressos, evento_id: id });
  };

  cadastrar = function (req, res) {
    const { tipo, preco, quantidade, evento_id } = req.body;
    var ingresso = {
      tipo,
      preco,
      quantidade,
      status: 1,
      evento_id,
    };
    Ingresso.create(ingresso).then(function (ingresso) {
      req.flash("success_msg", "Ingresso cadastrado com sucesso!");
      res.redirect(`/ingresso/${evento_id}`);
    });
  };

  salvar = function (req, res) {
    const { tipo, preco, quantidade } = req.body;
    var ingresso = {
      tipo,
      preco,
      quantidade,
      status: 1,
    };

    Ingresso.update(ingresso, {
      where: {
        id: req.body.id,
      },
    }).then(function (ingresso) {
      res.redirect("/evento/meuseventos");
    });
  };

  editar = function (req, res) {
    const { id } = req.params;
    Ingresso.findOne({
      where: {
        id,
      },
    }).then(function (ingresso) {
      res.render("ingresso/editar", { ingresso: ingresso });
    });
  };

  excluir = function (req, res) {
    var ingresso = {
      status: 0,
    };
    Ingresso.update(ingresso, {
      where: {
        id: req.params.id,
      },
    }).then(function (ingresso) {
      res.redirect("/evento/meuseventos");
    });
  };

  listarPorEvento = async (req, res) => {
    const { id } = req.params;
    const ingresso = await Ingresso.findAll({
      where: { evento_id: id },
    });
    res.render("/ingresso/index", { ingresso, evento_id: id });
  };

  //Compra/devolução dos ingressos

  comprar = async (req, res) => {
    const { id } = req.params;

    const ingressos = await Ingresso.findAll({
      where: {
        evento_id: id,
        status: 1,
      },
      order: [["preco", "ASC"]],
    });

    res.render("ingresso/comprar", { ingressos, evento_id: id });
  };

  processarCompra = async (req, res) => {
    const { tipo, quantidade } = req.body;

    const ingresso = await Ingresso.findOne({
      where: { id: tipo },
    });

    if (!ingresso) {
      return res.status(404).send("Ingresso não encontrado.");
    }

    if (ingresso.quantidade < quantidade) {
      return res
        .status(400)
        .send("Quantidade insuficiente de ingressos disponíveis.");
    }

    await Ingresso.update(
      { quantidade: ingresso.quantidade - quantidade },
      { where: { id: tipo } }
    );

    await Compra.create({
      ingresso_id: tipo,
      usuario_id: req.user?.id || null,
      quantidade,
    });

    req.flash("success_msg", "Ingressos comprados com sucesso!");
    res.redirect("/admin");
  };
}

export default new IngressoController();
