const mongoose = require('mongoose');
const express = require('express');

let Schema = mongoose.Schema;

//--USUARIO--
let usuarioSchema = new Schema({
  email:{type:String, required:true},
  contrasena:{type:String, required:true}
});

let Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = {Usuario:Usuario};
