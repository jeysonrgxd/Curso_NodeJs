let alumno1 = {
   nombre : "jeyson",
   apellido : "garcia",
   edad: 20,
   habilidad(){
      return `yo ${this.nombre} soy bueno en programacion`
   }
}
// creamos variables de una manera de destructuracion el nombre: nombreAlumno es para asignarle un alias debido que si el codigo es muy extence puede ser que nos encontremos con variables del mismo nombre de declaracion
let {nombre :nombreAlumno, apellido, edad} = alumno1;
console.log(`hola mi nombre es ${nombreAlumno}`)
console.log(alumno1.habilidad())