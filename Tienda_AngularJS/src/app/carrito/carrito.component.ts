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

  constructor(private clienteTiendaService:ClienteTiendaService) {}

  ngOnInit() {
    if(this.clienteTiendaService.productosCarrito.length != 0){
      //El carrito tiene algún producto
      this.productosCarrito = this.clienteTiendaService.productosCarrito;
    } else {
      /* Asignamos una función funcCargarCarrito al servicio clienteTiendaService para que
       nos actualize el array productosCarrito de este componente una vez sean obtenidos de la BD */
      this.clienteTiendaService.funcCargarCarrito = ()=>{
        this.productosCarrito = this.clienteTiendaService.productosCarrito;
        if(this.productosCarrito.length == 0){
          /* Si hay 0 productos, nunca se llamará a anadirSubtotal(), sin embargo,
            la suma (total 0) debe darse por completa para que la interfaz muestre el mensaje
            "No hay productos en el carrito" */
          this.todosProductosSumados = true;
        }
      }

      this.clienteTiendaService.getCarritoSesion(); //Actualizamos el carrito
    }
  }

  //Cada vez que se carga un <producto-carrito>, éste llama a esta función. La función se pasa como atributo
  // a los componentes <producto-carrito> en el *ngFor descrito en el html (ver carrito.component.html)
  //Esta función suma el subtotal del <producto-carrito> al total
  anadirSubtotal(subtotal){
    let todosProductosSumados = false;
    if(this.productosCarrito && this.productosCarrito.length > 0 && this.prodsSumados == this.productosCarrito.length - 1){ //Se ha cargado el último producto
      todosProductosSumados = true;
      /*Este era el último producto a sumar, ya se puede mostrar el total.
        This.logueado se asigna para saber si el botón pagar debe mostrarse en gris (navegando
        como invitado) o si estamos logueados (podemos pagar) */
      this.logueado = this.clienteTiendaService.estadoLogin == 2;
    }

    this.totalCarrito = this.totalCarrito + subtotal; //Agregamos el subtotal a la suma
    this.prodsSumados = this.prodsSumados+1;
    this.todosProductosSumados= todosProductosSumados;
  }

  //Función para vaciar el carrito. Luego de vaciarlo, regresa a la pagina del catálogo
  vaciarCarrito(){
    this.clienteTiendaService.vaciarCarrito();
    this.totalCarrito = 0;
    this.prodsSumados = 0;
    this.productosCarrito = [];
    this.todosProductosSumados = true;
    this.clienteTiendaService.cambiarPagina("/catalogo");
  }

  //Llama a la función pagarCarrito() del servicio ClienteTiendaService. Regresa al catálogo si se realiza el pago con éxito
  pagarCarrito(){
    this.clienteTiendaService.pagarCarrito((exito)=>{
      if(exito){
        this.clienteTiendaService.cambiarPagina("/catalogo");
      }
    });
  }
}
