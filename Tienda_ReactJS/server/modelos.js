const mongoose = require('mongoose');
const express = require('express');

let Schema = mongoose.Schema;

//--USUARIO--
let usuarioSchema = new Schema({
  email:{type:String, required:true},
  contrasena:{type:String, required:true},
  prodsCarrito:{type:[], required:false}
});

//--PRODUCTO--
let productoSchema = new Schema({
  nombre:{type:String, required:true},
  precio:{type:Number, required:true},
  stock:{type:Number, required:true},
  nombreArchivo:{type:String, required:true}
});

let Usuario = mongoose.model('Usuario', usuarioSchema);
let Producto = mongoose.model('Producto', productoSchema);
module.exports = {Usuario:Usuario, Producto:Producto};
