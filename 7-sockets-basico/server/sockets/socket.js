const socketIO = require("socket.io")

module.exports.serverSocket = function (server) {
   
   // incialisamos el socket, esta es la cominicacion del backend
   const io = socketIO(server)

   // escuchando cuando un cliente se conecta a nuestro servidor de socket, recive dos parametros el evento y el callback con el cliente conectado el cual es un objeto de datos del conectado osea del cliente o maquina
   io.on("connection", (client) => {
      console.log("Se conecto un usuario");


      // usamos el parametro client para acceder asus eventos, acedemos si este se desconecto
      client.on("disconnect", () => {
         console.log("El cliente se desconecto");
      })

      // escuchamos el evento que nos manda el cliente y recibimos su informacion mediante el parametro de nuestro callback
      // con el segundo paramentro callback, podemos enviarle al cliente si algo salio mal por ejemplo si queremos guardar la data en la base de datos y tenemos un error ps enviamos el callback con un mensaje de error, ya el cliente lo recivira mediante su callback
      client.on("enviarMensaje", (message, callback) => {
         console.log(message);
         if (message.usuario) {
            callback("Tiene usuario asi que TODO SALIO BIEN!")
         }
         else {
            callback("No tiene usuario asi que TODO SALIO MAL")

         }
      })

      // emitimos un mensaje para el cliente (le mandamos info al cliente), lo ponemos dentro de un setTimeout para que se demore un poquito
      setTimeout(() => {
         client.emit("enviarMensaje", {
            usuario: "Administrador",
            message: "Bienvenido a esta aplicacion"
         })
      }, 1000)


   })
}

// module.exports = {
//    serverSocket
// }
   

