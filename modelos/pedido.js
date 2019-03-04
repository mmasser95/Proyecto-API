const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let pedidoSchema = Schema({
  items: [
    {
      libroId: { type: Schema.Types.ObjectId, required: true },
      cantidad: Number,
      precioUnidad: Number,
      precioTotal: Number
    }
  ],
  total: Number,
  idUser: { type: Schema.Types.ObjectId, required: true },
  direccion: { type: Schema.Types.ObjectId, required: true },
  pagado: Boolean
});

module.exports = mongoose.model("Pedido", pedidoSchema);
