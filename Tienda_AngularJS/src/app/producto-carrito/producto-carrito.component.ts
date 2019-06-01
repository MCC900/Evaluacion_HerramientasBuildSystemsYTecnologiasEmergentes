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
    //Inicializamos el componente cargando el producto y la cantidad desde el servidor
    this.cargarProducto(this.idProducto);
  }

  //--Carga este ítem del carrito obtieniendo los datos del servidor
  cargarProducto(idProducto){
    this.conexionBDService.obtenerDetalleProducto(idProducto, (respuesta)=>{
      if(respuesta.exito){
        this.producto = respuesta.producto;

        //Sumamos este subtotal al total con la función del Carrito pasada por atributo (ver carrito.component.html)
        this.anadirSubtotal(respuesta.producto.precio * this.cantidad);
      } else {
        //ERROR
        console.log("Error al conectar con el servidor: "+respuesta.msjError);
        console.log(respuesta.error);
      }
    });
  }
}
