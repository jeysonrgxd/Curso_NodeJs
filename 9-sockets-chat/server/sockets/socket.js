// const { io } = require('../server');
const socketIO = require('socket.io');
const Usuarios = require("../classes/usuarios")
const { crearMensaje } = require("../utils/crearMensaje")

const usuarios = new Usuarios()

function iniciarSockets(server) {

    let io = socketIO(server)

    io.on('connection', (client) => {

        client.on("entrarChat", function (data, callback) {

            if (!data.nombre) {
                callback({
                    error: true,
                    mensaje: "El nombre es necesario"
                })
            }

            let personas = usuarios.agregarPersonas(client.id, data.nombre)

            // en esta parte avisa alos demas de cuantos usuarios hay ahora, mas no avisa al que recien a entrado
            client.broadcast.emit("listaPersona", usuarios.getPersonas())

            callback(personas)
        })

        // escuchamos los mensajes que nos envian
        client.on("crearMensaje", (data) => {
            let persona = usuarios.getPersona(client.id)

            // emitimos atodos los usuarios conectados ese mensaje que nos manda un cliente
            client.broadcast.emit("crearMensaje", crearMensaje(persona.nombre, data.mensaje))
        })


        client.on("disconnect", () => {

            let personaBorrada = usuarios.borrarPersonas(client.id)

            // atodos los conectados les avisamos
            client.broadcast.emit("crearMensaje", crearMensaje('administrador', `${personaBorrada.nombre} abandono el chat`))

            // despues le mandamos la cantidad de personas que ahora queda conecta
            client.broadcast.emit("listaPersona", usuarios.getPersonas())

        })

    });



}

module.exports = iniciarSockets
