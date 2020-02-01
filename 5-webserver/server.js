// recordar que internamente express usa el modulo http
const express = require("express");
const app = express() //ejecutamos la variables que es una funciona que retorna un objeto

// estamos configurrando una solicitud get cuando el path sea una /
// todas la aplicaciones que entre por / van aejecutar el callback
app.get("/", (peticion,respuesta) => {

   // OJO recordar siempre que el servidor ya fue ejecutado con esta informacion es decir que si cambiamos esta info como el objeto persona algun nombre o algo cuando el cliente ingrese a nuestro server no vera elcambio por que el servidor esta corriendo y no se adetenido en ningun momento y como nosotros emos echos cambios al archivo de configuracion de nuestro server tendriamos que reiniciar el server para poder ver el cambio

   // respuesta.send("<h1>hola como estass</h1>")
   let persona = {
      nombre: "jeyson gino",
      apellido: "ramos garcia",
      edad: 24,
      sexo: "masculido",
      estado: "soltero",
      hobbie: "escribir codigo",
      url: peticion.url //esto es para saber la url que esta visitanto el cliente
   }

   //internamente la funcion send va detectar que es un objeto y lo transformara a un formato JSON, incluye tambien las cabezeras especializadas
   respuesta.send(persona) 
})
// este forma creada es para poder especificar o darle al cliente cuando acceda a nuestra ubicacion de descarga y mandarle un archivo a descargar
app.get("/download", (peticion, respuesta)=>{
   respuesta.download('text_prueba.txt',function(err){
      if(err){
         // especificaremos mas adelante que hacer si hay un error                 
      }else{
         console.log("objeto descargado");
      }
   })
})

app.listen(3000, ()=>{
   console.log("escuchando peticiones en el puerto 3000");
   console.log("server in port 3000");
})


