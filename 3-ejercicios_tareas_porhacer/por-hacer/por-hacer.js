// aca estara toda la logica le tareas por hacer
const fs = require("fs");

// Array de objetos de tipo tareas
let listadoProHacer = [];

const gardarDB = ()=>{
   let data = JSON.stringify(listadoProHacer);
   fs.writeFile("./db/data.json", data, (err) => {
      if(err) throw new Error('No se pudo grabar', err)
   })
}

const cargarDB = ()=>{
   try {
      // al llamar a la data.json con la funcion require este mismo lo serializa lo transforma en un objeto
      listadoProHacer = require("../db/data.json")
      
   } catch (error) {
      listadoProHacer = []
   }
}

const convertBool = (str)=>{
   switch (str.toLowerCase().trim()) {
      case "true":
      case "yes":
      case "1":
         return true;
      case "false":
      case "no":
      case "0":
      case null:
         return false;
      default:
         return Boolean(str);
   }
}

const crear = (descripcion) =>{
   cargarDB()
   let porHacer = {
      descripcion,
      completado:false
   }
   listadoProHacer.push(porHacer)
   gardarDB();
   return listadoProHacer;
}

const getListado = ()=>{
   cargarDB();
   return listadoProHacer;
}

const updateTarea = (descripcion, estado = true)=>{
   cargarDB();
   // nos devulve el indice(la posicion que ocupa en el array) de la tarea buscada por su descripcion
   let index_tarea = listadoProHacer.findIndex(tarea => tarea.descripcion === descripcion);
   
   if (index_tarea >= 0) {
      listadoProHacer[index_tarea].completado = convertBool(estado);
      gardarDB()
      return true;
   }

   else{
      return false;
   }
}

const deleteTarea = (descripcion) => {
   cargarDB();
   let index_tarea = listadoProHacer.findIndex(tarea => tarea.descripcion === descripcion);
   if (index_tarea >= 0){
      listadoProHacer.splice(index_tarea,1);
      // tambien podemos usar el pop
      //listadoProHacer.pop(index_tarea)
      gardarDB()
      return true;
   }
   else{
      return false;
   }
} 

module.exports = {
   crear,
   getListado,
   updateTarea,
   deleteTarea
}