const express = require("express")
const app = express()
const path = require("path")
const fs = require("fs")
const { verificaToken } = require("../middlewares/autenticacion")

app.get("/imagen/:tipo/:img",  verificaToken ,(req, res) => {

   let { tipo, img } = req.params

   
   let pathImg = path.join(__dirname,`../../uploads/${tipo}/${img}`)
   
   let noImagePath = path.join(__dirname,`../assets/no-image.jpg`)
   
   //validamos si existe la ruta de la imagen y mandamos el archivo especificado indicando la ruta donde se encuentre este
   if (fs.existsSync(pathImg)) res.sendFile(pathImg);

   else res.sendFile(noImagePath)

})

module.exports = app