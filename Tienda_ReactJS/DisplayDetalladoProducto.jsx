import React from 'react';
import { Redirect } from 'react-router-dom';
import { GridContainer, Grid, Cell, Link, Icon } from 'react-foundation';

import conexionBD from './conexionBD';

import BarraSuperior from './BarraSuperior.jsx';

class DisplayDetalladoProducto extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      producto:null,
      volver:false
    };
    this.cargarProducto(props.match.params.idProducto.toLowerCase());
  }

  render(){
    if(this.state.volver){
      return(<Redirect to="/catalogo"/>);
    }
    return(
      <Grid>
        <Cell className="panelPrincipal" small={12}>
          <Grid gutters="margin">
            <Cell small={12} className="barraTitulo">
              <h4>{this.state.producto ? this.state.producto.nombre : "..."}</h4>
            </Cell>
            <Cell small={12} medium={6} className="margenInferior">
              <img src={this.state.producto ? "../imagenesBase/" + this.state.producto.nombreArchivo : ""}/>
            </Cell>
            <Cell small={12} medium={6} className="margenInferior">
              <label className="lblProducto"><b>Precio: $</b> {this.state.producto ? this.state.producto.precio : "..."}</label>
              <label className="lblProducto"><b>Unidades Disponibles: </b> {this.state.producto ? this.state.producto.stock : "..."}</label>
            </Cell>
            <Cell small={12}>
              <Link onClick={this.clickAtras.bind(this)}><Icon name="fi-arrow-left"/> Atrás</Link>
            </Cell>
          </Grid>
        </Cell>
      </Grid>
    );
  }

  cargarProducto(idProducto){
    let respuesta = conexionBD.obtenerDetalleProducto(idProducto, (respuesta)=>{
      if(respuesta.exito){
        this.setState({producto:respuesta.producto});
      } else {
        console.log("Error al conectar con el servidor: "+respuesta.msjError);
        console.log(respuesta.error);
      }
    });
  }

  clickAtras(){
    this.setState({volver:true});
  }
}

export default DisplayDetalladoProducto;
