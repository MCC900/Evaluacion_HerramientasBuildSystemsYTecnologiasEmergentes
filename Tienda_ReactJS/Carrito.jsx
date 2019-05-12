import React from 'react';
import { Grid, Cell, Link, Icon } from 'react-foundation';
import { Redirect } from 'react-router-dom';

import ProductoCarrito from './ProductoCarrito.jsx';

class Carrito extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      totalCarrito:0,
      prodsSumados:0, //Va aumentando según se van cargando los productos de la lista
      todosProductosSumados:false,
      redirectCatalogo:false
    }
  }

  render(){

    if(this.state.redirectCatalogo){
      return(<Redirect to="/catalogo" push/>);
    }

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
              anadirSubtotal={this.anadirSubtotal.bind(this)}
            />)
          }
        </Cell>
        <Cell small={12} medium={6}>
          { this.state.todosProductosSumados ?
              <div className="totalCarrito">
                <h3><b>Total:</b> ${this.state.totalCarrito}</h3>
                <Link
                  className="btnCancelar"
                  onClick={this.vaciarCarrito.bind(this)}>
                    Cancelar <Icon name="fi-x"/>
                </Link>
                <Link
                  className={this.props.logueado ? "btnPagar" : "btnDesactivado"} //Desactivamos la opción Pagar si no estamos logueados
                  onClick={this.props.logueado ? this.pagarCarrito.bind(this) : null}>
                    Pagar <Icon name="fi-dollar"/>
                </Link>
              </div>
            :
              <div className="totalCarrito">
                <h5>{ this.state.prodsSumados == 0 ? "No hay productos en el carrito de compras" : "..."}</h5>
              </div>
          }
        </Cell>
      </Grid>
    );
  }

  //Cada vez que se carga un ProductoCarrito, éste llama a esta función
  anadirSubtotal(subtotal){
    let todosProductosSumados = false;
    if(this.state.prodsSumados == this.props.productosCarrito.length - 1){ //Se ha cargado el último producto
      todosProductosSumados = true;
    }
    this.setState({
      totalCarrito:this.state.totalCarrito + subtotal, //Agregamos el subtotal a la suma
      prodsSumados:this.state.prodsSumados+1,
      todosProductosSumados:todosProductosSumados
    });
  }

  //Función para vaciar el carrito
  vaciarCarrito(){
    this.props.vaciarCarrito();
    this.setState({totalCarrito:0, prodsSumados:0, todosProductosSumados:false});
  }

  //Llama a la función pagarCarrito del componente PaginaPrincipal, enviada por props
  pagarCarrito(){
    this.props.pagarCarrito((exito)=>{
      if(exito){
        this.setState({redirectCatalogo:true});
      }
    });
  }
}

export default Carrito;
