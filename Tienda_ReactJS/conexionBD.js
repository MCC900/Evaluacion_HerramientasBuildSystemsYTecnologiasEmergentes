import * as request from 'superagent';

let urlBase = "http://localhost:3000";

function intentarLogin(email, contrasena, callback){
  request
  .post(urlBase + '/login')
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
    })
  })
}

export default {intentarLogin:intentarLogin};
