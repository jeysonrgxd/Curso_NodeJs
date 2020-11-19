const express = require("express")
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion')
const app = express()
const Producto = require("../models/producto")

// =================
// Mostrar todas los productos
// =================
app.get("/productos", (req, res) => {

})

// =================
// Mostrar el producto
// =================
app.get("/productos:id", (req, res) => {

})

// =================
// Crear un producto
// =================
app.post("/productos", verificaToken, (req, res) => {

   let body = req.body

   let producto = new Producto({
      usuario: req.usuario._id,
      nombre: body.nombre,
      precioUni: body.precioUni,
      descripcion: body.descripcion,
      categoria: body.categoria,
   })

   producto.save((err, productoDB) => {
      if (err) {//si exite error ejecutame esto
         return res.status(400).json({ ok: false, err })
      }

      if (!productoDB) {//si no se crea la producto
         return res.status(400).json({ ok: false, err })
      }

      res.json({
         ok: true,
         producto: productoDB
      })
   })

})

// =================
// Actualizar un producto
// =================
app.put("/productos/:id", (req, res) => {
   let id = req.params.id
   let body = req.body

   // buscamos primero si exite el producto
   Producto.findById(id, (err, productoDB) => {
      if (err) {//si exite error ejecutame esto
         return res.status(400).json({ ok: false, err })
      }

      if (!productoDB) {//si no encontro el producto
         return res.status(400).json({ ok: false, err })
      }

      // si econtro el prodcuto entonse lo modificamos usando el parametro del callback productoDB
      productoDB.nombre= body.nombre
      productoDB.precioUni= body.precioUni
      productoDB.descripcion= body.descripcion
      productoDB.disponible= body.disponible
      productoDB.categoria= body.categoria
      productoDB.usuario= body.usuario

      productoDB.save((err, productoGuardado) => {
         if (err) {//si exite error ejecutame esto
            return res.status(400).json({ ok: false, err })
         }

         res.json({
            ok: true,
            producto: productoGuardado
         })
      })

   })
})


// =================
// Eliminar un producto
// =================
app.delete("/productos", (req, res) => {

})

module.exports = app