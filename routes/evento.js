import express from "express";
const router = express.Router();
import EventoController from "../controllers/EventoController.js";
import { logado } from "../config/regras.js";

router.get("/", EventoController.index);
router.get("/cadastrar", logado, (req, res) => {
  res.render("evento/cadastrar");
});
router.post("/cadastrar", logado, EventoController.cadastrar);
router.get("/editar/:id", logado, EventoController.editar);
router.post("/salvar", logado, EventoController.salvar);
router.get("/excluir/:id", logado, EventoController.excluir);
router.get("/meuseventos", logado, EventoController.eventosUsuario);

export default router;
