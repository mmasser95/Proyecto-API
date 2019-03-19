const Autor = require('../modelos/autor');

function getAutores(req, res) {
  console.log('GET /api/autor');
  Autor.find({}, (err, autores) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!autores.length)
      return res
        .status(404)
        .send({ message: 'No se han encontrado resultados' });
    console.log(autores);
    return res.status(200).send({ autores });
  });
}

function getAutor(req, res) {
  let autorId = req.params.autorId;
  console.log(`GET /api/autor/${autorId}`);
  Autor.findById(autorId, (err, autor) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!autor) return res.status(404).send({ message: `No existe el autor` });
    return res.status(200).send({ autor });
  });
}

function buscarAutorNombre(req, res, next) {
  let autorNombre = req.params.buscar;
  Autor.find({ Nombre: new RegExp(`^.*${autorNombre}`) }, (err, autor) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (autor.length === 0) return next();
    return res.status(200).send({ autor });
  });
}

function buscarAutorApellido(req, res) {
  let autorApellido = req.params.buscar;
  Autor.find(
    { Apellidos: new RegExp(`^.*${autorApellido}.*$`, 'img') },
    (err, autor) => {
      if (err) return res.status(500).send({ message: `Error ${err}` });
      if (autor.length == 0)
        return res.status(404).send({ message: `No hay resultados` });
      return res.status(200).send({ autor });
    }
  );
}

function postAutor(req, res) {
  let post = req.body;
  console.log('POST /api/autor');
  console.log(post);
  let autor = new Autor({
    Nombre: post.Nombre,
    Apellidos: post.Apellidos,
    Fecha_nacimiento: post.Fecha_nacimiento,
    Bio: post.Bio,
  });
  autor.save((err, autorsaved) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    return res.status(200).send({ autorsaved });
  });
}

function putAutor(req, res) {
  let autorId = req.params.autorId;
  let update = req.body;
  console.log(`PUT /api/autor/${autorId}`);
  console.log(update);
  Autor.findByIdAndUpdate(autorId, update, (err, autorupdated) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    return res.status(200).send({ autorupdated });
  });
}

function deleteAutor(req, res) {
  let autorId = req.params.deleteAutor;
  console.log(`DELETE /api/autor/${autorId}`);
  Autor.findByIdAndDelete(autorId, (err, res) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    return res.status(200).send({ message: 'Borrado' });
  });
}

module.exports = {
  getAutores,
  getAutor,
  buscarAutorNombre,
  buscarAutorApellido,
  postAutor,
  putAutor,
  deleteAutor,
};
