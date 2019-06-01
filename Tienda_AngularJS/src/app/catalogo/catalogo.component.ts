import { Component, OnInit } from '@angular/core';
import { ConexionBDService } from '../conexion-bd.service';
import { ClienteTiendaService } from '../cliente-tienda.service';

@Component({
  selector: 'catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  productos;
  filtroBusqueda:string = "";

  constructor(
    private conexionBDService:ConexionBDService,
    private clienteTiendaService:ClienteTiendaService
  ) { }

  ngOnInit() {
    //Cargamos los productos del catálogo al iniciar
    this.cargarProductos();
  }

  //Obtiene los productos de la BD del servidor
  cargarProductos(){
    let respuesta = this.conexionBDService.obtenerProductos((respuesta)=>{
      if(respuesta.exito){
        //Asignamos los productos a la variable productos. Estos serán renderizados por la directiva *ngFor
        this.productos = respuesta.productos;
      } else {
        //ERROR
        console.log("Error al conectar con el servidor: "+respuesta.msjError);
        console.log(respuesta.error);
      }
    });
  }

  //Se ejecuta en el evento (input) de la barra buscadora
  cambiaTextoBusqueda(event){
    this.filtroBusqueda = event.target.value;
  }
  
  //Devuelve true si el nombre de un producto pasa por el filtro de búsqueda
  coincideConFiltro(nombreProducto){
    let filtro = this.filtroBusqueda;
    if(filtro == ""){
      return true;
    } else {

      //Convertimos todo a minúscula para la comparación
      nombreProducto = nombreProducto.toLowerCase();
      filtro = filtro.toLowerCase();

      //Este código reemplaza las letras con acentos por su contraparte sin acento (á -> a, é -> e, etc.)
      nombreProducto = nombreProducto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      filtro = filtro.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

      //Vemos si nombreProducto contiene la cadena filtro
      return nombreProducto.includes(filtro);
    }
  }
}
