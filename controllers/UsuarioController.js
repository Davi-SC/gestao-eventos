import Usuario from "../models/Usuario.js";
import passport from "passport";
import Compra from "../models/Compra.js";
import Ingresso from "../models/Ingresso.js";
import Evento from "../models/Evento.js";

class UsuarioController {
  login = function (req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/admin",
      failureRedirect: "/usuario/login",
      failureFlash: true,
    })(req, res, next);
  };

  logout = function (req, res, next) {
    req.logout(function (erro) {
      res.redirect("/usuario/login");
    });
  };

  meusIngressos = async (req, res) => {
    try {
      const usuarioId = req.user.id;

      const compras = await Compra.findAll({
        where: { usuario_id: usuarioId },
        include: [
          {
            model: Ingresso,
            as: "ingresso",
            attributes: ["tipo", "preco"],
            include: [
              {
                model: Evento,
                as: "evento",
                attributes: ["nome", "data_evento"],
              },
            ],
          },
        ],
      });

      res.render("usuario/meusingressos", { compras });
    } catch (error) {
      console.error("Erro ao buscar ingressos comprados:", error);
      res.status(500).send("Erro ao carregar os ingressos.");
    }
  };
}

export default new UsuarioController();
