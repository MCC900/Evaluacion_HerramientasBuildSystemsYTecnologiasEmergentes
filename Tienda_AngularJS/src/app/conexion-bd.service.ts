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

  llamadaAjax(ruta, datos, callback){
    let obsvRespuesta = this.httpClient.post(this.urlBase + ruta, datos, this.options);
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

  intentarLogin(email, contrasena, callback){
    let datos = JSON.stringify({email:email, contrasena:contrasena});
    this.llamadaAjax("/login", datos, callback);
  }

  cerrarSesion(callback){
    this.llamadaAjax("/logout", "", callback);
  }

  verificarSesion(callback){
    this.llamadaAjax("/getSesion", "", callback);
  }

  obtenerProductos(callback){
    this.llamadaAjax("/productos", "", callback);
  }

  obtenerDetalleProducto(idProducto, callback){
    let datos = JSON.stringify({idProducto:idProducto});
    this.llamadaAjax("/productos/detalle", datos, callback);
  }

  obtenerCarrito(callback){
    this.llamadaAjax("/carrito/getListaProds", "", callback);
  }

  actualizarCarrito(listaProdsCarrito, callback){
    let datos = JSON.stringify({listaProdsCarrito:listaProdsCarrito});
    this.llamadaAjax("/carrito/actualizar", datos, callback);
  }

  realizarPago(callback){
    this.llamadaAjax("/carrito/pagar", "", callback);
  }
}
