const jwt = require("jsonwebtoken")

let verificaToken = (req, res, next) =>{
   // obtenemos el token de las cabezeras http con req.get("..")
   let token = req.get("token")

   // verificamos el token con la llave secrete el cual generamos al hacer login
   jwt.verify(token, process.env.SEED,(err,decoded)=>{
      // en el decoded viene el payload del jwt entonses es el cuerpo o los atributos que le dimo al primer parametro del jwt.sign(...)
      if(err){
         return res.status(401).json({
            ok:false,
            error:err
         }) 
      }

      //si no hay error entonses viene, creamos una nueva propiedad para el request en el cual le pasamos los datos del
      req.usuario = decoded.usuario
      next()

   })
}
// verificamos si el usuario es de rol admin para poder crear un nuevo usuario
let verificaAdmin_Role = (req,res,next)=>{
   // obtenemos el role del usuario del payload que le pasamo al req y el cual nos brindo cuando isimos login 
   let role = req.usuario.role

   if (role !== "ADMIN_ROLE") {
      return res.status(401).json({
         ok:false,
         message:"Su rol no tiene permiso para la creacion de usuarios"
      })
   }

   next()
}

module.exports = {
   verificaToken,
   verificaAdmin_Role
}