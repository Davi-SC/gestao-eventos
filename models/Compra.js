import banco from "../config/banco.js";
import Evento from "./Evento.js";
import Usuario from "./Usuario.js";
import Ingresso from "./Ingresso.js";

const Compra = banco.sequelize.define("compra", {
  id: {
    type: banco.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ingresso_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Ingresso,
      key: "id",
    },
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: "id",
    },
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  data_compra: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM("comprado", "devolvido"),
    defaultValue: "comprado",
  },
});

Compra.belongsTo(Ingresso, { foreignKey: "ingresso_id" });
Compra.belongsTo(Usuario, { foreignKey: "usuario_id" });

Compra.sync();
export default Compra;
