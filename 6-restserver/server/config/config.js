// esto mas que todo es para cuando subimos a heroku este pondra un puerto por defecto en nuestro proces.env
process.env.PORT = process.env.PORT || 3000;

//==============================
// ENTORNO
//==============================
// cuando la aplicacion esta en produccion se crea una variable en el process.env.NODE_ENV
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//==============================
// Base de datos
//==============================
let urlDB;
if(process.env.NODE_ENV === "dev"){
   //url de conexion localhost
   urlDB = "mongodb://localhost:27017/cafe" 
} else{
   // url de conexion de Mongo Atlas donde se encuentra alojado nuestra base de datos
   urlDB = process.env.MONGO_URI
}

process.env.URLDB = urlDB;