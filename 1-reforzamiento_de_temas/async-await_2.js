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

let getEmpleado = async (id) => {
      let empleadobd = empleados.find(em => em.id === id);
      if (empleadobd) {
         return (empleadobd);
      } else {
         // disparador de error
         throw new Error(`No existe un empleado con el ID ${id}`);
      }
}

let getSalario = async (empleado) => {
      let objsalario = salarios.find(sal => sal.id == empleado.id);
      if (!objsalario) {
         // disparador de error
         throw new Error(`No se encontro un salario para el usuario ${empleado.nombre}`)
      } else {
         return{
            nombre: empleado.nombre,
            salario: objsalario.salario
         }
      }
}

let get_information = async (id) =>{
   let empleado = await getEmpleado(id);
   let salario = await getSalario(empleado)
   console.log(empleado)
   console.log(salario)
}

get_information(4).catch(err => {
   console.log("El error fue ", err)
});