import express from "express";
const router = express.Router();
import { logado } from "../config/regras.js";

import IngressoController from "../controllers/IngressoController.js";

router.get("/:id", logado, IngressoController.index);
router.get("/cadastrar/:evento_id", logado, (req, res) => {
  const { evento_id } = req.params;
  res.render("ingresso/cadastrar", { evento_id });
});
router.post("/cadastrar", logado, IngressoController.cadastrar);
router.post("/salvar", logado, IngressoController.salvar);
router.get("/editar/:id", logado, IngressoController.editar);
router.get("/excluir/:id", logado, IngressoController.excluir);

//Rotas para compra/devolução de ingressos
router.get("/comprar/:id", (req, res) => {
  const { id } = req.params;
  res.render("ingresso/comprar", { id });
});
router.post("/comprar/:id", logado, IngressoController.comprar);
// router.post("/devolver/:id", IngressoController.devolver);

export default router;
