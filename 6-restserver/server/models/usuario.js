// trabajaremos el modelo de datos
// un modelo es un objeto en esta caso sera un objeto de mongo
const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true); //esto es para especificar campos unique('tiene que ver con la creacion de indices tambien se puede poner defrente en la creacion de la conexion como una propiedad del objeto que recive')

// plugin para mostrar los mensaje de validacion de campos unicos, ps este plugin nosa un error en json mas acomodado "userfriendly"
const uniqueValidator = require("mongoose-unique-validator");

// especificamos roles validos y le pasamos un mensaje de error si no se cumple el rol pasado con los que estan especificado el value
let rolesValidos = {
   values:['ADMIN_ROLE','USER_ROLE'],
   // este mensaje de error nos dara cuando intentamos guardar ala base de datos un rol que no 
   //tenemos especificado en el array de valores, el {VALUE} es el valor que yo estoy intentando guardar
   message:'{VALUE} no es un rol valido'
}

// obtenemos el squema o cascaron para crear esquemas de mongo para poder crear varios objetos ()
let Schema =  mongoose.Schema //esto me devuelve un objeto como clase

let usuarioSchema = new Schema({ //utilizamos este Schema instanciandola con la palabra recervada new
   nombre: {
      type: String,
      required: [true, 'El nombre es necesario']
   },
   email: {
      type: String,
      unique:true,
      required: [true, 'El correo es nesesario']
   },
   password: {
      type: String,
      required: [true, 'La contraseña es obligatoria']
   },
   img:{
      type:String,
      required:false
   },
   role: {
      type:String,
      default:'USER_ROLE',
      enum: rolesValidos
   },
   estado:{
      type:Boolean,
      default:true
   },
   google: {
      type:Boolean,
      default:false
   }


})
// usamos el validator unique
usuarioSchema.plugin(uniqueValidator, {message:'{PATH} debe de ser unico'})

// este metodo toJson en un squema ciempre se llama cuando se intenta imprimir
usuarioSchema.methods.toJSON = function () {
   let user =  this
   let objusuario = user.toObject() //de esta manera tenemos todo las propiedades y matodos
   delete objusuario.password //eliminamos la contraeña para que no sea mostrada al cliente
   return objusuario;//retornamos
}

// importamos el modelo de mongo con el schema que emos creado y le asignamos un nombre
//compila mi esquema mi esquema y me regresa un modelo de tipo usuario con todo las funciones de mongo (una tabla o objeto)
module.exports = mongoose.model("Usuario", usuarioSchema) 
// console.log(mongoose.model("Usuario", usuarioSchema))
