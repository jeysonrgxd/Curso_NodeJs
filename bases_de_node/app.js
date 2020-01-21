// usamos el metodo destructuring

// le podemos poner un alias si queremos pero tenemos que llamarlo mas abajo
// const {archivoText :mmm} = require("./multiplicar/multiplicar")
const { archivoText, listarOperacion } = require("./multiplicar/multiplicar")

// cuyando node se ejecuta ya crea esa variable global ya que es nativo de node y por ende no debemos trarer nada o inportar nada para usarla
// let proceso = process;
//  console.log(proceso)

// para ordenar el codigo mejor importamos la configuracion que creamos del yargs en config/yargs.js podemos hacerla de dos formas, la primera es por que estamos exportando con module.exports un objeto fijarse en config/yargs.js el 
//seundo es por metodo destructuring
// const  argv2  = require("./config/yargs").argv2;
const { argv2 } = require("./config/yargs");

//  en el process hay argv que al correr nuestro proyecto osea node app.js argumento argumento
// esos argumentos se veran agregados en el argv de process y lo podemos observar al hacer un consolo.log de process.arbv
// console.log(process.argv)

// let argv = process.argv
// let parametro = argv[2];
// let base = parametro.split("=")[1];
// console.log(base);

//----------- CLASE YARGS ------------------
// metodo con yargs
// console.log(argv2);

//--al mandar en la consola parametros sin --name solamente el name usamos
//esto nos traera en un array los valores que pasamos
// console.log(argv2._)
 
console.log(argv2)

// utilizamos el yargs obteniendo parametros y asiendo un switch para poder utiliza el archivoText()
let comando = argv2._[0];
switch(comando){
   case 'crear':
   archivoText(argv2.base, argv2.limite)
      .then((resp)=>{
         console.log(resp);
      })     
      .catch((err)=>{
         console.log(err);
      })
   break;
   case 'listar':
      listarOperacion(argv2.base, argv2.limite)
         .then((resp)=> console.log(resp) )
         .catch((err)=> console.log(err))
   break;
   default:
      console.log("comando no reconocido")

}



 

