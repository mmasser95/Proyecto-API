const Peticion = require('../modelos/peticiona');
const Autor = require('../modelos/autor');

function getPeticiones(req, res) {
  Peticion.find({}, (err, peticiones) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!peticiones.length)
      return res
        .status(404)
        .send({ message: `No se han encontrado resultados` });
    return res.status(200).send({ peticiones });
  });
}

function getPeticion(req, res) {
  let peticionId = req.params.peticionId;
  Peticion.findOne({ _id: peticionId }, (err, peticion) => {
    if (err) return res.status(509).send({ message: `Error ${err}` });
    if (!peticion)
      return res
        .status(404)
        .send({ message: `No se han encontrado resultados` });
    return res.status(200).send({ peticion });
  });
}

function postPeticion(req, res) {
  let post = req.body;
  let peticion = new Peticion({
    Nombre: post.Nombre,
    Apellidos: post.Apellidos,
    Fecha_nacimiento: post.Fecha_nacimiento,
    User: post.User,
  });
  peticion.save((err, saved) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    return res.status(200).send({ saved });
  });
}

function aceptarPeticion(req, res) {
  const peticionId = req.params.peticionId;
  Peticion.findOne({ _id: peticionId }, (err, peticion) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!peticion)
      return res
        .status(404)
        .send({ message: `No se ha encontrado la petición` });
    let nautor = new Autor(peticion);
    nautor.save((err, saved) => {
      if (err) return res.status(500).send({ message: `Error ${err}` });
      return res.status(200).send({ saved });
    });
  });
}

function putPeticion(req, res) {
  let peticionId = req.params.peticionId;
  let update = req.body;
  Peticion.findOneAndUpdate({ _id: peticionId }, update, (err, updated) => {
    if (err) return res.status(500).send({ message: `Error: ${err}` });
    return res.status(200).send({ message: `Actualizado` });
  });
}

function deletePeticion(req, res) {
  let peticionId = req.params.peticionId;
  Peticion.findOneAndDelete({ _id: peticionId }, (err, deleted) => {
    if (err) return res.status(500).send({ message: `Error: ${err}` });
    return res.status(200).send({ message: `Borrado` });
  });
}
module.exports = {
  getPeticiones,
  getPeticion,
  postPeticion,
  aceptarPeticion,
  putPeticion,
  deletePeticion,
};
