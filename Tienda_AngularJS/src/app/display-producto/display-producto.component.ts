import { Component, Input } from '@angular/core';

@Component({
  selector: 'display-producto',
  templateUrl: './display-producto.component.html',
  styleUrls: ['./display-producto.component.css']
})
export class DisplayProductoComponent{
  @Input() srcImagen:string;
  @Input() nombreProducto:string;
  @Input() precio:number;
  @Input() stock:number;

  cantElegida:number = 1;
  estaEnCarrito:boolean = false;

  constructor() { }
}
