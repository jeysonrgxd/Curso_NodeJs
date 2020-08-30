const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Usuario = require("../models/usuario")
const app = express()

// utilizamos la libreria que instalamos con npm de google para node para la autentication. ref: https://developers.google.com/identity/sign-in/web/backend-auth
const {OAuth2Client} = require('google-auth-library');
const usuario = require("../models/usuario")
// podemos crear un process.env y gaurdar esta clave
const client = new OAuth2Client('101915388282-ldvuuic1tr2p4c0sje2fu2cif478vi1g.apps.googleusercontent.com');

// utilizamos la funcion que nos otorga google para varificar el token y obtener el p
async function verify(token) {
   const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '101915388282-ldvuuic1tr2p4c0sje2fu2cif478vi1g.apps.googleusercontent.com', // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
   });
   const payload = ticket.getPayload();

   // retornamos un objeto con las propiedades que queremos obtener
   return{
      nombre:payload.name,
      email:payload.email,
      img:payload.picture,
      google:true
   }
}


app.post("/login",(req,res)=>{
   const body = req.body

   // solo quiero regresar un solo dato (solo una fila) por eso utulizamos esta funcion d encuentra modelo usuario
   Usuario.findOne({email:body.email},(err,usuarioDB)=>{
      if(err){
         return res.status(500).json({
            ok:false,
            error:err
         })
      }
      if(!usuarioDB){
         return res.status(401).json({
            ok: false,
            error:{
               message:"(Usuario) o contraseña incorrectos"
            }
         })
      }

      if (!bcrypt.compareSync(body.password,usuarioDB.password)){
         return res.status(401).json({
            ok: false,
            error: {
               message: "Usuario o (contraseña) incorrectos"
            }
         })
      }
      
      //creamos una variable para obtener el token mediante la funcion de jwt sign, por sugerencia cuando el cliente recive este token se puede guardar en el local storage, para asi poder hacer consulta anuestra api enviando el token
      let token = jwt.sign({
         // el payload el cuerpo del jwt
         usuario:usuarioDB
      },
      // clave secreta que se usara para la comparacion (la firma), esta creado como variable de entorno en las configuraciones
      process.env.SEED,

      // especificamos cuando esperia primero es segundo por minutos por horas y dias, para el video sera en 30 dias
      {expiresIn:process.env.CADUCIDAD_TOKEN});

      return res.status(200).json({
         ok:true,
         usuario:usuarioDB,
         token
      })

   })
})

app.post("/google",async (req,res)=>{
   let token = req.body.idtoken

   // obtenermo los datos del usuario registrados de google, en este caso usamos await ya que la funcion verifi es asyncrona y ps toda funcion asyncrona devuelve una funcion, despues  le asemos un catch por si hay error y el servidor nos retornara
   const googleUser = await verify(token).catch(e => {
      return res.status(403).json({
         ok:false,
         err:e
      })
   })
   
   // si encaso no hayga error buscamos en la base de datos al usuario con el correo que obtenmos del googlesign
   usuario.findOne({email:googleUser.email},(err,usuarioDB)=>{
      if(err){
         return res.status(500).json({
            ok:false,
            err
         })
      }

      if(usuarioDB){
         // detectamos si es el correo ya esta registrado osea que creo su cuenta sin el google sigin
         if(usuarioDB.google === false ){
            return res.status(404).json({
               ok:false,
               err:{
                  message:'Debe de usar su autenticación nromal'
               }
            })
         }
         else{
            // si el correo de google esta en true en la base de datos significa que cremao el usuario con la autenticación de google, tenemos que crearle o actualizar su token para que pueda utilizar los demas servicios
   
            let token = jwt.sign({
                  usuario: usuarioDB
               },
               process.env.SEED,
               {
                  expiresIn: process.env.CADUCIDAD_TOKEN
               });
            return res.json({
               ok:true,
               usuario:usuarioDB,
               message:'bienvenido',
               token
            })
         }
      }
      else{
         // si el usuario no existe en nuestra base de datos
         let usuario = new Usuario();
         usuario.nombre = googleUser.nombre,
         usuario.email = googleUser.email,
         usuario.img = googleUser.img,
         usuario.google = true,
         usuario.password = ':)';

         // guardamos en la base de datos
         usuario.save((err,usuarioDB)=>{

            if(err){
               return res.status(500).json({
                  ok:false,
                  err
               });
            }

            // si no hay error al guardar el usuario entonses creamos un token para el
             let token = jwt.sign({
                  usuario: usuarioDB
               },
               process.env.SEED, {
                  expiresIn: process.env.CADUCIDAD_TOKEN
            });

            return res.json({
               ok:true,
               usuario:usuarioDB,
               token
            })

         })

      }
   })
})

module.exports = app