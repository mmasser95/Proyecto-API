const User = require('../modelos/user');
const servicios = require('../servicios/');
const bcrypt = require('bcrypt-node');
const fs = require('fs');
const path = require('path');

function getUsers(req, res) {
  console.log('GET /api/user');
  User.find({}, (err, users) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!users.length)
      return res
        .status(404)
        .send({ message: `No se han encontrado resultados` });
    return res.status(200).send({ users });
  });
}

function getDireccionesUser(req, res) {
  let userId = req.params.userId;
  console.log(`GET /api/user/${userId}/direccion`);
  User.findOne({ _id: userId }, (err, user) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!user) return res.status(404).send({ message: `No existe el usuario` });
    if (!user.direccion)
      return res.status(404).send({ message: `No existen direcciones` });
    return res.status(200).send({ direccion: user.direccion });
  });
}

function getUser(req, res) {
  let userId = req.params.userId;
  console.log(`/api/user/${userId}`);
  User.findOne({ _id: userId }, (err, user) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!user) return res.status(404).send({ message: `No existe el usuario` });
    return res.status(200).send({ user });
  });
}

function postUser(req, res) {
  let post = req.body;
  console.log('POST /api/user');
  console.log(post);
  let user = new User({
    email: post.email,
    username: post.username,
    pass: post.pass,
  });
  user.save((err, usersaved) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    fs.readFile(
      path.join(__dirname, '../emails/registro.html'),
      (err, data) => {
        if (err)
          return res
            .status(500)
            .send({ message: `Error al abrir el archivo HTML ${err}` });
        //data = data.replace('|USERNAME|', usersaved.username);
        let mail = servicios.sendEmail(
          usersaved.email,
          'Registro completado',
          data
        );
        return res
          .status(200)
          .send({ message: `Se ha registrado correctamente`, mail });
      }
    );
  });
}

function postDireccionUser(req, res) {
  let post = req.body;
  console.log('POST /api/user/direccion');
  console.log(post);
  User.findOne({ _id: post.id }, (err, user) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!user)
      return res
        .status(404)
        .send({ message: `No se han encontrado resultados` });
    user.direccion.push({
      calle: post.calle,
      numero: post.numero,
      piso: post.piso,
      puerta: post.puerta,
      escalera: post.escalera,
    });
    console.log(user);
    User.findOneAndUpdate({ _id: post.id }, user, (err, userupdated) => {
      if (err) return res.status(500).send({ message: `Error ${err}` });
      return res.status(200).send({ message: `Información actualizada` });
    });
  });
}

function putDireccionUser(req, res) {
  let userId = req.params.userId;
  let direccionId = req.params.direccionId;
  let update = req.body;
  console.log(`PUT /api/user/${userId}/direccion/${direccionId}`);
  console.log(update);
  User.findOne({ _id: userId }, (err, user) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!user)
      return res
        .status(404)
        .send({ message: `No se han encontrado resultados` });
    user.direccion.id(direccionId).remove();
    user.direccion.push([
      {
        calle: update.calle,
        numero: update.numero,
        piso: update.piso,
        puerta: update.puerta,
        escalera: update.escalera,
      },
    ]);
    user.save((err, usersaved) => {
      if (err) return res.status(500).send({ message: `Error ${err}` });
      return res.status(200).send({ usersaved });
    });
  });
}

function putUser(req, res) {
  let userId = req.params.userId;
  console.log(`PUT /api/user/${userId}`);
  let update = req.body;
  console.log(update);
  User.findOne({ _id: userId }, (err, user) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!user)
      return res
        .status(404)
        .send({ message: `No se han encontrado resultados` });
    user.pass = update.pass;
    user.save((err, usersaved) => {
      if (err) return res.status(500).send({ message: `Error ${err}` });
      return res.status(200).send({ usersaved });
    });
  });
}

function putUserEmail(req, res) {
  let userEmail = req.params.userEmail;
  let update = req.body;
  console.log(update);
  User.findOne({ email: userEmail }, (err, user) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!user)
      return res
        .status(404)
        .send({ message: `No se han encontrado resultados` });
    user.pass = update.pass;
    user.save((err, usersaved) => {
      if (err) return res.status(500).send({ message: `Error ${err}` });
      return res.status(200).send({ usersaved });
    });
  });
}

function deleteUser(req, res) {
  let userId = req.params.userId;
  console.log(`DELETE /api/user/${userId}`);
  User.findOneAndDelete({ _id: userId }, (err, userdeleted) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    return res.status(200).send({ userdeleted });
  });
}

function deleteDireccionUser(req, res) {
  let userId = req.params.userId;
  let direccionId = req.params.direccionId;
  console.log(`PUT /api/user/${userId}/direccion/${direccionId}`);
  User.findOne({ _id: userId }, (err, user) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!user)
      return res
        .status(404)
        .send({ message: `No se han encontrado resultados` });
    user.direccion.id(direccionId).remove();
    user.save((err, usersaved) => {
      if (err) return res.status(500).send({ message: `Error ${err}` });
      return res.status(200).send({ usersaved });
    });
  });
}

function signIn(req, res) {
  let post = req.body;
  let query = User.findOne({ email: post.email });
  query.select('email nombre pass _id');
  query.exec((err, user) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!user) return res.status(404).send({ message: `El usuario no existe` });
    bcrypt.compare(post.pass, user.pass, (err, result) => {
      if (err) return res.status(500).send({ message: `Error ${err}` });
      if (!result)
        return res.status(403).send({ message: `Contraseña incorrecta` });
      return res.status(200).send({
        token: servicios.createToken(user),
        idUser: user._id,
        message: 'Se ha logueado correctamente',
      });
    });
  });
}

function verificarUserLogueado(req, res) {
  let post = req.body;
  servicios
    .decodeToken(post.token)
    .then((result) => {
      console.log(result)
      return res
        .status(200)
        .send({
          token: servicios.createToken({ _id: result.sub }),
          message: `Token renovado`,
        });
    })
    .catch((err) => {
      return res.status(err.status).send(err.message);
    });
}

module.exports = {
  getUsers,
  getUser,
  postUser,
  putUser,
  putUserEmail,
  deleteUser,
  signIn,
  getDireccionesUser,
  postDireccionUser,
  putDireccionUser,
  deleteDireccionUser,
  verificarUserLogueado,
};
