// YARGS libreria que nos ayudara a controlar y manejar de manera adecuando nuestras varibales para aplicaciones de consola
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
   .help()
   .argv

module.exports = {
   argv2
}