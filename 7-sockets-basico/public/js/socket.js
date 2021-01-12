let $h3 = document.querySelector("h3")

// funciones que se dispararan cuando recivamos informaciones del servidor
var socket = io()

// on:evento(oyente) cuando tengo un canal de conexion abierta entre el servidor y el cliente
socket.on("connect", function () {
   console.log("conectado al servidor")
   $h3.textContent = "Se conecto al servidor"
})

socket.on("disconnect", function () {
   console.log("Se desconecto del servidor")
   $h3.textContent = "Se desconecto del servidor"
})

// emit: emitir evento enviandole al servidor un mensaje puede ser string boolean objeto
// enviarle datos al servidor atravez del cliente
// esto se mandara automaticamente por que lo estamos escribiendo de frente usualmente esto se deve hacer mediante alguna accion o evento de javascriot del doom
socket.emit("enviarMensaje", {
   usuario: "jeyson",
   mensaje: "hola como estas"
},
   // esta funcion es con la que recibimos la la informacion que nos manda el servidor si ocurrio un problema al hacer algo despues de recibir la data
   function (respuesta) {
      console.log("Respuesta del server", respuesta)
   })

//recibimos la informacion que nos mando el servidor
socket.on("enviarMensaje", function (message) {
   console.log(message)
   $h3.textContent = message.message
})