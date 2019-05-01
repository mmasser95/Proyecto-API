const Peticion = require('../modelos/peticionl');
const Libro = require('../modelos/libro');

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
    Estado: post.Estado,
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
        .send({ message: `No se ha encontrado la peticion` });
    let nlibro = new Libro(peticion);
    peticion.Estado = 2;
    peticion.save((err, saved) => {
      if (err) return res.status(500).send({ message: `Error ${err}` });
      nlibro.save((err, saved) => {
        if (err) return res.status(500).send({ message: `Error ${err}` });
        return res.status(200).send({ saved });
      });
    });
  });
}

function denegarPeticion(req,res) {
  const peticionId=req.params.peticionId
  Peticion.findOne({_id:peticionId},(err,peticion)=>{
    if(err) return res.status(500).send({message:`Error ${err}`});
    if(!peticion) return res.status(404).send({message:`No se han encontrado resultados`});
    peticion.Estado=1;
    peticion.save((err,saved)=>{
      if(err)return res.status(500).send({message:`Error ${err}`})
      return res.status(200).send({saved});
    })
  })
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
  denegarPeticion,
  putPeticion,
  deletePeticion,
};
