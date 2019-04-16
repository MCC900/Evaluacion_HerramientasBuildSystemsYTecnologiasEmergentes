const mongoose = require('mongoose');
const modelos = require('./modelos.js');
const Usuario = modelos.Usuario;

let url = "mongodb://localhost/tienda_reactjs";
mongoose.connect(url, {useNewUrlParser:true});

let usuarios = [
  {email:"pedro@gmail.com", contrasena:"12345"},
  {email:"jose@gmail.com", contrasena:"josejose"},
  {email:"maria@hotmail.com", contrasena:"67890"}
]

for(let i = 0; i < usuarios.length; i++){
  let usu = usuarios[i];
  Usuario.find({email:usu.email}, (error, resultado)=>{
    if(resultado.length == 0){
      let usuNuevo = new Usuario({email:usu.email, contrasena:usu.contrasena});
      usuNuevo.save((error)=>{
        if(error){
          console.log("Error al crear usuario");
        } else {
          console.log("Usuario "+usu.email+" creado exitosamente.");
        }
      })
    } else {
      console.log("Ya existe el usuario "+usu.email+" en la base de datos.");
    }
  }).then(()=>{
    console.log("Fin.");
    process.exit();
  })
}
