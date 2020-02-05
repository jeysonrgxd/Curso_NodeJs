// con esta forma traemos el archivo por ende se ejecuta y no nesesitamos guardar en una variable ya que queremos que se ejecute y cree las variables gobales de configuracion para poder usarlo
require('./config/config')

const express = require("express");
const app = express();
const bodyParser = require("body-parser")

// middleware
// app.use(express.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))

// parse application/json
app.use(bodyParser.json())

app.get('/',(req, res)=>{
   res.send("<style>body{background-color:#313131;color:#f1f1f1}</style><h1>Bienvenido al Api Rest con Node y desplegado en heroku</h1><br><p>Todavia se encuentra en desarrollo u.u.</p>")
})

app.get('/usuario',(req, res)=>{
   // res.send("hola mundo")
   res.json({"nombre":"jeyson"})
})

app.post('/usuario/:id',(req,res)=>{
   // res.json(req.body)
   
   // para obtener los datos con formato application/x-www-form-urlencoded
   console.log(req.params);
   console.log(req.body);
   if(!req.body.nombre){
      res.status(400)//preparamos un status
      res.json({ //enviamos el objeto json de error con el status
         ok:"false",
         message:"No se encuentra el nombre en los datos enviados"
      })
   }else{
      res.json(
         {
         id:req.params.id,
         persona:req.body
      })

   }
})

app.put('/usuario/:id',(req, res)=>{
   console.log(`se modificara el usuario ${req.params.id}`);
   let body = req.body;
   res.json({
      persona:body
   })
})

app.delete('/usuario/:id', (req, res)=>{
   console.log(`Se eliminara el usuario ${req.params.id}`);
   res.send(`Se elimino el usuario ${req.params.id}`)
})

app.listen(process.env.PORT, ()=>{
   console.log("server run in port 3000");
})