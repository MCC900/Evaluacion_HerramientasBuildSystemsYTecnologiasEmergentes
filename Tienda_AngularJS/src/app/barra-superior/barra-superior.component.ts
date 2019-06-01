import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteTiendaService } from '../cliente-tienda.service';
import { ConexionBDService } from '../conexion-bd.service';

@Component({
  selector: 'barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css']
})
export class BarraSuperiorComponent {

  nombreIconoSesion:string = "";

  constructor(
    private clienteTiendaService:ClienteTiendaService,
    private conexionBDService:ConexionBDService,
    private router:Router
  ) {}

  /*Cierra la sesión en el servidor. Funcione o no regresa a la página de login llamando
   a la función cambiarPagina() del servicio ClienteTiendaService */
  cerrarSesion(){
    this.conexionBDService.cerrarSesion((respuesta)=>{
      this.clienteTiendaService.cambiarPagina('');
    })
  }
}
