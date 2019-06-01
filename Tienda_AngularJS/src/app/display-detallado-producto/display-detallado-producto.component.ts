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
    /* Obtenemos la id del producto desde la url.
      Los datos de la url están contenidos dentro del route (ActivatedRoute),
      componente de angular router encargado de manipular la barra de direcciones. */
    let id = this.route.snapshot.paramMap.get('idProducto');
    //Cargamos el detalle del producto, a partir de la id pasada a través de la URL (!)
    //Ej: localhost:8080/producto/5cc50e5cfa0df01d94ac951b
    this.cargarProducto(id);
  }

  //Obtiene los datos del producto del servidor
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

  //Regresa al catálogo
  clickAtras(){
    this.clienteTiendaService.cambiarPagina("/catalogo");
  }
}
