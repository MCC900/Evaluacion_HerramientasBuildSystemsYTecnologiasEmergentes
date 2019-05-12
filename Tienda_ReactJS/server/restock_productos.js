const mongoose = require('mongoose');
const modelos = require('./modelos.js');

const Producto = modelos.Producto;

let url = "mongodb://localhost/tienda_reactjs";
mongoose.connect(url, {useNewUrlParser:true});
mongoose.connection.on('error', (error)=>{
  console.log("(!) ERROR al conectar con mongo");
  process.exit();
});

//{$inc:{stock:20}} incrementa en 20 la propiedad stock de cada coincidencia. Ver documentación de mongoose online
Producto.updateMany({},{$inc:{stock:20}}, (error, resultado)=>{
  if(error){
    console.log(error);
  } else {
    console.log("Agregado 20 unidades al stock de cada producto.");
  }
});
