import { Component, OnInit } from '@angular/core';
import { ConexionBDService } from '../conexion-bd.service';

@Component({
  selector: 'catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  productos;
  filtroBusqueda:string = "";

  constructor(private conexionBDService:ConexionBDService) { }

  ngOnInit() {
    this.cargarProductos();
  }

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

  cambiaTextoBusqueda(event){
    this.filtroBusqueda = event.target.value;

  }

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
