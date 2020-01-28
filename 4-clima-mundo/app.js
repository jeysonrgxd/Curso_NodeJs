// recordar que al final el .argv es para obtener los argumentos, option son para la configuracion de los parametros sin comando intermedio (osea sin tener valores en el array[] { _: [], direccion: 'hola', d: 'hola', '$0': 'app' })
const argv = require('yargs').option({
   direccion:{
      alias:'d',
      desc:'Direccion de la ciudad para obtener el clima',
      demand:true

   }
}).argv;
// inportamos lugar y clima
const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');


// imprimimos para verificar
// console.log(argv)
// console.log(argv.d)

// preparamos el argumaneto convirtiendolo para ponerlo en un valor para una varibales url
// utilizamos el metodo encodeURl
let encodeDIR = encodeURI(argv.direccion);
console.log(encodeDIR);
// recordar que es una funcion asincrona y toda funcion asincrona devuelve una promesa con la respuesta que ayamos retornado con return
// lugar.getLugarLatLng(encodeDIR)
// .then(resp => {
//    console.log(resp)
// })

// ejecutamos clima para probar
// clima.getTemperatura(40.750000, -74.000000)
// .then( console.log )
// .catch( console.log )

const getInfo = async ( direccion ) => {
   try {
      let resp = await lugar.getLugarLatLng(direccion)
      //   se puede obviar esta parte
      //   let lat = resp.lat
      //   let long = resp.lng
      //   let name = resp.direccion
      let resp_temp = await clima.getTemperatura(resp.lat,resp.lng)
      let temperatura = resp_temp.temp
      return `El clima de ${resp.direccion} es de ${temperatura}°`

   } catch (error) {
      return `No se pudo determinar el clima de ${direccion}`
   }
}

getInfo(encodeDIR)
.then(console.log)
.catch(console.log)



