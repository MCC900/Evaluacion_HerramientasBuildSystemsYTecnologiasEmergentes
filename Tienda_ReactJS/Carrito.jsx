import React from 'react';
import { Grid, Cell } from 'react-foundation';

import ProductoCarrito from './ProductoCarrito.jsx';

class Carrito extends React.Component {
  render(){
    return(
      <Grid>
        <Cell small={12} className="barraTitulo">
          <h4>Carrito</h4>
        </Cell>
        <Cell className="listaProdsCarrito" small={12} medium={6}>
          {
            this.props.productosCarrito.map(productoCarrito => <ProductoCarrito
              key={productoCarrito.idProducto}
              idProducto={productoCarrito.idProducto}
              cantidad={productoCarrito.cantidad}
            />)
          }
        </Cell>
        <Cell small={12} medium={6}>

        </Cell>
      </Grid>
    );
  }
}

export default Carrito;
