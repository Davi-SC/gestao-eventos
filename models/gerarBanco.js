import Ingresso from "./Ingresso.js";
import Pessoa from "./Pessoa.js";
import Usuario from "./Usuario.js";
import Compra from "./Compra.js";
import Evento from "./Evento.js";

await Pessoa.sync();
await Usuario.sync();
await Compra.sync();
await Ingresso.sync();
await Evento.sync();
