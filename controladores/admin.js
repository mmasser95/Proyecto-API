const servicios = require('../servicios/');
const Admin = require('../modelos/admin');
const bcrypt = require('bcrypt-node');

function getAdmins(req, res) {
  console.log('GET /api/admin');
  Admin.find({}, (err, admins) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!admins.length)
      return res
        .status(400)
        .send({ message: 'No se han encontrado resultados' });
    return res.status(200).send({ admins });
  });
}

function getAdmin(req, res) {
  let adminId = req.params.adminId;
  console.log(`GET /api/admin/${adminId}`);
  Admin.findById(adminId, (err, admin) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!admin) return res.status(404).send({ message: `No existe el admin` });
    return res.status(200).send({ admin });
  });
}

function postAdmin(req, res) {
  let post = req.body;
  console.log('POST /api/admin');
  console.log(post);
  let admin = new Admin({
    email: post.email,
    username: post.username,
    pass: post.pass,
  });
  admin.save((err, adminsaved) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    return res.status(200).send({ message:`Se ha registrado correctamente` });
  });
}

function putAdmin(req, res) {
  let adminId = req.params.adminId;
  let update = req.body;
  console.log(`PUT /api/admin/${adminId}`);
  console.log(update);
  Admin.findByIdAndUpdate(adminId, update, (err, res) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    return res.status(200).send({ res });
  });
}

function deleteAdmin(req, res) {
  let adminId = req.params.adminId;
  console.log(`DELETE /api/admin/${adminId}`);
  Admin.findByIdAndDelete(adminId, (err, res) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    return res.status(200).send({ message: 'Borrado' });
  });
}

function signIn(req, res) {
  let bdy = req.body;
  let query = Admin.findOne({ email: bdy.email });
  query.select('email nombre pass _id');
  query.exec((err, admin) => {
    if (err) return res.status(500).send({ message: `Error ${err}` });
    if (!admin)
      return res.status(404).send({ message: `El usuario no existe` });
    bcrypt.compare(bdy.pass, admin.pass, (err, result) => {
      if (err) return res.status(500).send({ message: `Error ${err}` });
      if (!result)
        return res.status(403).send({ message: `Contraseña incorrecta` });
      return res.status(200).send({
        token: servicios.createAdminToken(admin),
        idAdmin: admin._id,
        message: 'Se ha logueado correctamente',
      });
    });
  });
}

module.exports = {
  getAdmins,
  getAdmin,
  postAdmin,
  putAdmin,
  deleteAdmin,
  signIn,
};
