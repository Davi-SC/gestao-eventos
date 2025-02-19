import express from "express";
const router = express.Router();
import PessoaController from "../controllers/PessoaController.js";
import { logado } from "../config/regras.js";

router.get("/", logado, PessoaController.index);
router.get("/cadastrar", (req, res) => res.render("pessoa/cadastrar"));
router.post("/cadastrar", PessoaController.cadastrar);

export default router;
