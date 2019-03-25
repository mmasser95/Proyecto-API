const Libro = require('../modelos/libro');

function getLibros(req, res) {
  console.log('GET /api/libro');
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
  console.log(`GET /api/libro/${libroId}`);
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
  console.log(`GET /api/libro/buscar/${libroISBN}`);
  Libro.find({ ISBN: libroISBN }, (err, libro) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (libro.length == 0) return next();
    return res.status(200).send({ libro });
  });
}

function getLibroTitulo(req, res, next) {
  let libroTitulo = req.params.buscar;
  console.log(`GET /api/libro/buscar/${libroTitulo}`);
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
  console.log(`GET /api/libro/buscar/${libroEditorial}`);
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

function postLibro(req, res) {
  let post = req.body;
  console.log('POST /api/libro');
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
  console.log(`PUT /api/libro/${libroId}`);
  console.log(update);
  Libro.findByIdAndUpdate(libroId, update, (err, libro_updated) => {
    if (err)
      return res.status(500).send({ message: `Error al guardar ${err}` });
    return res.status(200).send({ libro_updated });
  });
}

function deleteLibro(req, res) {
  let libroId = req.params.libroId;
  console.log(`DELETE /api/libro/${libroId}`);
  Libro.findByIdAndRemove(libroId, (err, libro_deleted) => {
    if (err)
      return res.status(500).send({ message: `Error al guardar ${err}` });
    return res.status(200).send({ libro_deleted });
  });
}

module.exports = {
  getLibros,
  getLibrosAutor,
  getLibro,
  getLibroTitulo,
  getLibroEditorial,
  getLibroISBN,
  postLibro,
  putLibro,
  deleteLibro,
};
