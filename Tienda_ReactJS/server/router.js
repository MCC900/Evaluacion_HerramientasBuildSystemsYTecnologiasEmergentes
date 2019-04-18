const modelos = require("./modelos.js");
const Usuario = modelos.Usuario;
const router = require('express').Router();

router.post("/login", function(req, res){
  Usuario.find({email:req.body.email}, (err, resultado)=>{
    if(err){
      res.send({exito:false, msjError:"El servidor de la Base de Datos (mongo) no está disponible", error:err});
    } else {
      if(resultado.length == 0){
        res.send({exito:false, msjError:"No existe el usuario "+req.body.email+" en la Base de Datos"});
      } else {
        if(resultado[0].contrasena == req.body.contrasena){
          req.session.logueado = true;
          req.session.email = req.body.email;
          console.log("El usuario "+req.session.email+" se ha logueado");
          res.send({exito:true});
        } else {
          res.send({exito:false, msjError:"La contraseña es incorrecta"});
        }
      }
    }
  });
});

module.exports = router;
