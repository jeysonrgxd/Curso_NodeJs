// importamos la libreria axios que descargamos con npm
//  recordar que axios maneja las peticiones a puras promesas diferente de la libreia request que las maneja con callbacks
const axios = require('axios');

const getLugarLatLng = async (dir) => {

   // creamos una nueva instancia de axios con una configuración personalizada esto lo
   // asemos por que nesesitamos establecerle cabeceras donde iran nuestro llave key
   const intanceAxios = axios.create({
      // direccion adonde aremos la peticion
      baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${dir}`,
      // baseURL:"https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=New%20York",
      headers: {
         "x-rapidapi-key": "cf7d45240emshe9e5e77d98188bep1787cbjsn5a3b6b2a9eae"
      }
   })
   // ejecutamos la instancia de axios que creamos con .get() recordar que esto devuelve una promesa por eso la resolvemos con el await
   const resp = await intanceAxios.get()
   // validamos si esta vacio el arreglo
   if(resp.data.Results.length === 0){
      // generamos un error
      throw new Error(`No hay resultado para ${dir}`)
   }
   // esto nos devuelve el primero objeto del array de resultado todo esto es bueno acerlo ////ala par con la respuesta que nos envia atraves de postman para ir viendo que podemos 
   //utilizar y crear una buena aplicacion
   const data = resp.data.Results[0];
   const direccion= data.name
   const lat=data.lat
   const lng=data.lon

   // usamos ecmascript 6 para pasar los atributos al objeto que retorna la funcion
   return {
      direccion,
      lat,
      lng
   }
      
}
module.exports= {
   getLugarLatLng
}
