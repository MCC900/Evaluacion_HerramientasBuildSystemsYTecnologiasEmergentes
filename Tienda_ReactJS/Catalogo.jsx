import React from 'react';
import { GridContainer, Grid, GutterTypes, Cell } from 'react-foundation';
import BarraSuperior from './BarraSuperior.jsx';
import DisplayProducto from './DisplayProducto.jsx';

import conexionBD from './conexionBD';

class Catalogo extends React.Component {

  constructor(){
    super();
    this.state = {
      productos:[]
    }
    this.cargarProductos();
  }

  render(){
    return(
      <div className="main">
        <div className="fondo mainFondo"/>
        <GridContainer>
          <BarraSuperior/>

          <Grid>
            <Cell className="catalogo" small={12}>
              <Grid>
                <Cell className="barraCatalogo" small={12}>
                  <Grid>
                    <Cell className="tituloCatalogo" small={6} medium={7} large={8}>
                      <h4>Catálogo de productos</h4>
                    </Cell>
                    <Cell className="barraBusqueda" auto="all">

                    </Cell>
                  </Grid>
                </Cell>
                <Cell className="cuadriculaProductos" small={12}>
                  <Grid gutters="margin">
                    {
                      this.state.productos.map(producto => <DisplayProducto
                        key={producto._id}
                        srcImagen={"./imagenesBase/" + producto.nombreArchivo}
                        nombreProducto={producto.nombre}
                        precio={producto.precio}
                        stock={producto.stock}
                      />)
                    }
                  </Grid>
                </Cell>
              </Grid>
            </Cell>
          </Grid>
        </GridContainer>
      </div>
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
}

export default Catalogo;
