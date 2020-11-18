const express = require("express")
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion')
const app = express()
let Categoria = require('../models/categoria')

// =================
// Mostrar todas las categorias
// =================
app.get('/categoria', verificaToken, (req, res) => {
   //si tenemos mas esquemas relacinados utilizamos los populate que sean nesesarios
   Categoria.find({})
      .sort('descripcion')//ordenamos de acuerdo al atributo de nuestra collection
      .populate('usuario','nombre email') 
      .exec((err, categorias) => {
         if (err) {//si exite error ejecutame esto
            return res.status(400).json({ ok: false, err })
         }

         if (!categorias) {//si no se crea la categoria
            return res.status(400).json({ ok: false, err })
         }

         res.json({
            ok: true,
            categorias
         })
      })
})

// =================
// Mostrar una categoria por ID
// =================
app.get('/categoria/:id', verificaToken, (req, res) => {
   let id = req.params.id
   Categoria.findById(id, (err, categoria) => {
      if (err) {//si exite error ejecutame esto
         return res.status(400).json({ ok: false, err })
      }

      if (!categoria) {//si no se crea la categoria
         return res.status(400).json({ ok: false, err })
      }

      res.json({
         ok: true,
         categoria
      })
   })
})

// =================
// Crear una nueva categoria
// =================
app.post('/categoria', verificaToken, (req, res) => {
   let body = req.body
   let categoria = new Categoria({
      descripcion: body.descripcion,
      usuario: req.usuario._id
   })

   categoria.save((err, categoriaDB) => {
      if (err) {//si exite error ejecutame esto
         return res.status(400).json({ ok: false, err })
      }

      if (!categoriaDB) {//si no se crea la categoria
         return res.status(400).json({ ok: false, err })
      }

      res.json({
         ok: true,
         categoria: categoriaDB
      })
   })
})

// =================
// Actulizar la categoria
// =================
app.put('/categoria/:id', verificaToken, (req, res) => {

   let id = req.params.id
   let { descripcion } = req.body

   Categoria.findByIdAndUpdate(id, { descripcion }, { new: true, runValidators: true }, (err, categoriaDB) => {

      if (err) {//si exite error ejecutame esto
         return res.status(400).json({ ok: false, err })
      }

      if (!categoriaDB) {//si no se crea la categoria
         return res.status(400).json({ ok: false, err })
      }

      res.json({
         ok: true,
         categoria: categoriaDB
      })
   })


})

// =================
// eliminar la categoria
// =================
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
   let id = req.params.id

   Categoria.findByIdAndDelete(id, (err, deleteCategoria) => {
      if (err) {//si exite error ejecutame esto
         return res.status(400).json({ ok: false, err })
      }

      if (!deleteCategoria) {//si no se crea la categoria
         return res.status(400).json({ ok: false, err })
      }

      res.json({
         ok: true,
         categoria: deleteCategoria
      })
   })

})

module.exports = app  