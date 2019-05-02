const Pedido = require('../modelos/pedido');

function getPedidos(req, res) {
  Pedido.find({}, (err, pedidos) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!pedidos.length)
      return res
        .status(404)
        .send({ message: `No se han encontrado resultados` });
    return res.status(200).send({ pedidos });
  });
}

function getMyPedidos(req, res) {
  const userId = res.locals.payload.sub;
  Pedido.findOne({ idUser: userId }, (err, pedidos) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!pedidos.length)
      return res
        .status(404)
        .send({ message: `No se han encontrado resultados` });
    return res.status(200).send({ pedidos });
  });
}

function getPedido(req, res) {
  let pedidoId = req.params.pedidoId;
  Pedido.findOne({ _id: pedidoId }, (err, pedido) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!pedido)
      return res
        .status(404)
        .send({ message: `No se han encontrado resultados` });
    return res.status(200).send({ pedido });
  });
}

function getPedidosUser(req, res) {
  let userId = req.params.userId;
  Pedido.find({ idUser: userId }, (err, pedidos) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!pedidos.length)
      return res
        .status(404)
        .send({ message: `No se han encontrado resultados` });
    return res.status(200).send({ pedidos });
  });
}

function postPedido(req, res) {
  let post = req.body;
  console.log(post);
  let pedido = new Pedido({
    total: post.total,
    idUser: res.locals.payload.sub,
    direccion: post.direccion,
    items: post.items,
  });
  pedido.save((err, pedidosaved) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    return res.status(200).send({ message: `Se ha guardado correctamente` });
  });
}

function putPedido(req, res) {
  let update = req.body;
  let pedidoId = req.params.pedidoId;
  console.log(update);
  Pedido.findOneAndUpdate({ _id: pedidoId }, (err, pedidoupdated) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    return res.status(200).send({ message: `Se ha actualizado correctamente` });
  });
}

function deletePedido(req, res) {
  let pedidoId = req.params.pedidoId;
  Pedido.findOneAndDelete({ _id: pedidoId }, (err, pedidodeleted) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    return res.status(200).send({ message: `Se ha borrado correctamente` });
  });
}

module.exports = {
  getPedidos,
  getPedido,
  getMyPedidos,
  getPedidosUser,
  postPedido,
  putPedido,
  deletePedido,
};
