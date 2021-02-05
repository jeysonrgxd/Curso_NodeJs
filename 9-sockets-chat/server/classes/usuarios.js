class Usuarios {
   constructor() {
      this.personas = [];
   }

   agregarPersonas(id, nombre) {
      let persona = { id, nombre }
      this.personas.push(persona);

      return this.personas;
   }

   getPersona(id) {
      let persona = this.personas.filter(persona => persona.id === id)

      return persona[0]
   }

   getPersonas() {
      return this.personas
   }

   borrarPersonas(id) {

      let personaBorrada = this.getPersona(id)
      this.personas = this.personas.filter(persona => persona.id !== id)
      
      return personaBorrada
   }

}

module.exports = Usuarios