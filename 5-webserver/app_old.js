// traemos el paquete http para levantar un servidor y especificamos variables para utilizarlas como el hostname y el puerto donde sera escuchado nuestro servidor
const http = require('http'),
      hostname = 'localhost',
      port = 3000

//  importamos el paquete de colors para poder utilzarlo en la consola de salida final de nuestra direccion para nuesto serve
const colors = require("colors")

// con esta variable podemos hacer que se emprima cada vez que nuestro cliente actualize nuestro servidor y en callback del http.createServer(callback) aumentarlo y veras como el numero aumente para el cliente cada vez que se actualize la pagina
let num = 1;


// creamos un servidor el cual cuando termine de crear que ara ps ara el callback que le especifiquemos los paramatros del callback son la peticion que le pido al servidor y la serpuesta que me envia el servidor
// cuando creamos un servidor mi servidor va ser capaz de reicivir informacion de los clientes y darles una respuesta algo, peticion : recivir informacion, respuesta: darles una respuesta o algo
http.createServer(function(peticion, respuesta){
   num++;
   // esto imprime en la terminar donde corrimos el comando para levantar el servidor mas no imprime en la consola del navegador
   console.log(`refrescastes ${num}`);
   
   // antes de mostrarle la respuesta le especifiquemos el tipo de contenido
   //ees para decirle que boy a escribir una cabezera para darle mas informacion al navegador. el tipo de respuesta, {} y mas informacion 
   // respuesta.writeHead(200, {
   //    "content-type": "text/html"
   // })
   
   //establescamos una cabezera de tipo JSON, para eso crearemos un objeto y lo convertiremos a formato json y lo mandaremos a imprimir en nuestra web  
   respuesta.writeHead(200,{
      "content-type": "application/json"
   })
   let persona= {
      nombre:"jeyson ginoo",
      apellido:"ramos garcia",
      edad:21,
      sexo:"masculido",
      estado:"soltero",
      hobbie:"escribir codigo",
      url:peticion.url//esto es para saber la url que esta visitanto el cliente
   }


   // le respondemos al cliente cada vez que visite mi sitio web o se conecte ami servidor
   // respuesta.write(`<h1>Hola desde el servidor por ${num}</h1>`);

   // respondiendo al cliente en un formato JSON
   respuesta.write(JSON.stringify(persona));

   // esto es cuando responda algo terminamos la respuesta para poder seguir recivir peticiones de otros usuarios si no asemos esto se trabara
   // respuesta.end("<mark>Cerrando conexion</mark>");

   // terminamos la respuesta sin enviarle nada ya que sino podemos afectar anuestro json que estamos enviandole al cliente
   respuesta.end();

})
//esta funcion lo que hace es establecer el puerto en donde sera escuchado el servidor creado y ademas le pasamos un callback luego de que especifiquemos el puerto donde sera escuchado nuestro servidor ejecutame el callback
.listen(port, () => {
   console.log("Server run in",`http://${hostname}:${port}`.green)
}) 