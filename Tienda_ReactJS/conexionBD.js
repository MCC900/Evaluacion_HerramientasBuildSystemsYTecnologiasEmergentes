import * as superagent from 'superagent';

let urlBase = "http://localhost:3000";
let request = superagent.agent();

function intentarLogin(email, contrasena, callback){
  request
  .post(urlBase + '/login').withCredentials()
  .send({email:email, contrasena:contrasena})
  .set("Content-Type", "application/json")
  .then((respuesta) => {
    callback(respuesta.body);
  })
  .catch((error) => {
    callback({
      exito:false,
      msjError:"No se pudo conectar con el servidor",
      error:error
    });
  })
}

function verificarSesion(callback){
  request
  .post(urlBase+"/getSesion").withCredentials()
  .set("Content-Type", "application/json")
  .then((respuesta)=>{
    callback(respuesta.body);
  })
  .catch((error)=>{
    callback({
      exito:false,
      usuarioLogueado:"",
      error:error
    });
  })
}

function obtenerProductos(callback){
  request
    .post(urlBase+"/productos").withCredentials()
    .set("Content-Type", "application/json")
    .then((respuesta)=>{
      callback(respuesta.body);
    })
    .catch((error)=>{
      callback({
        exito:false,
        msjError:"No se pudo conectar con el servidor",
        error:error
      });
    });
}

function obtenerDetalleProducto(idProducto, callback){
  request
    .post(urlBase+"/productos/detalle").withCredentials()
    .send({idProducto:idProducto})
    .set("Content-Type", "application/json")
    .then((respuesta)=>{
      callback(respuesta.body);
    })
    .catch((error)=>{
      callback({
        exito:false,
        msjError:"No se pudo conectar con el servidor",
        error:error
      });
    });

}

export default {
  intentarLogin:intentarLogin,
  verificarSesion:verificarSesion,
  obtenerProductos:obtenerProductos,
  obtenerDetalleProducto:obtenerDetalleProducto
};
