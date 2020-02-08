// con esta forma traemos el archivo por ende se ejecuta y no nesesitamos guardar en una variable ya que queremos que se ejecute y cree las variables gobales de configuracion para poder usarlo
require('./config/config')

const mongo = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser")



// middleware
// app.use(express.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))

// parse application/json
app.use(bodyParser.json())

// este es para darle el valor app que creamos con todas las rutas al app del server (estamos dandole a la varibale app todas rutas que creamos en routes/usuario)
app.use(require('./routes/usuario')) 

// nos conectamos ala base de datos de mongo ala base de datos cafe y si no hay la creara
mongo.connect("mongodb://localhost:27017/cafe", {
   // estos son atributos del objeto por default nesesarios 
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false

}, (err, res) => { //callback despues de hacer la conxion
   if (err) throw err //si hay error termina el proceso y imprime el error

   console.log("CONNECTADO A MONGO") // si no hay error imprime en consola conectado
})

app.listen(process.env.PORT, ()=>{
   console.log("server run in port 3000");
})