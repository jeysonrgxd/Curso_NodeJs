// aqui tendremos todas nuestras rutas para no tener todo en el server
const express = require("express")
const app = express()

app.get('/prueba',(req,res)=>{
   console.log(req.body);
   res.json({
      ok:true,
      data:req.body
   })
})

app.use(require('./usuario'))
app.use(require('./login'))
app.use(require('./categoria'))
app.use(require('./producto'))
app.use(require('./upload'))
app.use(require('./imagenes'))

module.exports = app