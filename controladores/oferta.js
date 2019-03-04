const Oferta = require("../modelos/oferta");

function getOfertas(req, res) {
  console.log("GET /api/oferta");
  Oferta.find({}, (err, ofertas) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!ofertas.length)
      return res.status(404).send({ message: `No se han encontrado ofertas` });
    return res.status(200).send({ ofertas });
  });
}

function getOferta(req, res) {
  let ofertaId = req.params.ofertaId;
  console.log(`/api/oferta/${ofertaId}`);
  Oferta.findOne({ _id: ofertaId }, (err, oferta) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!oferta)
      return res.status(404).send({ message: `No existe la oferta` });
    return res.status(200).send({ oferta });
  });
}

function getOfertasLibro(req, res) {
  let libroId = req.params.libroId;
  Oferta.find({ id_libro: libroId }, (err, ofertas) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!ofertas.length)
      return res.status(404).send({ message: `No existen ofertas` });
    return res.status(200).send({ ofertas });
  });
}

function postOferta(req, res) {
  let post = req.body;
  console.log("POST /api/oferta");
  let oferta = new Oferta({
    id_user: post.id_user,
    id_libro: post.id_libro,
    importe: post.importe,
    moneda: post.moneda,
    estado: post.estado
  });
  oferta.save((err, ofertas) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    return res.status(200).send({ ofertas });
  });
}

function putOferta(req, res) {
  let update = req.body;
  let ofertaId = req.params.ofertaId;
  console.log(`PUT /api/oferta/${ofertaId}`);
  console.log(update);
  Oferta.findOneAndUpdate({ _id: ofertaId }, (err, ofertau) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    return res.status(200).send({ ofertau });
  });
}

function deleteOferta(req, res) {
  let ofertaId = req.params.ofertaId;
  console.log(`DELETE /api/oferta/${ofertaId}`);
  Oferta.findOneAndDelete({ _id: ofertaId }, (err, odertad) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    return res.status(200).send({ odertad });
  });
}

module.exports = {
  getOfertas,
  getOferta,
  getOfertasLibro,
  postOferta,
  putOferta,
  deleteOferta
};
