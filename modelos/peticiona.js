const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const peticionaSchema = Schema({
  Nombre: String,
  Apellidos: String,
  Fecha_nacimiento: Schema.Types.Date,
  Bio: String,
  Estado:Number,
  User: Schema.Types.ObjectId,
});

module.exports = mongoose.model('Peticiona', peticionaSchema);
