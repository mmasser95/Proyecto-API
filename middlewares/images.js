const multer = require('multer');

const imatge = multer({
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

module.exports = imatge;
