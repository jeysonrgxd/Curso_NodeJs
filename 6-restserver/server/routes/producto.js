const express = require("express")
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion')
const app = express()
const Producto = require("../models/producto")

// =================
// Mostrar todas los productos
// =================
app.get("/productos", verificaToken, (req, res) => {
   let desde = req.query.desde
   let limite = req.query.limite

   Producto.find({ disponible: true })
      .skip(desde)
      .limit(limite)
      .populate('usuario', 'nombre email')
      .populate('categoria', 'descripcion')
      .exec((err, productoDB) => {
         if (err) {
            return res.status(500).json({ ok: false, err })
         }
         if (!productoDB) {
            return res.status(400).json({ ok: false, err })
         }

         res.status(201).json({
            ok: true,
            producto: productoDB
         })
      })

})

// =================
// Mostrar el producto
// =================
app.get("/productos/:id", verificaToken, (req, res) => {
   let id_producto = req.params.id

   Producto.findById(id_producto)
      .populate('usuario', 'nombre email')
      .populate('categoria', 'descripcion')
      .exec((err, productoDB) => {
         if (err) {
            return res.status(500).json({ ok: false, err })
         }
         if (!productoDB) {
            return res.status(400).json({ ok: false, err })
         }

         res.status(200).json({
            ok: true,
            producto: productoDB
         })
      })

})

// =================
// Busacar un prodcuto
// =================
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {
   let termino = req.params.termino
   // creamos un regex del termino la i es para que acepte mayusculas y minusculas
   let regex = new RegExp(termino, 'i')

   // le pasamos el regex ala condicion que queramos buscar
   Producto.find({ nombre: regex,disponible:true })
      .populate('categoria', 'descripcion')
      .exec((err, productos) => {
         if (err) {
            return res.status(500).json({ ok: false, err })
         }
         res.json({ ok: true, productos })

   })
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
app.put("/productos/:id", verificaToken, (req, res) => {
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
      productoDB.nombre = body.nombre
      productoDB.precioUni = body.precioUni
      productoDB.descripcion = body.descripcion
      productoDB.disponible = body.disponible
      productoDB.categoria = body.categoria
      productoDB.usuario = body.usuario

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
app.delete("/productos/:id", verificaToken, (req, res) => {
   let id_producto = req.params.id

   Producto.findById(id_producto, (err, productoDB) => {
      if (err) {//si exite error ejecutame esto
         return res.status(500).json({ ok: false, err })
      }

      if (!productoDB) {//si no encontro el producto
         return res.status(400).json({ ok: false, err: { message: 'ID no existe' } })
      }

      productoDB.disponible = false;

      productoDB.save((err, productoBorrado) => {
         if (err) {//si exite error ejecutame esto
            return res.status(500).json({ ok: false, err })
         }

         res.json({ ok: true, producto: productoBorrado, message: 'Producto borrado' })
      })


   })


})

module.exports = app