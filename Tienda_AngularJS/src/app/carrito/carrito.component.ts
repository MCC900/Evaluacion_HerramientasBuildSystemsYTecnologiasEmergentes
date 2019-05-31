import { Component, OnInit } from '@angular/core';
import { ClienteTiendaService } from '../cliente-tienda.service';

@Component({
  selector: 'carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  totalCarrito:number = 0;
  prodsSumados:number = 0;
  todosProductosSumados:boolean = false;
  productosCarrito = [];
  logueado:boolean = false;

  constructor(private clienteTiendaService:ClienteTiendaService) { }

  ngOnInit() {
    if(this.clienteTiendaService.productosCarrito.length != 0){
      this.productosCarrito = this.clienteTiendaService.productosCarrito;
    } else {
      this.clienteTiendaService.funcCargarCarrito = ()=>{
        this.productosCarrito = this.clienteTiendaService.productosCarrito;
        if(this.prodsSumados == this.productosCarrito.length - 1){
          this.todosProductosSumados = true;;
          this.logueado = this.clienteTiendaService.estadoLogin == 2;
        }
      }
    }
  }

  anadirSubtotal(subtotal){
    let todosProductosSumados = false;
    if(this.productosCarrito && this.productosCarrito.length > 0 && this.prodsSumados == this.productosCarrito.length - 1){ //Se ha cargado el último producto
      todosProductosSumados = true;;
      this.logueado = this.clienteTiendaService.estadoLogin == 2;
    }
    this.totalCarrito = this.totalCarrito + subtotal; //Agregamos el subtotal a la suma
    this.prodsSumados = this.prodsSumados+1;
    this.todosProductosSumados= todosProductosSumados;
  }

  vaciarCarrito(){
    this.clienteTiendaService.vaciarCarrito();
    this.totalCarrito = 0;
    this.prodsSumados = 0;
    this.productosCarrito = [];
    this.todosProductosSumados = false;
    this.clienteTiendaService.cambiarPagina("/catalogo");
  }

  pagarCarrito(){
    this.clienteTiendaService.pagarCarrito((exito)=>{
      if(exito){
        this.clienteTiendaService.cambiarPagina("/catalogo");
      }
    });
  }
}
