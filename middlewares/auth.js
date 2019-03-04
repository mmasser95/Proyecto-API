const servicios = require("../servicios");

function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: `No tienes autorización` });
  }

  const token = req.headers.authorization.split(" ")[1];
  servicios
    .decodeToken(token)
    .then(response => {
      res.locals.payload = response;
      return next();
    })
    .catch(response => {
      res.status(response.status).send(response.message);
    });
}

function isAdmin(req, res, next) {
  const payload = res.locals.payload;
  if (payload.tipo === "admin") {
    return next();
  }
  return res.status(401).send({ message: `No eres administrador` });
}

module.exports = {
  isAuth,
  isAdmin
};
