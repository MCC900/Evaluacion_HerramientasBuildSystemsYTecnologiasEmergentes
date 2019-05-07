import React from 'react';
import { Cell, Grid } from 'react-foundation';

import conexionBD from './conexionBD';

class ProductoCarrito extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      producto:null,
      cantidad:0
    }
    this.cargarProducto(props.idProducto);
  }

  render(){
    return(
      <Cell small={12} className="productoCarrito">
        {
          this.state.producto ?
          <Grid gutters="margin">
            <Cell small={4}>
              <img src={"./imagenesBase/"+this.state.producto.nombreArchivo}/>
            </Cell>
            <Cell small={8}>
              <label className="lblProducto"><h4>{this.state.producto.nombre}</h4></label>
              <label className="lblProducto"><b>Cantidad: </b>{this.state.cantidad}</label>
              <label className="lblProducto"><b>Precio Unitario: </b>${this.state.producto.precio}</label>
            </Cell>
            <Cell small={12}>
              <label className="lblProducto"><h5>Subtotal: ${this.state.producto.precio * this.state.cantidad}</h5></label>
            </Cell>
          </Grid>
          : null
        }
      </Cell>
    );
  }

  cargarProducto(idProducto){
    let respuesta = conexionBD.obtenerDetalleProducto(idProducto, (respuesta)=>{
      if(respuesta.exito){
        this.setState({producto:respuesta.producto, cantidad:this.props.cantidad});
      } else {
        console.log("Error al conectar con el servidor: "+respuesta.msjError);
        console.log(respuesta.error);
      }
    });
  }
}

export default ProductoCarrito;
