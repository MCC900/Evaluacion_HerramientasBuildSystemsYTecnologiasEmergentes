import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionBDService } from './conexion-bd.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteTiendaService {
  constructor(
    private conexionBDService:ConexionBDService,
    private router:Router
  ){
    this.getSesion();
  }

  estadoLogin:number = 0; //0: Verificando 1:Invitado 2:Logueado 3:Sin conexión/error
  usuarioLogueado:string = "";

  getSesion(){
    this.conexionBDService.verificarSesion((respuesta)=>{
      if(respuesta.exito){
        if(respuesta.usuarioLogueado == ""){
          this.estadoLogin = 1; //Navegando como invitado
          this.usuarioLogueado = "";
        } else {
          this.estadoLogin = 2; //Usuario logueado
          this.usuarioLogueado = respuesta.usuarioLogueado;
          this.getCarritoSesion(); //Cargamos el carrito de la sesión previa del usuario
        }
      } else {
        this.estadoLogin = 3; //Sin conexión/error
        this.usuarioLogueado = "";
      }
    });
  }

  getCarritoSesion(){

  }

  cambiarPagina(url){
    this.router.navigate([url]);
    this.getSesion();
  }
}
