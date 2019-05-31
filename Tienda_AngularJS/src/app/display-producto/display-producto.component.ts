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

  ngOnInit(){
  }
  clickVerMas(){
    this.clienteTiendaService.cambiarPagina("/producto/"+this.idProducto);
  }

  clickAnadir(){
    this.clienteTiendaService.anadirProductoCarrito(this.idProducto, this.cantElegida);
    this.estaEnCarrito = this.cantElegida > 0;
    this.cantElegida = this.cantElegida == 0 ? 1 : 0;
  }

  cambiaCantidad(event){
    this.cantElegida = event.target.value;
  }
}
