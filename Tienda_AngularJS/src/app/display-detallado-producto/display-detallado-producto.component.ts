import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ConexionBDService } from '../conexion-bd.service';
import { ClienteTiendaService } from '../cliente-tienda.service';

@Component({
  selector: 'display-detallado-producto',
  templateUrl: './display-detallado-producto.component.html',
  styleUrls: ['./display-detallado-producto.component.css']
})
export class DisplayDetalladoProductoComponent implements OnInit{
  producto = null;

  constructor(
    private route:ActivatedRoute,
    private conexionBDService:ConexionBDService,
    private clienteTiendaService:ClienteTiendaService
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('idProducto');
    this.cargarProducto(id);
  }

  cargarProducto(idProducto){
    this.conexionBDService.obtenerDetalleProducto(idProducto, (respuesta)=>{
      if(respuesta.exito){
        this.producto = respuesta.producto;
      } else {
        console.log("Error al conectar con el servidor: "+respuesta.msjError);
        console.log(respuesta.error);
      }
    })
  }

  clickAtras(){
    this.clienteTiendaService.cambiarPagina("/catalogo");
  }
}
