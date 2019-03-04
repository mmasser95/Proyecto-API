//Creación del router de Express
const express = require("express");
const router = express.Router();

//Instancia para que se puedan usar los controladores autenticado

const auth = require("../middlewares/auth");

//Instancias de los Controladores
const libroCtrl = require("../controladores/libro");
const autorCtrl = require("../controladores/autor");
const adminCtrl = require("../controladores/admin");
const userCtrl = require("../controladores/user");
const ofertaCtrl = require("../controladores/oferta");
const pedidoCtrl = require("../controladores/pedido");

//Libro
router.get("/libro", libroCtrl.getLibros);
router.get("/libro/:libroId", libroCtrl.getLibro);
router.get(
  "/libro/buscar/:buscar",
  libroCtrl.getLibroISBN,
  libroCtrl.getLibroTitulo,
  libroCtrl.getLibroEditorial
);
router.post("/libro", auth.isAuth, auth.isAdmin, libroCtrl.postLibro);
router.put("/libro/:libroId", auth.isAuth, auth.isAdmin, libroCtrl.putLibro);
router.delete(
  "/libro/:libroId",
  auth.isAuth,
  auth.isAdmin,
  libroCtrl.deleteLibro
);

//Autor
router.get("/autor", autorCtrl.getAutores);
router.get("/autor/:autorId", autorCtrl.getAutor);
router.get(
  "/autor/buscar/:buscar",
  autorCtrl.buscarAutorNombre,
  autorCtrl.buscarAutorApellido
);
router.post("/autor", auth.isAuth, auth.isAdmin, autorCtrl.postAutor);
router.put("/autor/:autorId", auth.isAuth, auth.isAdmin, autorCtrl.putAutor);
router.delete(
  "/autor/:autorId",
  auth.isAuth,
  auth.isAdmin,
  autorCtrl.deleteAutor
);

//Admin
router.get("/admin", auth.isAuth, auth.isAdmin, adminCtrl.getAdmins);
router.get("/admin/:adminId", auth.isAuth, auth.isAdmin, adminCtrl.getAdmin);
router.post("/admin", auth.isAuth, auth.isAdmin, adminCtrl.postAdmin);
router.put("/admin/:adminId", auth.isAuth, auth.isAdmin, adminCtrl.putAdmin);
router.delete(
  "/admin/:adminId",
  auth.isAuth,
  auth.isAdmin,
  adminCtrl.deleteAdmin
);
router.post("/admin/signin", adminCtrl.signIn);

//User
router.get("/user", /*auth.isAuth, auth.isAdmin,*/ userCtrl.getUsers);
router.get("/user/:userId", auth.isAuth, userCtrl.getUser);
router.get("/user/:userId/direccion", auth.isAuth, userCtrl.getDireccionesUser);
router.post("/user", userCtrl.postUser);
router.post("/user/signin", userCtrl.signIn);
router.post("/user/direccion", auth.isAuth, userCtrl.postDireccionUser);
router.put("/user/:userId", /*auth.isAuth,*/ userCtrl.putUser);
router.put("/user/:userEmail", /*auth.isAuth,*/ userCtrl.putUserEmail);
router.put(
  "/user/:userId/direccion/:direccionId",
  auth.isAuth,
  userCtrl.putDireccionUser
);
router.delete("/user/:userId", auth.isAuth, userCtrl.deleteUser);

//Oferta
router.get("/oferta", ofertaCtrl.getOfertas);
router.get("/oferta/:ofertaId", ofertaCtrl.getOferta);
router.get("/oferta/libro/:libroId", ofertaCtrl.getOfertasLibro);
router.post("/oferta", ofertaCtrl.postOferta);
router.put("/oferta/:ofertaId", ofertaCtrl.putOferta);
router.delete("/oferta/:ofertaId", ofertaCtrl.deleteOferta);

//Pedido
router.get("/pedido", pedidoCtrl.getPedidos);
router.get("/pedido/:pedidoId", pedidoCtrl.getPedido);
router.get("/pedido/user/:userId", pedidoCtrl.getPedidosUser);
router.post("/pedido", pedidoCtrl.postPedido);
router.put("/pedido/:pedidoId", pedidoCtrl.putPedido);
router.delete("/pedido/:pedidoId", pedidoCtrl.deletePedido);

module.exports = router;
