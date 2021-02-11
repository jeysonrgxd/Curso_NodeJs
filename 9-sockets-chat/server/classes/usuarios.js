class Usuarios {
   constructor() {
      this.personas = [];
   }

   agregarPersonas(id, nombre, sala) {
      let persona = { id, nombre, sala }
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

   getPersonasPorSalas(sala) {
      let personas = this.personas.filter(persona => persona.sala === sala)
      return personas
   }

   borrarPersonas(id) {

      let personaBorrada = this.getPersona(id)
      this.personas = this.personas.filter(persona => persona.id !== id)

      return personaBorrada
   }

}

module.exports = Usuarios