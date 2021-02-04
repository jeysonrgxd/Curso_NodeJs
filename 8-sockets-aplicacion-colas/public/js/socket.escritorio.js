var socket = io()

// obtenemos los valores de los parametros de la url
var searchParams = new URLSearchParams(window.location.search)

if (!searchParams.has("escritorio")) {
   location.href = "/"
   throw new Error("Deve enviar escritorio")
}

$('h1').text('Escritorio ' + searchParams.get("escritorio"))
var label = $("small")

$("button").on("click", function () {

   socket.emit("atenderTicket", {

      escritorio: searchParams.get("escritorio")

   },
   function(resp){

      if (resp == "No hay tickets"){
         alert(resp)
         label.text(resp)
         return
      }

      console.log(resp);
      label.text("ticket " + resp.ultimo)
   })

})
