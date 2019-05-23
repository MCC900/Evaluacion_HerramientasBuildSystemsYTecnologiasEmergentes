import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConexionBDService {

  constructor(private httpClient:HttpClient) { }

  urlBase:string = "http://localhost:3000";

  intentarLogin(email, contrasena, callback){
    let httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
    let options = {headers:httpHeaders, withCredentials:true,  observe:"response" as 'body'};
    let datos = JSON.stringify({email:email, contrasena:contrasena});
    let obsvRespuesta = this.httpClient.post(this.urlBase + "/login", datos, options);
    obsvRespuesta.subscribe((respuesta:any)=>{
      callback(respuesta.body);
    },(error)=>{
      callback({
        exito:false,
        msjError:"No se pudo conectar con el servidor",
        error:error
      });
    });
    /*
    .post(this.urlBase + '/login').withCredentials() //withCredentials(), de superagent, es necesario para acceder desde una dirección http
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
    */
  }
}
