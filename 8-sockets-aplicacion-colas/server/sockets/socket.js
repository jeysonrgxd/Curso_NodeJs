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
        estado: ticket.getEstadoActual(),
        ultimos4:ticket.getUltimos4()
    })

    // esto me enviara el cliente y escuchamos
    client.on("atenderTicket", (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: "El escritorio es necesario"
            })
        }

        let atenderTicket = ticket.atenderTicket(data.escritorio);

        // retornamos el tiket para que la persona en el front lo pueda trabajar
        callback(atenderTicket);

        client.broadcast.emit("ultimos4",{
            ultimos4: ticket.getUltimos4()
        })

        // actualizar / notificar cambios en los ultimos 4 osea que se muestre atodos los conectados que el escritorio esta siendo atendido algo asi
    })

});