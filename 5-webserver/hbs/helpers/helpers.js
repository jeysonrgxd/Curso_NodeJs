const hbs = require("hbs")

// helpers : es una funcion que se dispara cuando template lo rrequiere "por eso solo se usa en el el template de HBS"
hbs.registerHelper("getAnio", () => new Date().getFullYear())

// creamos otro helper esta vez con una funcion que obtiene un parametro
hbs.registerHelper("capitalizar", (texto) => {
   let capita = texto.split(" ");
   capita.forEach((e, x) => {
      capita[x] = e.charAt(0).toUpperCase() + e.slice(1)
   });
   return capita.join(" ") //retornamos un string que se convirtio con join al array
})
