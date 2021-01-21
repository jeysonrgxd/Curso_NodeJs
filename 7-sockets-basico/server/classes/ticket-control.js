const fs = require("fs")
const path = require("path")

class Ticket {
   constructor(ultimo, escritorio) {
      this.ultimo = ultimo
      this.escritorio = escritorio
   }
}

class ticketControl {

   constructor() {
      
      // manejamos una propiedad
      this.ultimo = 0
      this.hoy = new Date().getDate()
      this.tickets = []

      // este require ya utomaticamente transforma archivos json a objetos
      let data = require("../data/data.json")

      if (this.hoy === data.hoy) {

         this.ultimo = data.ultimo
         this.tickets = data.tickets

      }

      else {
         this.reiniciarConteo()
      }
   }

   siguiente() {
      this.ultimo++

      // creamos una instacia de la clase Ticket para despues almacenarla en el array atributo de nuestra clase ticketControl
      let ticket = new Ticket(this.ultimo, null)
      this.tickets.push(ticket) //esto guarda la instacion(objeto) en this.tickets

      this.grabarDatos()

      return `Ticket ${this.ultimo}`
   }

   getEstadoActual() {
      return `Ticket ${this.ultimo}`
   }

   reiniciarConteo() {
      this.ultimo = 0
      this.tickets = []
      this.grabarDatos()
   }


   grabarDatos() {
      let jsonData = {
         ultimo: this.ultimo,
         hoy: this.hoy,
         tickets: this.tickets //tambien registramos el array de tickets
      }

      // recordar que tickets tiene todo el array de objetos instaciados de la clase Ticket, el JSON.stringify() convierte cualqueir objeto de instacion a objeto normal pero de texto plano

      let jsonDataString = JSON.stringify(jsonData)

      // aca la direccion es relativa (debemos asignarle la ruta completa) ya que le estamos diciendo donde lo escribira en que ruta especifica, mas no le estamos diciendo de donde obtendra
      // hay dos maneras
      // fs.writeFileSync("./server/data/data.json",jsonDataString)
      fs.writeFileSync(path.join(__dirname, "../data/data.json"), jsonDataString)
   }



}

module.exports = ticketControl