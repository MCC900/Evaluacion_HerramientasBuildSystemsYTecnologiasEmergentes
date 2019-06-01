import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionBDService } from './conexion-bd.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteTiendaService {
  constructor(
    private conexionBDService:ConexionBDService,
    private router:Router
  ){
    this.getSesion();
  }

  estadoLogin:number = 0; //0: Verificando 1:Invitado 2:Logueado 3:Sin conexión/error
  usuarioLogueado:string = "";
  productosCarrito = [];
  funcCargarCarrito = null;

  //Cargamos el estado de sesión actual y el usuario logueado. Info usada por varios componentes
  getSesion(){
    this.conexionBDService.verificarSesion((respuesta)=>{
      if(respuesta.exito){
        if(respuesta.usuarioLogueado == ""){
          this.estadoLogin = 1; //Navegando como invitado
          this.usuarioLogueado = "";
        } else {
          this.estadoLogin = 2; //Usuario logueado
          this.usuarioLogueado = respuesta.usuarioLogueado;
          this.getCarritoSesion(); //Cargamos el carrito de la sesión previa del usuario
        }
      } else {
        this.estadoLogin = 3; //Sin conexión/error
        this.usuarioLogueado = "";
      }
    });
  }

  //--Carga el carrito de la sesión previa del usuario--
  getCarritoSesion(){
    this.conexionBDService.obtenerCarrito((respuesta)=>{
      if(respuesta.exito){
        this.productosCarrito = respuesta.prodsCarrito;
        console.log("Carrito recuperado de la última sesión de "+this.usuarioLogueado);
        if(this.funcCargarCarrito != null){
          this.funcCargarCarrito();
        }
      } else {
        console.log(respuesta.msjError);
        console.log(respuesta.error);
      }
    });
  }

  //Navega hacia la url indicada. Refresca la info de sesión al hacerlo.
  cambiarPagina(url){
    this.router.navigate([url]);
    this.getSesion();
  }

  //--Añade un producto al carrito. Se llama desde un <display-producto> cuando el botón "Añadir", "Cambiar" o "Quitar" es clickeado
  /* anadirProductoCarrito(idProducto, 0) para eliminar producto del carrito
     anadirProductoCarrito(idProducto, n>0) --->Actualiza la cantidad si ya existe el producto
                                            --->Agrega el producto al carrito en caso contrario, con esa cantidad
  */
  anadirProductoCarrito(idProducto, cantidad){
    let prodsCarrito = this.productosCarrito;
    let existeProducto = false;

    for(let i = 0; i < prodsCarrito.length; i++){
      if(prodsCarrito[i].idProducto == idProducto){ //Ya está el producto en el carrito
        existeProducto = true;
        if(cantidad == 0){
          //QUITAR
          prodsCarrito.splice(i,1); //Eliminamos el producto de la lista
        } else {
          //CAMBIAR
          prodsCarrito[i].cantidad = cantidad; //Actualizamos la cantidad elegida
        }
        break;
      }
    }
    if(!existeProducto){
      //AÑADIR
      prodsCarrito.push({idProducto:idProducto, cantidad:cantidad});
    }
    this.productosCarrito = prodsCarrito;

    //--Enviamos el carrito actualizado al servidor para que lo guarde en la BD
    this.conexionBDService.actualizarCarrito(prodsCarrito, (respuesta)=>{
      if(respuesta.exito){
        console.log("Carrito online de "+this.usuarioLogueado+" actualizado.");
      } else {
        if(respuesta.msjError == "nohaylogin"){
          console.log("No hay usuario logueado. Usando carrito offline.")
        } else {
          console.log(respuesta.msjError);
        }
      }
    });
  }

  /*Verifica si el producto con la id pasada por parámetro ya se encuentra en el carrito.
    utilizada por catalogo.component.html al crear los <display-producto> en el *ngFor correspondiente.
    El resultado es pasado por atributo a <display-producto>, el cual luego lo utiliza para saber
    si debe mostrar el botón Añadir o Quitar, según el producto ya esté en el carrito o no.*/
  estaEnCarrito(idProducto){
    for(let i=0; i<this.productosCarrito.length; i++){
      if(this.productosCarrito[i].idProducto == idProducto){
        return true;
      }
    }
    return false;
  }

  //--Vacía el carrito aquí y en el servidor/BD--
  vaciarCarrito(){
    this.productosCarrito = [];

    this.conexionBDService.actualizarCarrito([], (respuesta)=>{
      if(respuesta.exito){
        console.log("Carrito online de "+this.usuarioLogueado+" vaciado.");
      } else {
        if(respuesta.msjError == "nohaylogin"){
          console.log("No hay usuario logueado. Vaciando carrito offline.")
        } else {
          console.log(respuesta.msjError);
        }
      }
    });
  }

  /*Llama al servidor para concretar el "pago" de los ítems del carrito.
    Es llamada desde el componente <carrito> al clickear "Pagar".
    El callback se utiliza allí. */
  pagarCarrito(callback){
    console.log(this);
    this.conexionBDService.realizarPago((respuesta)=>{
      if(respuesta.exito){
        //Carrito pagado e ítems descontados del stock
        //Vaciamos el carrito
        this.productosCarrito = [];
        callback(true);
      } else {
        //Error
        console.log(respuesta.msjError);
        console.log(respuesta.error);
        alert("Error al intentar hacer la compra");
        callback(false);
      }
    });
  }
}
