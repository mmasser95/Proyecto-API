"use strict";
//Librerias necesarias para la aplicacion
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const api = require("./router");
const cors = require("cors");

//Especificamos el uso de las librerías
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
//Especificamos el uso del router y en la ruta en la que lo vamos a usar
app.use("/api", api);

//Exportamos la app para que funcione en index.js
module.exports = app;
