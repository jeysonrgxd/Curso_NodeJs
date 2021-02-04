var socket = io()

// obtenemos los elementos al cual le meteremos los datos dinamica mente
var lblaTicket1 = $('#lblTicket1')
var lblaTicket2 = $('#lblTicket2')
var lblaTicket3 = $('#lblTicket3')
var lblaTicket4 = $('#lblTicket4')

var lblEscritorio1 = $('#lblEscritorio1')
var lblEscritorio2 = $('#lblEscritorio2')
var lblEscritorio3 = $('#lblEscritorio3')
var lblEscritorio4 = $('#lblEscritorio4')

var lblTickets = [lblaTicket1, lblaTicket2, lblaTicket3, lblaTicket4]
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4]


socket.on("estadoActual", function (data) {
   console.log(data);
   actualizatHTML(data.ultimos4)
})

socket.on("ultimos4",function(data){

   var audio = new Audio('/audio/new-ticket.mp3')
   audio.play()

   actualizatHTML(data.ultimos4)
})

// crearemos una funcion el cual servira para actualizar el html cuando el servidor nos envien un cambio atravaes de nuestro socket
function actualizatHTML(ultimos4) {

   for (var i = 0; i <= (ultimos4.length - 1); i++) {
      lblTickets[i].text('Ticket ' + ultimos4[i].ultimo)
      lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio)
   }


}