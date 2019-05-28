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

  cantElegida:number = 1;
  estaEnCarrito:boolean = false;

  constructor(private clienteTiendaService:ClienteTiendaService) { }

  clickVerMas(){
    this.clienteTiendaService.cambiarPagina("/producto/"+this.idProducto);
  }
}
