// esto mas que todo es para cuando subimos a heroku este pondra un puerto por defecto en nuestro proces.env
process.env.PORT = process.env.PORT || 3000;

//==============================
// ENTORNO
//==============================
// cuando la aplicacion esta en produccion se crea una variable en el process.env.NODE_ENV
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//==============================
// Fecha de expiracion del token
// 60 SEGUNDO, X60  = 60 MINUTOS = 1HORA * 24HORAS = 1 DIA * 30 = 30 DIAS = 1 MES
//==============================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30

//==============================
// SEED de autenticacíon
//==============================
process.env.SEED = process.env.SEED || "secret-desarrollo"

//==============================
// Base de datos
//==============================
let urlDB;
if(process.env.NODE_ENV === "dev"){
   //url de conexion localhost
   urlDB = "mongodb://localhost:27017/cafe" 
} else{
   // url de conexion de Mongo Atlas donde se encuentra alojado nuestra base de datos
   // aca utilizamos la variable que fue creada en la terminal de heroku para poder ocultar nuestra url de conexion 
   urlDB = process.env.MONGO_URI
}

process.env.URLDB = urlDB;