import React from 'react';
import { GridContainer, Grid, GutterTypes, Cell } from 'react-foundation';
import BarraSuperior from './BarraSuperior.jsx';
import DisplayProducto from './DisplayProducto.jsx';

class Catalogo extends React.Component {
  render(){
    console.log(GridContainer.propTypes);
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
                    <DisplayProducto srcImagen="./imagenesBase/aguacate.jpg" nombreProducto="Aguacate" precio={5} stock={46}/>
                    <DisplayProducto srcImagen="./imagenesBase/aguacate.jpg" nombreProducto="Aguacate" precio={5} stock={46}/>
                    <DisplayProducto srcImagen="./imagenesBase/aguacate.jpg" nombreProducto="Aguacate" precio={5} stock={46}/>
                    <DisplayProducto srcImagen="./imagenesBase/aguacate.jpg" nombreProducto="Aguacate" precio={5} stock={46}/>
                    <DisplayProducto srcImagen="./imagenesBase/aguacate.jpg" nombreProducto="Aguacate" precio={5} stock={46}/>
                  </Grid>
                </Cell>
              </Grid>
            </Cell>
          </Grid>
        </GridContainer>
      </div>
    )
  }
}

export default Catalogo;
