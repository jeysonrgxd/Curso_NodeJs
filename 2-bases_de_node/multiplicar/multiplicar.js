// requerimos la clase(libreria) fs "FileSystem" este ya se encuentra nativamente en node por lo que no devemos importar nada es mas no nesesitamos ese paquetaso de node module, como si lo nesesitaremos al trabajar con el framework express o con yargs ya que este no pertenece a node nativamente
const fs = require("fs");
const colors = require("colors")

// tambien puede ser module.exports.archivoText = () .......

// funcion de listar en consola 
let listarOperacion = (base, limite) =>{
   return new Promise((resolve,reject)=>{
      if(!Number(base)){
         reject("La base no esta bien definida por favor verifique".red)
         return;
      }
      let resp = "==========================\n".green
      resp += `tabla del ${base}\n`.green
      for(let i = 0; i<=limite; i++){
         resp += `${base} * ${i} = ${base*i} \n`
      }
      resp += "\n==========================".green
      resolve(resp);
   })
}



// le asignamos por default al argumento limite el 10 ps podemos no ponerlo ya que en el yargs ya estamos especificando un valor por deafult y lo obtendremos de todas maneras
let archivoText = (base, limite =10) => {
   
   return new Promise((resolve,reject)=>{
      if (!Number(base)) {
         reject("el parametro no es un numero")
         return;
      }
      let resp = "";

      for (let i = 0; i <= limite; i++) {
         resp += `${base} * ${i} = ${base * i}\n`
      }

      // esta funcion de la clase fs nos crea un archivo y nos guarda donde queramos
      // primer parametro es laubicacion del archivo y que nombre tendra, el segundo es la
      // informacion que bamos a guardar y el tercero es un callback el cual verificara si no hay
      //error de permisos de caracteres el cual recive un err para imprimir si hay error sino hacemos
      //lo que deseamos una vez guardado o creado el archivo
      fs.writeFile(`./tablas/tabla-${base}.txt`, resp, (err) => {
         if (err) reject(err);
         resolve("el archivo: " + `tabla-${base} a sido creado`.green);
      })
   })

}
// forma de exportar mejor desde un objeto y ir agregandole mas y mas cosas
module.exports = {
   archivoText,
   listarOperacion
}