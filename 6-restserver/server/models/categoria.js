const mongoose = require('mongoose')
const usuario = require('./usuario')
const Schema = mongoose.Schema

let categoriaSchema = new Schema({
   descripcion:{
      type:String,
      unique:true,
      required:[
         true,
         'La descripcion es obligatoria'
      ],
   },
   usuario:{
      // aca especifico que el usuario sera de tipo id objeto de un schema en este caso de referencia usuario
      type:Schema.Types.ObjectId,
      ref:'Usuario'
      
   }
});

module.exports = mongoose.model('Categoria', categoriaSchema);
