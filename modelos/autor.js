"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const autorSchema = Schema({
  Nombre: String,
  Apellidos: String,
  Fecha_nacimiento: Schema.Types.Date,
  Bio: String
});

module.exports = mongoose.model("Autor", autorSchema);
