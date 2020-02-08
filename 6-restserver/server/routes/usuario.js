const express = require("express")
const app = express();
const Usuario = require("../models/usuario")
const bcrypt = require('bcrypt')//libreria para encripta 
const _ = require('underscore') //libreria para trabajar con validacion de objetos y muchas otras cosas

app.get('/', (req, res) => {

   res.send("<style>body{background-color:#313131;color:#f1f1f1}</style><h1>Bienvenido al Api Rest con Node y desplegado en heroku</h1><br><p>Estas en desarrollo</p>")
})

app.get('/usuario', (req, res) => {
   // res.send("hola mundo")
   res.json({
      "nombre": "jeyson"
   })
})

app.post('/usuario',(req,res)=>{

   // instaciamos un objeto de la clase Usuario que nos traimos de models/usuario, y le pasamos los datos que tendra y ala vez validara con lo que definimos en su schema en moduls/usuario.js
   // ojo :
   /* 
      importante la instancia del modelo que creamu Usuario que en este caso estamos importando es conocido tambien como un documento
   */
   let usuario = new Usuario({
      nombre:req.body.nombre,
      email: req.body.email,
      //con esto asemos el hash de manera sincrona y el segundo parametro es cuanta veses de aremos el hash
      password: bcrypt.hashSync(req.body.password,10),
      role: req.body.role
   })

   // esta funcion guarda el objeto en la base de datos y nos regresa un callback con dos parametros el error si es que lo hay y el objeto en json que guardo
   usuario.save((err, usuarioDB)=>{
      if(err){//si exite error ejecutame esto
         return res.status(400).json({ok:false, err})
      }
      // sino existe erro mandamos un json con true u el objeto que nos dio al guardas en mongo en este caso el usuario insertado

      // let objcopia = Object.assign({}, usuarioDB) //con esto nos dimos cuenta que antes de que se imprima el usuarioDB este posee un objeto con muchas propiedades y que al imprimir el objeto solo accedemos acierta zona el cual es los datos que estamos guardando en mongo
      // delete usuarioDB._doc.password //por todo lo esplicado es que podemos hacer esto ya que sabemos la ubicacion exata de donde se encuentra
      console.log(usuarioDB);
      res.json( { ok: true, usuario: usuarioDB } )
   })
   
})

app.post('/usuario/:id', (req, res) => {
   // res.json(req.body)

   // para obtener los datos con formato application/x-www-form-urlencoded
   console.log(req.params);
   console.log(req.body);
   if (!req.body.nombre) {
      res.status(400) //preparamos un status
      res.json({ //enviamos el objeto json de error con el status
         ok: "false",
         message: "No se encuentra el nombre en los datos enviados"
      })
   } else {
      res.json({
         id: req.params.id,
         persona: req.body
      })

   }
})

app.put('/usuario/:id', (req, res) => {
   // console.log(`se modificara el usuario ${req.params.id}`);

   // para validar solamente lo que debmos actualizar en este caso no tenemos que modificar la contraseña ni google
   // para eso utilizamo la libreria underscore que nos ayudara afiltrar el objeto que nos proporciona el cliente 
   //para que despues lo actualizemos en mongo, underscore ayudara a crear un objeto del objeto que mande el cliente lo filtraremos con solo lo que quermos actualizar
   let body = _.pick(req.body,['nombre','email','role','estado'])
   console.log(body);
   let id_user =req.params.id

   // esta funcion busca en la base de datos el id obtiene el documento le pasamos el body para update de datos, siguiente le pasamos un objeto de configuracion el cual hacemos verdadero el new para que nos devuelva el objeto actualizado o los datos finales y despues el callback de siempre
   Usuario.findByIdAndUpdate(id_user, body, {new: true}, (err, usuarioDB) => {
      if(err){
         return res.status(400).json({
            ok:false,
            err
         })
      }
      
      res.json({ok:true, usuario:usuarioDB})
   })

})

app.delete('/usuario/:id', (req, res) => {
   console.log(`Se eliminara el usuario ${req.params.id}`);
   res.send(`Se elimino el usuario ${req.params.id}`)
})

module.exports = app