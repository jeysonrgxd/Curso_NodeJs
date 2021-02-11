// const { io } = require('../server');
const socketIO = require('socket.io');
const Usuarios = require("../classes/usuarios")
const { crearMensaje } = require("../utils/crearMensaje")

const usuarios = new Usuarios()

function iniciarSockets(server) {

    let io = socketIO(server)

    io.on('connection', (client) => {

        client.on("entrarChat", function (data, callback) {

            if (!data.nombre && !data.sala) {
                callback({
                    error: true,
                    mensaje: "El nombre es necesario"
                })
            }

            // unimos el cliente a un chat el cual es el que enviamos atravez del formulario de conexion
            client.join(data.sala)

            usuarios.agregarPersonas(client.id, data.nombre, data.sala)

            // en esta parte avisa alos demas de cuantos usuarios hay ahora, mas no avisa al que recien a entrado
            // client.broadcast.emit("listaPersona", usuarios.getPersonas())

            // listamos las personas que solo esten en la sala
            client.broadcast.to(data.sala).emit("listaPersona", usuarios.getPersonasPorSalas(data.sala))

            callback(usuarios.getPersonasPorSalas(data.sala))
        })

        // escuchamos los mensajes que nos envian
        client.on("crearMensaje", (data) => {
            let persona = usuarios.getPersona(client.id)

            // emitimos atodos los usuarios conectados ese mensaje que nos manda un cliente
            // client.broadcast.emit("crearMensaje", crearMensaje(persona.nombre, data.mensaje))

            // emitimos solo ala sala que deseo enviar el mensaje
            client.broadcast.to(persona.sala).emit("crearMensaje", crearMensaje(persona.nombre, data.mensaje))
        })


        client.on("disconnect", () => {

            let personaBorrada = usuarios.borrarPersonas(client.id)

            // atodos los conectados les avisamos
            // client.broadcast.emit("crearMensaje", crearMensaje('administrador', `${personaBorrada.nombre} abandono el chat`))

            // atodos los conectados en la sala les avisamos
            client.broadcast.to(personaBorrada.sala).emit("crearMensaje", crearMensaje('as', 'administrador', `${personaBorrada.nombre} abandono el chat`))

            // despues le mandamos la cantidad de personas que ahora queda conecta
            // client.broadcast.emit("listaPersona", usuarios.getPersonas())

            // despues le mandamos la cantidad de personas que ahora queda conecta en la sala
            client.broadcast.emit("listaPersona", usuarios.getPersonasPorSalas(personaBorrada.sala))

        })

        // escuchamos el mensaje privado y enviamos al que corresponde para eso nesesitamos trabajar con el id
        client.on("mensajePrivado", (data) => {
            // primero obtenemos al usuario quien envie este mensaje el cual desencadena esete oyente
            let persona = usuarios.getPersona(client.id)

            client.broadcast.to(data.para).emit("mensajePrivado", crearMensaje(persona.nombre, data.mensaje))
        })

    });



}

module.exports = iniciarSockets

