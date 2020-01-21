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

let getEmpleado = (id)=>{
   return new Promise((resolve,reject)=>{
      let empleadobd = empleados.find(em => em.id === id);
      if(empleadobd){
         resolve(empleadobd);
      } else{
         reject(`No existe un empleado con el ID ${id}`);
      }
   })
}

let getSalario = (empleado)=>{
   return new Promise((resolve, reject)=>{
      let objsalario = salarios.find(sal => sal.id == empleado.id);
      if (!objsalario) {
         reject(`No se encontro un salario para el usuario ${empleado.nombre}`)
      } else {
         resolve({
            nombre: empleado.nombre,
            salario: objsalario.salario
         })
      }
   })
}

// respues promesa dentro otra promesa
getEmpleado(3).then(empleado =>{
   console.log('Empleado de BD', empleado)

   getSalario(empleado).then(salario =>{
      console.log(salario)
   }, err=>{
      console.log(err)
   })

}, err=>{
  console.log(err); 
})


// metodo de promesas encadenadas

getEmpleado(2).then(empleado=>{
   console.log("------------------------------------------------")
   return getSalario(empleado)
})
.then(resp => console.log(resp))
.catch(err => console.log(err))
