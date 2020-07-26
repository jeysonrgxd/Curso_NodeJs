const jwt = require("jsonwebtoken")

let verificaToken = (req, res, next) =>{
   // obtenemos el token de las cabezeras http con req.get("..")
   let token = req.get("token")

   jwt.verify(token, process.env.SEED,(err,decoded)=>{
      // en el decoded viene el payload del jwt entonses es el cuerpo o los atributos que le dimo al primer parametro del jwt.sign(...)
      if(err){
         return res.status(401).json({
            ok:false,
            error:err
         }) 
      }

      // creamos una nueva propiedad para el request
      req.usuario = decoded.usuario
      next()

   })
}
// verificamos si el usuario es de rol admin para poder crear un nuevo usuario
let verificaAdmin_Role = (req,res,next)=>{
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