const multer = require('multer');

const imatge = multer({
    limits:{
        fileSize:4*1024*1024,
    }
});

module.exports=imatge;