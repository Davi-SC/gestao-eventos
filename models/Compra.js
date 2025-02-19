import banco from "../config/banco.js";
import Usuario from "./Usuario.js";
import Ingresso from "./Ingresso.js";

const Compra = banco.sequelize.define("compra", {
  id: {
    type: banco.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  quantidade: {
    type: banco.Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
});

Compra.belongsTo(Ingresso, {
  foreignKey: "ingresso_id",
  constraint: true,
  as: "ingresso",
});
Compra.belongsTo(Usuario, {
  foreignKey: "usuario_id",
  constraint: true,
  as: "usuario",
});

Compra.sync();
export default Compra;
