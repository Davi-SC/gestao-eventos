import banco from "../config/banco.js";
import Evento from "./Evento.js";

const Ingresso = banco.sequelize.define("ingressos", {
  id: {
    type: banco.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo: {
    type: banco.Sequelize.STRING(100),
  },
  preco: {
    type: banco.Sequelize.STRING(250),
  },
  quantidade: {
    type: banco.Sequelize.STRING(150),
  },
  status: {
    type: banco.Sequelize.INTEGER,
  },
});

Ingresso.belongsTo(Evento, {
  foreignKey: "evento_id",
  constraint: true,
  onDelete: "CASCADE",
  as: "evento",
});

Ingresso.sync();
export default Ingresso;
