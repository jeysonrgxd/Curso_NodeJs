// YARGS libreria que nos ayudara a controlar y manejar de manera adecuada nuestras varibales para aplicaciones de consola
const argv2 = require("yargs")
   .command("listar", "Imprime en consola la tabla de multiplicar", {
      // objeto para poder trabajar con los argumentos que le pasaremos al comando listar que especificamos (flags los --.....) pasado en las  lineas de comando
      base: {
         demand: true,
         alias: 'b',
         default: 10

      },
      limite: {
         alias: 'l',
         default: 10
      }
   })
   .command("crear", "Crea un archico de texto con la tabla especificada", {
      // objeto para poder trabajar con los argumentos que le pasaremos al comando crear que especificamos (flags los --.....) pasado en las  lineas de comando
      base: {
         demand: true,
         alias: 'b',
         default: 10
      },
      limite: {
         alias: 'l',
         default: 10
      }
   })
   .help() //nos ayudara apoder listar un conjunto de ayuda de parametros o comando a consultar
   .argv

module.exports = {
   argv2
}