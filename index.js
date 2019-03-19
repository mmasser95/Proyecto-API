//Libreria para la base de datos, la app y la config
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

//Conexion a la base de datos y inicialización de la app.js con la configuracion
mongoose.connect(config.db, { useNewUrlParser: true }, (err, res) => {
  if (err) {
    return console.log(`Error al conectar a la base de datos ${err}`);
  }
  console.log('Conexión OK');

  app.listen(config.port, () => {
    console.log(`Node funcionando en http://localhost:${config.port}`);
  });
});
