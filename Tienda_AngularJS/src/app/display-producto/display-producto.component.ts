import { Component, Input } from '@angular/core';
import { ClienteTiendaService } from '../cliente-tienda.service';

@Component({
  selector: 'display-producto',
  templateUrl: './display-producto.component.html',
  styleUrls: ['./display-producto.component.css']
})
export class DisplayProductoComponent{
  @Input() idProducto:string;
  @Input() srcImagen:string;
  @Input() nombreProducto:string;
  @Input() precio:number;
  @Input() stock:number;

  @Input() cantElegida:number = 1;
  @Input() estaEnCarrito:boolean = false;

  constructor(private clienteTiendaService:ClienteTiendaService) { }

  //Nos envía a la página con el detalle del producto
  clickVerMas(){
    this.clienteTiendaService.cambiarPagina("/producto/"+this.idProducto);
  }

  //Añade, cambia o quita el producto del carrito
  clickAnadir(){
    this.clienteTiendaService.anadirProductoCarrito(this.idProducto, this.cantElegida);
    this.estaEnCarrito = this.cantElegida > 0;
    this.cantElegida = this.cantElegida == 0 ? 1 : 0;
  }

  //Actualiza la cantidad cada vez que cambia el valor del input numérico
  cambiaCantidad(event){
    this.cantElegida = event.target.value;
  }
}
