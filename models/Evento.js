import banco from "../config/banco.js";
import Usuario from "./Usuario.js";

const Evento = banco.sequelize.define("eventos", {
  id: {
    type: banco.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: banco.Sequelize.STRING(100),
  },
  descricao: {
    type: banco.Sequelize.STRING(400),
  },
  data_evento: {
    type: banco.Sequelize.DATEONLY,
  },
  cidade: {
    type: banco.Sequelize.STRING(100),
  },
  endereco: {
    type: banco.Sequelize.STRING(250),
  },
  status: {
    type: banco.Sequelize.INTEGER,
  },
});

Evento.belongsTo(Usuario, {
  foreignKey: "usuario_id",
  constraint: true,
  onDelete: "CASCADE",
  as: "usuario",
});

Evento.sync();

export default Evento;
