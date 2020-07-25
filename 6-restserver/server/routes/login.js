const express = require("express")
const bcrypt = require("bcrypt")
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

      return res.status(200).json({
         ok:true,
         usuario:usuarioDB,
         token:"123"
      })

   })
})

module.exports = app