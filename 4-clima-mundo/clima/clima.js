const axios = require('axios');

const getTemperatura = async (lat,long) => {
   // como la peticion es por url todo osea la llave api key y todo lo resto usaremos solo el get() de axios pasandole una direccion
      const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=f5e48ab96f9695af51409cb1ac72c2cc`)

      return resp.data.main;
 

   
}

module.exports = {
   getTemperatura
}