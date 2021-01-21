const { io } = require('../server');
const ticketControl = require("../classes/ticket-control")

let ticket = new ticketControl()

io.on('connection', (client) => {

    client.on("siguienteTicket", (_, callback) => {
        let ticketSiguiente = ticket.siguiente()
        console.log(ticketSiguiente);
        callback(ticketSiguiente)
    })

    client.emit("estadoActual", {
        estado: ticket.getEstadoActual()
    })

});