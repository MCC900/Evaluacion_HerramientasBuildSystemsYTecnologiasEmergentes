import React from 'react';
import { GridContainer, Grid, GutterTypes, Cell, Icon } from 'react-foundation';
import BarraSuperior from './BarraSuperior.jsx';
import DisplayProducto from './DisplayProducto.jsx';

import conexionBD from './conexionBD';

class Catalogo extends React.Component {

  constructor(){
    super();
    this.state = {
      productos:[],
      filtroBusqueda:""
    }
    this.cargarProductos();
  }

  render(){
return(
      <Grid>
        <Cell className="panelPrincipal" small={12}>

          <Grid>

            <Cell className="barraTitulo" small={12}>
              <Grid>
                <Cell className="titulo" small={6} medium={7} large={8}>
                  <h4>Catálogo de productos</h4>
                </Cell>
                <Cell className="barraBusqueda" auto="all">
                  <label><Icon name="fi-magnifying-glass"/> Búsqueda</label>
                  <input type="search" onChange={this.cambiaTextoBusqueda.bind(this)}/>
                </Cell>
              </Grid>
            </Cell>

            <Cell className="cuadriculaProductos" small={12}>
              <Grid gutters="margin">
                {
                  this.state.productos.map(producto =>
                    this.coincideConFiltro(producto.nombre, this.state.filtroBusqueda) ?
                      <DisplayProducto
                      key={producto._id}
                      id={producto._id}
                      srcImagen={"./imagenesBase/" + producto.nombreArchivo}
                      nombreProducto={producto.nombre}
                      precio={producto.precio}
                      stock={producto.stock}
                      idProducto={producto._id}
                      anadirProductoCarrito={this.anadirProductoCarrito.bind(this)}
                      />
                    : null
                  )
                }
              </Grid>
            </Cell>

          </Grid>

        </Cell>
      </Grid>
    )
  }

  cargarProductos(){
    let respuesta = conexionBD.obtenerProductos((respuesta)=>{
      if(respuesta.exito){
        this.setState({productos:respuesta.productos});
      } else {
        console.log("Error al conectar con el servidor: "+respuesta.msjError);
        console.log(respuesta.error);
      }
    });
  }

  cambiaTextoBusqueda(event){
    this.setState({filtroBusqueda:event.target.value});
  }

  coincideConFiltro(nombreProducto, filtro){

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

  anadirProductoCarrito(idProducto, cantidad){
    this.props.anadirProductoCarrito(idProducto, cantidad);
  }
}

export default Catalogo;
