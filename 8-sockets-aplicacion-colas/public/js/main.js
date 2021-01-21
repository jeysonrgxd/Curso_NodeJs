var socket = io()

let nuevoTicket = $("#lblNuevoTicket")

socket.on("connect", function () {
   console.log("Conectado al servidor");
})

socket.on("disconnet", function () {
   console.log("Se desconecto del servidor");
})

socket.on("estadoActual",function(option){
   $("#lblNuevoTicket").text(option.estado)
})

// usamos jquery para evitar la fatiga
$('button').on("click", () => {
   socket.emit("siguienteTicket", null, function (siguiente) {
      nuevoTicket.text(siguiente) 
      console.log(siguiente);
   })
})