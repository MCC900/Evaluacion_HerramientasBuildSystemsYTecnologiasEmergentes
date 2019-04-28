const mongoose = require('mongoose');
const modelos = require('./modelos.js');
const Usuario = modelos.Usuario;
const Producto = modelos.Producto;

let url = "mongodb://localhost/tienda_reactjs";
mongoose.connect(url, {useNewUrlParser:true});
mongoose.connection.on('error', (error)=>{
  console.log("(!) ERROR al conectar con mongo");
  process.exit();
});

let usuarios = [
  {email:"pedro@gmail.com", contrasena:"12345"},
  {email:"jose@gmail.com", contrasena:"josejose"},
  {email:"maria@hotmail.com", contrasena:"67890"}
];

let productos = [
  {nombre:"Aguacate", precio:5, stock:rand(), nombreArchivo:"aguacate.jpg"},
  {nombre:"Ajo", precio:2, stock:rand(), nombreArchivo:"ajo.jpg"},
  {nombre:"Almendras", precio:8, stock:rand(), nombreArchivo:"almendras.jpg"},
  {nombre:"Arándanos", precio:6, stock:rand(), nombreArchivo:"arandanos.jpg"},
  {nombre:"Brócoli", precio:4, stock:rand(), nombreArchivo:"brocoli.png"},
  {nombre:"Calabaza", precio:1, stock:rand(), nombreArchivo:"calabaza.jpg"},
  {nombre:"Canela", precio:10, stock:rand(), nombreArchivo:"canela.jpg"},
  {nombre:"Cebolla", precio:7, stock:rand(), nombreArchivo:"cebolla.jpg"},
  {nombre:"Fresa", precio:12, stock:rand(), nombreArchivo:"fresa.jpg"},
  {nombre:"Kiwi", precio:13, stock:rand(), nombreArchivo:"kiwi.jpg"},
  {nombre:"Lychee", precio:16, stock:rand(), nombreArchivo:"lychee.jpg"},
  {nombre:"Maíz", precio:5, stock:rand(), nombreArchivo:"maiz.jpg"},
  {nombre:"Manzana", precio:6, stock:rand(), nombreArchivo:"manzana.jpg"},
  {nombre:"Naranja", precio:6, stock:rand(), nombreArchivo:"naranja.jpg"},
  {nombre:"Papa", precio:6, stock:rand(), nombreArchivo:"papa.jpg"},
  {nombre:"Pasta", precio:6, stock:rand(), nombreArchivo:"pasta.jpg"},
  {nombre:"Pimienta", precio:6, stock:rand(), nombreArchivo:"pimienta.jpg"},
  {nombre:"Repollo", precio:6, stock:rand(), nombreArchivo:"repollo.jpg"},
  {nombre:"Tomate", precio:6, stock:rand(), nombreArchivo:"tomate.jpg"},
  {nombre:"Zanahoria", precio:3, stock:rand(), nombreArchivo:"zanahoria.jpg"}
];

function generarUsuarios(){
  let ususCreados = 0;

  for(let i = 0; i<usuarios.length; i++){
    let usu = usuarios[i];
    Usuario.find({email:usu.email}, (error, resultado)=>{
      if(resultado.length == 0){
        let usuNuevo = new Usuario({email:usu.email, contrasena:usu.contrasena});
        usuNuevo.save((error)=>{
          if(error){
            console.log("Error al crear usuario.");
          } else {
            console.log("Usuario "+usu.email+" creado exitosamente.");
          }

          ususCreados++;
          if(ususCreados == usuarios.length){
            console.log("...");
            generarProductos();
          }
        });
      } else {
        console.log("El usuario "+usu.nombre+" ya existe en la base de datos.");
        ususCreados++;
        if(ususCreados == usuarios.length){
          console.log("...");
          generarProductos();
        }
      }
    });
  }
}

function rand(){
  return Math.floor(Math.random()*96 + 5);
}

function generarProductos(){
  let prodsCreados = 0;

  for(let i = 0; i<productos.length; i++){
    let prod = productos[i];
    Producto.find({nombre:prod.nombre}, (error, resultado)=>{
      if(resultado.length == 0){
        let prodNuevo = new Producto({nombre:prod.nombre, precio:prod.precio, stock:prod.stock, nombreArchivo:prod.nombreArchivo});
        prodNuevo.save((error)=>{
          if(error){
            console.log("Error al crear producto.");
          } else {
            console.log("Producto "+prod.nombre+" creado exitosamente.");
          }

          prodsCreados++;
          if(prodsCreados == productos.length){
            console.log("Fin.");
            process.exit();
          }
        });
      } else {
        console.log("El producto "+prod.nombre+" ya existe en la base de datos.");
        prodsCreados++;
        if(prodsCreados == productos.length){
          console.log("Fin.");
          process.exit();
        }
      }
    });
  }
}

generarUsuarios();
