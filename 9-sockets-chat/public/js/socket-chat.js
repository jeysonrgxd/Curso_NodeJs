var socket = io();

let params = new URLSearchParams(window.location.search)

if (!params.has("nombre")) {
    window.location = '/index.html'
    throw new Error('El nombre es necesario')
}

var usuario = {
    nombre: params.get("nombre")
}


socket.on('connect', function () {
    socket.emit("entrarChat", usuario, function (data) {
        console.log(data);
    })
});

// escuchar
socket.on('disconnect', function () {
    console.log('Perdimos conexión con el servidor');
});


// Enviar información, se comenta por que sera utilizado despues
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function (resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información cuando un usuario se desconecta
socket.on('crearMensaje', function (mensaje) {
    console.log('Servidor:', mensaje);

});

// escuchar cambios de usuarios, cuando un suuario entra o sale del chat
socket.on("listaPersona", function (personas) {
    console.log(personas)
})