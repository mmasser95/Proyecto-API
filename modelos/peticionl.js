const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const peticionlSchema = Schema({
  ISBN: Number,
  Titulo: String,
  Edicion: Number,
  Editorial: String,
  Genero: String,
  Tapa: String,
  Sinopsis: String,
  Paginas: Number,
  Autor: Schema.Types.ObjectId,
  Fecha_Publicacion: Schema.Types.Date,
  Fecha_Edicion: Schema.Types.Date,
  Estado: Boolean,
  User: Schema.Types.ObjectId,
});

module.exports = mongoose.model('Peticionl', peticionlSchema);
