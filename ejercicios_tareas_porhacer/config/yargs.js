// aca estara la configuracion de yargs
const argv = require("yargs")
               .command("crear","Crear un elemento por hacer",{
                  descripcion:{
                     demand:true,
                     alias:'d',
                     desc: 'Descripción de la tarea por hacer'
                  }
               })
               .command("actualizar","Actualiza el estado completado de una tarea",{
                  descripcion:{
                     demand:true,
                     alias:'d',
                     desc:'Descripción de la tarea por hacer'
                  },
                  completado:{
                     demand: true,
                     default:true,
                     alias:'c',
                     desc:'Marca como completado o pendiente la tarea'

                  }
               })
               .command("borrar","Borrar tarea si ya esta terminada",{
                  descripcion:{
                     demand:true,
                     alias:'d',
                     desc:"Descripción de la tarea por hacer"
                  }
               })
               .help()
               .argv //retornamos el argv

module.exports = {
   argv
}