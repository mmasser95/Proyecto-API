const Biblioteca = require('../modelos/biblioteca');
function putLibro(req, res) {
  const libroId = req.params.libroId;
  const userId = res.locals.payload.sub;
  Biblioteca.findOne({ userId }, (err, biblioteca) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!biblioteca)
      return next();
    biblioteca.myBiblio.push({
      libroId,
    });
    biblioteca.save((err, saved) => {
      if (err) return res.status(500).send({ message: `Error ${err}` });
      return res.status(200).send({ message: 'Guardado', saved });
    });
  });
}
function deleteLibro(req, res) {
  const libroId = req.params.libroId;
  const userId = res.locals.payload.sub;
  Biblioteca.findOne({ userId }, (err, biblioteca) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!biblioteca) return res.status(404).send({ message: `Error ${err}` });
    const l = biblioteca.myBiblio
      .map((e) => {
        return e._id;
      })
      .indexOf(libroId);
    biblioteca.myBiblio.libroId(l).remove();
    biblioteca.save((err, saved) => {
      if (err) return res.status(500).send({ message: `Error ${err}` });
      return res.status(200).send({ message: `Borrado`, saved });
    });
  });
}
function crearBiblioteca(req, res) {
  const userId = res.locals.payload.sub;
  const biblioteca = new Biblioteca({
    userId,
    myBiblio: {},
  });
  biblioteca.save((err, saved) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    return next();
  });
}
function getMyBiblioteca(req, res) {
  const userId = res.locals.payload.sub;
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
  const userId = res.locals.payload.sub;
  const uBiblioteca = req.body.biblioteca;
  Biblioteca.findOne({ userId }, (err, biblioteca) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!biblioteca) biblioteca = new Biblioteca();
    biblioteca.userId = userId;
    biblioteca.myBiblio = uBiblioteca;
    biblioteca.save((err, saved) => {
      if (err) return res.status(500).send({ message: `Error ${err}` });
      return res.status(200).send({ saved });
    });
  });
}

function eliminarBiblioteca(req, res) {
  const userId = res.locals.payload.sub;
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

module.exports = {
  putLibro,
  deleteLibro,
  crearBiblioteca,
  getMyBiblioteca,
  actualizarBiblioteca,
  eliminarBiblioteca,
  limpiarBiblioteca,
};
