let getUsuarioByid = (id, callback) => {
   let usuario = {
      nombre : 'steph',
      id
   }
   // definiendo si hay un error
   if(id == 20){
      // en este caso el err es el primer parametro
      callback(`el id ${usuario.id} no existe en la base de datos`)

   }else{
      // si llegamos aqui es por que no hay error entonses validamos enviandole null al callback que se ejecutara para poder validarlo al momento de la imbocacion
      callback(null,usuario)
   }
}

getUsuarioByid(10, (err,usuario)=>{
   if(err){
      // ponemos return para que nos regrese el console.log con el mensaje y finalize y no ejecute la demas lineas de codigo
      return console.log(err);
   }
   console.log(`el usuario de base de datos:`, usuario);
})