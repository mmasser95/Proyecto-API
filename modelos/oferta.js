const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ofertaSchema = Schema({
  id_user: { type: Schema.Types.ObjectId, required: true },
  id_libro: { type: Schema.Types.ObjectId, required: true },
  importe: { type: Schema.Types.Decimal128, required: true },
  moneda: { type: String, required: true, enum: ['EUR', 'USD'] },
  estado: { type: String, required: true },
  Imagen: String,
});

module.exports = mongoose.model('Oferta', ofertaSchema);
