const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let pedidoSchema = Schema({
  items: [
    {
      ofertaId: { type: Schema.Types.ObjectId, required: true },
      precio: { type: Schema.Types.Decimal128, required: true },
    },
  ],
  total: Number,
  idUser: { type: Schema.Types.ObjectId, required: true },
  direccion: { type: Schema.Types.ObjectId, required: true },
  estado: Number,
});

module.exports = mongoose.model('Pedido', pedidoSchema);
