const express = require("express")
const app = express()
const hbs = require("hbs")

const port = process.env.PORT || 3000

// no lo guardamos en una varibles constante como los demas debido que este archivo que importamos se ejecuta y se registran en el hbs  ya que tiene funciones ejecutandose de hbs
require("./hbs/helpers/helpers");


// asi utilizemos un template engine para nuestras paginas es nesesario que este el app.use
// ya que nos tare los archivos del public y es lo que nuestra plnatilla de hbs utiliza como stylos js bootstrap
app.use(express.static(__dirname + '/public'))


//los partiales son bloques de codigo html que nosotros podemos reutilizar para este caso utilizaremos registerPartials para especificar un folder que contiene todo los partiales, ya que si utilimazon el registerPartial sin s solo especificamos 1 solo
hbs.registerPartials(__dirname+'/views/parciales')

// especificamo o setteamos el template engiene
app.set("view engine", "hbs");

app.get("/", (req,res) => {

   //- renderisamos (o mandamos directamente) enviandole por medio de res que nos da el servidor (la respuesta para el cliente)
   //- de esta manera cualquier peticion que ingrese atravez de "/" va reenderizar el home de hbs
   res.render("home",{
      name:"jeyson",
      // anio: new Date().getFullYear() lo comentamos por que usaremos un helper en su lugar
   })

})
app.get("/about", (req, res) => {

   // res.render("about", {
   //    name: "jeyson",
   //    anio: new Date().getFullYear()
   // })
   // usamos el helper ya no nesesitamos pasar un objeto
   res.render("about")
})

app.listen(port, () => console.log(`server listen in port ${port}`))
