// aca estara la ejecucion del programa

const { argv } = require("./config/yargs")
const colors = require("colors");
const porHacer = require("./por-hacer/por-hacer")
console.log(argv);

let comando = argv._[0];

switch(comando){
   case 'crear':
      let newtarea = porHacer.crear(argv.descripcion)
      console.log(newtarea);
   break;
   case 'listar':
      let listado = porHacer.getListado()
      for (let tarea of listado) {
         console.log("\n\n======== Por Hacer ========".yellow);
         console.log(tarea.descripcion);
         console.log("Estado: ", tarea.completado);
         console.log("===========================".magenta);
      }
   break;
   
   case 'actualizar':
      let actualizado = porHacer.updateTarea(argv.descripcion, argv.completado)
      console.log(actualizado);
   break;

   case 'borrar':
      let borrado = porHacer.deleteTarea(argv.descripcion)
      console.log(borrado)
   break;

   default:
      console.log('Comando no es reconocido')
   break;

}