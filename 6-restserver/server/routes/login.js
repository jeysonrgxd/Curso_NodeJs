const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Usuario = require("../models/usuario")
const app = express()

app.post("/login",(req,res)=>{
   const body = req.body

   // solo quiero regresar un solo dato por eso utulizamos esta funcion d enuestro modelo usuario
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

module.exports = app