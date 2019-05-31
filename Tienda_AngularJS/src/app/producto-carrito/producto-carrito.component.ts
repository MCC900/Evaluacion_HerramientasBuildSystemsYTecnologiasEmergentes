import { Component, OnInit, Input } from '@angular/core';
import { ConexionBDService } from '../conexion-bd.service';
import { ClienteTiendaService } from '../cliente-tienda.service';

@Component({
  selector: 'producto-carrito',
  templateUrl: './producto-carrito.component.html',
  styleUrls: ['./producto-carrito.component.css']
})
export class ProductoCarritoComponent implements OnInit {

  @Input() idProducto:string;
  @Input() cantidad:number;
  @Input() anadirSubtotal;

  producto = null;

  constructor(
    private conexionBDService:ConexionBDService,
    private clienteTiendaService:ClienteTiendaService
  ) { }

  ngOnInit() {
    this.cargarProducto(this.idProducto);
  }

  cargarProducto(idProducto){
    this.conexionBDService.obtenerDetalleProducto(idProducto, (respuesta)=>{
      if(respuesta.exito){
        this.producto = respuesta.producto;

        //Sumamos este subtotal al total con la función del Carrito pasada por props
        this.anadirSubtotal(respuesta.producto.precio * this.cantidad);
      } else {
        //ERROR
        console.log("Error al conectar con el servidor: "+respuesta.msjError);
        console.log(respuesta.error);
      }
    });
  }
}
