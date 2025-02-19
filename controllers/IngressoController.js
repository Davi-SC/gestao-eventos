import Ingresso from "../models/Ingresso.js";

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

  comprar = async function (req, res) {
    const { id } = req.parms;
    const { quantidade } = req.body;
    const ingresso = await Ingresso.findAll({
      where: { id },
    });

    if (ingresso.quantidade < quantidade) {
      return req.flash("error_msg", "Quantidade ingressos é insuficiente");
    }

    await Ingresso.update(
      { quantidade: ingresso.quantidade - quantidade },
      { where: { id } }
    );

    await Compra.create({
      ingresso_id: id,
      usuario_id: req.user.id,
      quantidade,
      data_compra: new Date(),
      status: "comprado",
    });

    req.flash("success_msg", "Ingressos comprados com sucesso!");
    res.redirect(`/ingresso/${ingresso.evento_id}`);
  };
}

export default new IngressoController();
