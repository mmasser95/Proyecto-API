const Biblioteca = require('../modelos/biblioteca');

function getMyBiblioteca(req, res) {
  const userId = req.params.userId;
  Biblioteca.findOne({ userId }, (err, biblioteca) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!biblioteca)
      return res
        .status(404)
        .send({ message: `No se ha encontrado la biblioteca` });
    return res.status(200).send({ biblioteca });
  });
}

function actualizarBiblioteca(req, res) {
  const userId = req.params.userId;
  const uBiblioteca = req.body;
  Biblioteca.findOneAndUpdate({ userId }, uBiblioteca, (err, biblioteca) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    return res
      .status(200)
      .send({ message: 'Se ha actualizado la biblioteca', biblioteca });
  });
}

function eliminarBiblioteca(req, res) {
  const userId = req.params.userId;
  Biblioteca.findOneAndDelete({ userId }, (err, biblioteca) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    return res
      .status(200)
      .send({ message: `Biblioteca eliminada` }, biblioteca);
  });
}

function limpiarBiblioteca(req, res) {
  const userId = req.params.userId;
  Biblioteca.findOne({ userId }, (err, biblioteca) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!biblioteca)
      return res
        .status(404)
        .send({ message: `No se han encontrado coincidencias` });
    biblioteca.myBiblio = [];
    biblioteca.save((err, sbiblio) => {
      if (err) return res.status(500).send({ message: `Error ${err}` });
      return res
        .status(200)
        .send({ message: `Biblioteca limpiada`, biblioteca: sbiblio });
    });
  });
}

module.exports={
  getMyBiblioteca,
  actualizarBiblioteca,
  eliminarBiblioteca,
  limpiarBiblioteca,
}