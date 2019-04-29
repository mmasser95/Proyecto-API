const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bibliotecaSchema= Schema({
    userId:Schema.Types.ObjectId,
    myBiblio:[
      {libroId:Schema.Types.ObjectId}
    ],
  })

module.exports=mongoose.model('Biblioteca', bibliotecaSchema);