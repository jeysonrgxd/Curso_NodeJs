let empleados = [{
      id: 1,
      nombre: 'jeyson'
   },
   {
      id: 2,
      nombre: 'steph'
   },
   {
      id: 3,
      nombre: 'campos'
   }
];

let salarios = [{
      id: 1,
      salario: 1000
   },
   {
      id: 2,
      salario: 2000
   }
];

let saludar = async () => {
   return "jeyson"
}

let met_nombre = () => {
   return new Promise((resolve,reject)=>{
      setTimeout(()=>{
         resolve("Jeyson")
      },1000)
   })
}


// saludar().then(respuesta => {
//    console.log(respuesta)
// })

let saludoasync = async () => {
   let saludito = await met_nombre()
   // console.log(saludito)
   return saludito
}

// toda funcion async retorana una promesa
saludoasync().then(resp=> console.log(resp))

