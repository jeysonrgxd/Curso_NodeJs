const express = require("express")
const app = express();

// ustedes pueden utilizar de definir una carpeta publica y pueden mostrar ai cualquier cantidad de archivo js css bootstrap pero tienes que saber que cualquier cosa que ponga ai va ser publico cualquier persona pueda ver

//middleware es una instruccion o un callback que se ejecutara siempre no importa que url la persona pida
//definicion de una carpeta publica. y servi ai cualquier cantidad de archivos
app.use(express.static(__dirname + '/public')) 
app.listen(3000, () => {
   console.log("server listen in port 3000")
})
 
// OJO RECORDAR QUE UNA VEZ INGRESES AL NAVEGADOR ALA DIRECCION  http://localhost:3000/
// COMO NO TENEMOS index.html en public/ ya que es lo primiero o lo por defecto que encuentra y lo pinta en el navegador, nosotro tenemos que poner http://localhost:3000/index-old.html