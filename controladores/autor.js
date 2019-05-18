const Autor = require('../modelos/autor');
const path = require('path');
const servicios = require('../servicios');

function getAutores(req, res) {
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
  Autor.findOne({ _id: autorId }, (err, autor) => {
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

async function putAutorImagen(req, res) {
  const autorId = req.params.autorId;
  const imagePath = path.join('/mnt/img/autor');
  const fileUpload = new servicios.Resize(imagePath);
  if (!req.file) {
    res.status(401).send({ message: `Error no se ha subido el archivo` });
  }
  await fileUpload
    .save(req.file.buffer)
    .then((res1) => {
      let n = res1;
      Autor.findOneAndUpdate(
        { _id: autorId },
        { Imagen: imagePath + n },
        (err, res2) => {
          if (err) return res.status(500).send({ message: `Error ${err}` });
          return res
            .status(200)
            .send({ message: `Se ha subido la imagen correctamente` });
        }
      );
    })
    .catch((err) => {
      console.log('err :', err);
      return res.status(500).send({ message: `Error: ${err}` });
    });
}

function putAutor(req, res) {
  let autorId = req.params.autorId;
  let update = req.body;
  Autor.findOneAndUpdate({ _id: autorId }, update, (err, autorupdated) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    return res.status(200).send({ autorupdated });
  });
}

function deleteAutor(req, res) {
  let autorId = req.params.deleteAutor;
  Autor.findOneAndDelete({ _id: autorId }, (err, res) => {
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
  putAutorImagen,
  deleteAutor,
};
