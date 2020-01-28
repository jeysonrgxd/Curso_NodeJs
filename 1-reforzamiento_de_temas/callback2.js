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
}];

let getEmpleado = (id, callback) => {
   let empleadobd = empleados.find(em => em.id === id);
   if (!empleadobd) {
      return callback(`No existe un emplado con el Id ${id}`);
   } else {
      return callback(null, empleadobd);
   }
}

let getSalario = (empleado, callback) => {
   let objsalario = salarios.find(sal => sal.id == empleado.id);
   if (!objsalario) {
      callback(`No se encontro un salario para el usuario ${empleado.nombre}`)
   } else {
      callback({
         nombre: empleado.nombre,
         cantidad : objsalario.salario
      })

   }

}

// getEmpleado(2, (err, emp) => {
//    if (err) {
//       return console.log(err)
//    }
//    console.log(emp)
// })

// repasar un poco despues los callback con return es un poco tranca
// recordar que el callback con su corchetes como parametro no es el cuerpo de la funcion osea no estas escribiendo que ara la funcion getEmpleado ya que arriba ya e escribio que ara lo que asemos es que ara o devolvera la funcion de parametro ("callback")
let usuario2 = getEmpleado(2, (err, emp) => {
   if (err) {
      return err;
   }
   return emp;
})
console.log(usuario2)

getSalario(getEmpleado(2,(err,emp)=> emp), (persal)=>{console.log(persal)})

