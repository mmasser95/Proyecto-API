const Libro = require('../modelos/libro');
const path = require('path');
const servicios = require('../servicios');

function getLibros(req, res) {
  Libro.find({}, (err, libros) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!libros)
      return res
        .status(404)
        .send({ message: `No se han encontrado resultados` });

    return res.status(200).send({ libros });
  });
}

function getLibrosAutor(req, res) {
  let autorId = req.params.autorId;
  Libro.find({ Autor: autorId }, (err, libros) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!libros)
      return res
        .status(404)
        .send({ message: `No se han encontrado resultados` });
    return res.status(200).send({ libros });
  });
}

function getLibro(req, res) {
  let libroId = req.params.libroId;
  Libro.findOne({ _id: libroId }, (err, libro) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!libro)
      return res
        .status(404)
        .send({ message: `No se han encontrado resultados` });
    return res.status(200).send({ libro });
  });
}

function getLibroISBN(req, res, next) {
  let libroISBN = req.params.buscar;
  if (isNaN(libroISBN)) {
    return next();
  }
  Libro.find({ ISBN: libroISBN }, (err, libro) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (libro.length == 0) return next();
    return res.status(200).send({ libro });
  });
}

function getLibroTitulo(req, res, next) {
  let libroTitulo = req.params.buscar;
  Libro.find(
    { Titulo: new RegExp(`^.*${libroTitulo}.*$`, 'img') },
    (err, libroo) => {
      if (err) return res.status(500).send({ message: `Error ${err}` });
      if (libroo.length == 0) return next();
      return res.status(200).send({ libro: libroo });
    }
  );
}

function getLibroEditorial(req, res) {
  let libroEditorial = req.params.buscar;
  Libro.find(
    { Editorial: new RegExp(`^.*${libroEditorial}.*$`, 'img') },
    (err, libro) => {
      if (err) return res.status(500).send({ message: `Error ${err}` });
      if (libro.length == 0)
        return res
          .status(404)
          .send({ message: `No se han encontrado resultados` });
      return res.status(200).send({ libro });
    }
  );
}

async function postLibroImagen(req, res) {
  const libroId = req.params.libroId;
  const imagePath = path.join('/mnt/img/libro');
  const fileUpload = new servicios.Resize(imagePath);
  if (!req.file) {
    return res.status(400).send({ message: `Error no se ha subido el archivo` });
  }
  const filename = await fileUpload
    .save(req.file.buffer)
    .then((res1) => {
      Libro.findOneAndUpdate(
        { _id: libroId },
        { Imagen: path.join(imagePath, `${res1}`) },
        (err, res2) => {
          if (err) return res.status(500).send({ message: `Error ${err}` });
          return res
            .status(200)
            .send({ message: `Se ha creado subido correctamente ${res1}` });
        }
      );
    })
    .catch((err) => {
      console.log('err :', err);
      return res.status(500).send({ message: `Error ${err}` });
    });
}

function postLibro(req, res) {
  let post = req.body;
  console.log(post);
  let libro = new Libro({
    ISBN: post.ISBN,
    Titulo: post.Titulo,
    Edicion: post.Edicion,
    Editorial: post.Editorial,
    Autor: post.Autor,
    Genero: post.Genero,
    Tapa: post.Tapa,
    Sinopsis: post.Sinopsis,
    Paginas: post.Paginas,
    Fecha_Publicacion: post.Fecha_Publicacion,
    Fecha_Edicion: post.Fecha_Edicion,
  });
  libro.save((err, librosaved) => {
    if (err)
      return res.status(500).send({ message: `Error al guardar ${err}` });
    return res.status(200).send({ librosaved });
  });
}

function putLibro(req, res) {
  let libroId = req.params.libroId;
  let update = req.body;
  console.log(update);
  Libro.findOneAndUpdate({_id:libroId}, update, (err, libro_updated) => {
    if (err)
      return res.status(500).send({ message: `Error al guardar ${err}` });
    return res.status(200).send({ libro_updated });
  });
}

function deleteLibro(req, res) {
  let libroId = req.params.libroId;
  Libro.findOneAndRemove({_id:libroId}, (err, libro_deleted) => {
    if (err)
      return res.status(500).send({ message: `Error al guardar ${err}` });
    return res.status(200).send({ libro_deleted });
  });
}

function deleteLibroAutor(req, res) {
  let autorId = req.params.autorId;
  Libro.deleteMany({ Autor: autorId }, (err, deleted) => {
    if (err) return res.status(500).send({ message: `Error ${err}` })
    return res.status(200).send({ deleted, message: 'Borrado' })
  })
}

module.exports = {
  getLibros,
  getLibrosAutor,
  getLibro,
  getLibroTitulo,
  getLibroEditorial,
  getLibroISBN,
  postLibro,
  postLibroImagen,
  putLibro,
  deleteLibro,
  deleteLibroAutor,
};
