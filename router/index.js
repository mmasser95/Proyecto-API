//Creación del router de Express
const express = require('express');
const router = express.Router();

//Instancia para que se puedan usar los controladores autenticado

const auth = require('../middlewares/auth');

//Instancia para subir imagenes
const imatge = require('../middlewares/images');

//Instancias de los Controladores
const libroCtrl = require('../controladores/libro');
const autorCtrl = require('../controladores/autor');
const adminCtrl = require('../controladores/admin');
const bibliotecaCtrl = require('../controladores/biblioteca');
const userCtrl = require('../controladores/user');
const ofertaCtrl = require('../controladores/oferta');
const pedidoCtrl = require('../controladores/pedido');
const peticionlCtrl = require('../controladores/peticionl');
const peticionaCtrl = require('../controladores/peticiona');

//Libro
router.get('/libro', libroCtrl.getLibros);
router.get('/libro/:libroId', libroCtrl.getLibro);
router.get('/libro/autor/:autorId', libroCtrl.getLibrosAutor);
router.get(
  '/libro/buscar/:buscar',
  libroCtrl.getLibroISBN,
  libroCtrl.getLibroTitulo,
  libroCtrl.getLibroEditorial
);
router.post('/libro', auth.isAuth, auth.isAdmin, libroCtrl.postLibro);
router.put(
  '/libro/imagen/:libroId',
  auth.isAuth,
  imatge.single('image'),
  libroCtrl.postLibroImagen
);
router.put('/libro/:libroId', auth.isAuth, auth.isAdmin, libroCtrl.putLibro);
router.delete(
  '/libro/:libroId',
  auth.isAuth,
  auth.isAdmin,
  libroCtrl.deleteLibro
);

//Autor
router.get('/autor', autorCtrl.getAutores);
router.get('/autor/:autorId', autorCtrl.getAutor);
router.get(
  '/autor/buscar/:buscar',
  autorCtrl.buscarAutorNombre,
  autorCtrl.buscarAutorApellido
);
router.post('/autor', auth.isAuth, auth.isAdmin, autorCtrl.postAutor);
router.put('/autor/:autorId', auth.isAuth, auth.isAdmin, autorCtrl.putAutor);
router.put(
  '/autor/imagen/:autorId',
  auth.isAuth,
  imatge.single('image'),
  autorCtrl.putAutorImagen
);
router.delete(
  '/autor/:autorId',
  auth.isAuth,
  auth.isAdmin,
  autorCtrl.deleteAutor
);

//Admin
router.get('/admin', auth.isAuth, auth.isAdmin, adminCtrl.getAdmins);
router.get('/admin/:adminId', auth.isAuth, auth.isAdmin, adminCtrl.getAdmin);
router.post('/admin', auth.isAuth, auth.isAdmin, adminCtrl.postAdmin);
router.post('/admin/verificar', adminCtrl.verificarAdminLogueado);
router.put('/admin/:adminId', auth.isAuth, auth.isAdmin, adminCtrl.putAdmin);
router.delete(
  '/admin/:adminId',
  auth.isAuth,
  auth.isAdmin,
  adminCtrl.deleteAdmin
);
router.post('/admin/signin', adminCtrl.signIn);

//User
router.get('/user', auth.isAuth, auth.isAdmin, userCtrl.getUsers);
router.get('/user/:userId', auth.isAuth, userCtrl.getUser);
router.get('/user/:userId/direccion', auth.isAuth, userCtrl.getDireccionesUser);
router.post('/user', userCtrl.postUser);
router.post('/user/signin', userCtrl.signIn);
router.post('/user/direccion', auth.isAuth, userCtrl.postDireccionUser);
router.post('/user/verificar', userCtrl.verificarUserLogueado);
router.put('/user/:userId', auth.isAuth, userCtrl.putUser);
router.put('/user/:userEmail', auth.isAuth, userCtrl.putUserEmail);
router.put(
  '/user/:userId/direccion/:direccionId',
  auth.isAuth,
  userCtrl.putDireccionUser
);
router.delete('/user/:userId', auth.isAuth, userCtrl.deleteUser);

//Oferta
router.get('/oferta', auth.isAuth, ofertaCtrl.getOfertas);
router.get('/oferta/:ofertaId', auth.isAuth, ofertaCtrl.getOferta);
router.get('/oferta/libro/:libroId', auth.isAuth, ofertaCtrl.getOfertasLibro);
router.post('/oferta', auth.isAuth, ofertaCtrl.postOferta);
router.put('/oferta/:ofertaId', auth.isAuth, ofertaCtrl.putOferta);
router.put(
  '/oferta/imagen/:ofertaId',
  auth.isAuth,
  imatge('image'),
  ofertaCtrl.putOfertaImagen
);
router.delete('/oferta/:ofertaId', auth.isAuth, ofertaCtrl.deleteOferta);

//Pedido
router.get('/pedido', auth.isAuth, pedidoCtrl.getPedidos);
router.get('/pedido/:pedidoId', auth.isAuth, pedidoCtrl.getPedido);
router.get('/pedido/user/:userId', auth.isAuth, pedidoCtrl.getPedidosUser);
router.post('/pedido', auth.isAuth, pedidoCtrl.postPedido);
router.put('/pedido/:pedidoId', pedidoCtrl.putPedido);
router.delete('/pedido/:pedidoId', pedidoCtrl.deletePedido);

//Peticion
router.get('/peticion/libro', auth.isAuth, peticionlCtrl.getPeticiones);
router.get(
  '/peticion/libro/:peticionId',
  auth.isAuth,
  peticionlCtrl.getPeticion
);
router.post('/peticion/libro', auth.isAuth, peticionlCtrl.postPeticion);
router.put(
  '/peticion/libro/a/:peticionId',
  auth.isAuth,
  auth.isAdmin,
  peticionlCtrl.aceptarPeticion
);
router.put(
  '/peticion/libro/:peticionId',
  auth.isAuth,
  peticionlCtrl.putPeticion
);
router.delete(
  '/peticion/libro/:peticionId',
  auth.isAuth,
  auth.isAdmin,
  peticionlCtrl.deletePeticion
);

//Peticion Autor
router.get('/peticion/autor', auth.isAuth, peticionaCtrl.getPeticiones);
router.get(
  '/peticion/autor/:peticionId',
  auth.isAuth,
  peticionaCtrl.getPeticion
);
router.post('/peticion/autor', auth.isAuth, peticionaCtrl.postPeticion);
router.put(
  '/peticion/autor/a/:peticionId',
  auth.isAuth,
  auth.isAdmin,
  peticionaCtrl.aceptarPeticion
);
router.put(
  '/peticion/autor/:peticionId',
  auth.isAuth,
  auth.isAdmin,
  peticionaCtrl.putPeticion
);
router.delete(
  '/peticion/autor/:peticionId',
  auth.isAuth,
  peticionaCtrl.deletePeticion
);

//Biblioteca

router.get('/biblioteca/:userId', auth.isAuth, bibliotecaCtrl.getMyBiblioteca);
router.put(
  '/biblioteca/:userId',
  auth.isAuth,
  bibliotecaCtrl.actualizarBiblioteca
);
router.delete(
  '/biblioteca/:userId',
  auth.isAuth,
  bibliotecaCtrl.limpiarBiblioteca
);
router.purge(
  '/biblioteca/:userId',
  auth.isAuth,
  auth.isAdmin,
  bibliotecaCtrl.eliminarBiblioteca
);

module.exports = router;
