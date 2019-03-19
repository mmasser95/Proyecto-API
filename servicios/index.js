let nodemailer = require('nodemailer');
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

function createToken(user) {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    tipo: 'user',
    exp: moment()
      .add(14, 'days')
      .unix(),
  };
  return jwt.encode(payload, config.SECRET_TOKEN);
}

function createAdminToken(user) {
  const payload = {
    sub: user._id,
    tipo: 'admin',
    iat: moment().unix(),
    exp: moment()
      .add(14, 'days')
      .unix(),
  };
  return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken(token) {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.SECRET_TOKEN);
      if (payload.exp <= moment().unix()) {
        resolve({
          status: 401,
          message: `El token ha expirado`,
        });
      }
      resolve(payload);
    } catch (e) {
      reject({
        status: 500,
        message: `Token invalido`,
      });
    }
  });
  return decoded;
}

function sendEmail(to, sub, message) {
  let transporter = nodemailer.createTransport({
    service: config.emailserver,
    auth: {
      user: config.emailuser,
      pass: config.emailpass,
    },
  });

  const opt = {
    from: config.emailuser,
    to: to,
    subject: sub,
    html: message,
  };

  transporter.sendMail(opt, (err, res) => {
    if (err) return false;
    return true;
  });
}

module.exports = {
  createToken,
  createAdminToken,
  decodeToken,
  sendEmail,
};
