import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConexionBDService {

  constructor(private httpClient:HttpClient) { }

  urlBase:string = "http://localhost:3000";
  httpHeaders:HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  options = {headers:this.httpHeaders, withCredentials:true,  observe:"response" as 'body'};

  intentarLogin(email, contrasena, callback){
    let datos = JSON.stringify({email:email, contrasena:contrasena});
    let obsvRespuesta = this.httpClient.post(this.urlBase + "/login", datos, this.options);
    obsvRespuesta.subscribe((respuesta:any)=>{
      callback(respuesta.body ? respuesta.body:respuesta);
    },(error)=>{
      callback({
        exito:false,
        msjError:"No se pudo conectar con el servidor",
        error:error
      });
    });
  }

  cerrarSesion(callback){
    let obsvRespuesta = this.httpClient.post(this.urlBase + "/logout", "", this.options);
    obsvRespuesta.subscribe((respuesta:any)=>{
      callback(respuesta.body ? respuesta.body:respuesta);
    }, (error)=>{
      callback({
        exito:false,
        msjError:"No se pudo conectar con el servidor",
        error:error
      });
    });
  }

  verificarSesion(callback){
    let obsvRespuesta = this.httpClient.post(this.urlBase + "/getSesion", "", this.options);
    obsvRespuesta.subscribe((respuesta:any)=>{
      callback(respuesta.body ? respuesta.body:respuesta);
    }, (error)=>{
      callback({
        exito:false,
        msjError:"No se pudo conectar con el servidor",
        error:error
      });
    });
  }

  obtenerProductos(callback){
    this.llamadaAjax("/productos", "", callback);
  }

  llamadaAjax(ruta, datos, callback){
    let obsvRespuesta = this.httpClient.post(this.urlBase + ruta, "", this.options);
    obsvRespuesta.subscribe((respuesta:any)=>{
      callback(respuesta.body ? respuesta.body:respuesta);
    }, (error)=>{
      callback({
        exito:false,
        msjError:"No se pudo conectar con el servidor",
        error:error
      });
    });
  }
}
