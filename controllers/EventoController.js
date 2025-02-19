import { where } from "sequelize";
import Evento from "../models/Evento.js";

class EventoController {
  index = async function (req, res) {
    const eventos = await Evento.findAll({
      order: [["descricao", "ASC"]],
      where: {
        status: 1,
      },
    });
    res.render("evento/index", { eventos: eventos });
  };

  cadastrar = function (req, res) {
    var evento = {
      nome: req.body.nome,
      descricao: req.body.descricao,
      data_evento: req.body.data_evento,
      cidade: req.body.cidade,
      endereco: req.body.endereco,
      status: 1,
      usuario_id: req.user.id,
    };

    Evento.create(evento).then(function (evento) {
      req.flash("success_msg", "Evento cadastrado com sucesso!");
      res.redirect("/evento");
    });
  };

  editar = function (req, res) {
    Evento.findOne({
      where: {
        id: req.params.id,
      },
    }).then(function (evento) {
      res.render("evento/editar", { evento: evento });
    });
  };

  salvar = function (req, res) {
    var evento = {
      nome: req.body.nome,
      descricao: req.body.descricao,
      data_evento: req.body.data_evento,
      cidade: req.body.cidade,
      endereco: req.body.endereco,
    };
    console.log("ID: " + req.body.id);
    Evento.update(evento, {
      where: {
        id: req.body.id,
      },
    }).then(function (evento) {
      res.redirect("/evento");
    });
  };

  excluir = function (req, res) {
    var evento = {
      status: 0,
    };
    Evento.update(evento, {
      where: {
        id: req.params.id,
      },
    }).then(function (evento) {
      res.redirect("/evento/meuseventos");
    });
  };

  eventosUsuario = async function (req, res) {
    try {
      var eventos = await Evento.findAll({
        where: { usuario_id: req.user.id, status: 1 },
      });
    } catch (error) {
      req.flash("error_msg", "Não logado!");
      res.redirect("/");
    }

    res.render("evento/meuseventos", { eventos });
  };
}

export default new EventoController();
