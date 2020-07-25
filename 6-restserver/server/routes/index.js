// aqui tendremos todas nuestras rutas para no tener todo en el server
const express = require("express")
const app = express()

app.use(require('./usuario'))
app.use(require('./login'))

module.exports = app