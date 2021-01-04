const express = require("express")
const fileUpload = require("express-fileupload")
const app = express()
const path = require("path")
const Usuario = require("../models/usuario")
const fs = require("fs")
// ipciones por default
app.use(fileUpload())

app.post("/upload/:tipo/:id", (req, res) => {

   let tipo = req.params.tipo
   let id = req.params.id

   if (!req.files) {

      return res.status(404).json({
         ok: false,
         message: "No se subio ninguna imagen"
      })
   }

   let tiposPermitidos = ['productos', 'categorias'];

   if (tiposPermitidos.indexOf(tipo) < 0) {
      return res.status(400).json({
         ok: false,
         message: "Los tipos permitidos son: " + tiposPermitidos.join(", ")
      })
   }

   let archivo = req.files.archivo

   // obtenemos las extencion del nombre del archivo esto con el modulo de path
   // let extencionArchivo = path.extname(archivo.name)

   // obtenemos las extencion del nombre del archivo usando vanilla js
   let extencionArchivo = archivo.name.split(".")
   let extension = extencionArchivo[extencionArchivo.length - 1]

   // extenciones permitidas cuando usamos el modulo path
   // let extencionesValidas = ['.png', '.jpg', '.gif', '.jpg']

   // extenciones permitidas cuando usamos vanilla js para sacar la extencion del nombre del archivo
   let extencionesValidas = ['png', 'jpg', 'gif', 'jpg']

   if (extencionesValidas.indexOf(extension) < 0) {

      return res.status(400).json({
         ok: false,
         message: "Las extenciones permitidas son: " + extencionesValidas.join(", ")
      })
   }

   // ESTO ES PARA CREAR UN NOMBRE UNICO PARA LA IMAGEN SUBIDA
   let nuevoNombreUnico = `${id}-${new Date().getMilliseconds()}.${extension}`

   let archivoRuta = `./uploads/${tipo}/${nuevoNombreUnico}`

   archivo.mv(archivoRuta, (err) => {

      if (err) {

         return res.status(500).json({
            ok: true, 
            err
         })
      }

      // return res.json({ ok: true, message: "Archivo Guardado" })
      imagenUsuario(id, res, nuevoNombreUnico)

   })
})

function imagenUsuario(id, res, nombreArchivo) {

   Usuario.findById(id, (err, usuarioDB) => {
      if (err) {
         borrarArchivo(nombreArchivo,'usuarios')
         res.status(500).json({ ok: false, err })
      }
      
      if (!usuarioDB) {
         borrarArchivo(nombreArchivo,'usuarios')
         res.status(400).json({ ok: false, message: 'Usuario no existe' })
      }

      borrarArchivo(usuarioDB.img,'usuarios')

      usuarioDB.img = nombreArchivo

      usuarioDB.save((err, usuarioGuardado) => {
         res.json({ ok: true, usuario: usuarioGuardado, img: nombreArchivo })
      })
   })
}

function borrarArchivo(nombreImagen,tipo){
   // primero obtenemos la ruta de la imagen ya guardada
   let pathImage = path.resolve(__dirname, `../../upload/${tipo}/${nombreImagen}`)

   if (fs.existsSync(pathImage)){ //comprobamos si existe ese archivoa atravez de la ruta
      fs.unlink(pathImage) //eliminamos el archivo
   }
}

module.exports = app;