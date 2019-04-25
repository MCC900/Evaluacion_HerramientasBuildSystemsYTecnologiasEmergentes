import React from 'react';
import { Grid, Cell, Link, Icon } from 'react-foundation';

class DisplayProducto extends React.Component {
  constructor(){
    super();
    this.state = {
      cantElegida:1
    }
  }

  render(){
    return(
      <Cell className="displayProducto" small={6} medium={4} large={3}>
        <img src={this.props.srcImagen}/>
        <h4>{this.props.nombreProducto}</h4>
        <label className="lblProducto"><b>Precio: $</b> {this.props.precio}</label>
        <label className="lblProducto"><b>Unidades Disponibles:</b> {this.props.stock}</label>
        <Grid>
          <Cell small={12}>
            <Link isExpanded className="btnVerMas">Ver más</Link>
          </Cell>
          <Cell small={12}>
            <Grid gutters="margin">
              <Cell small={8}>
                <Link isExpanded className="btnAnadir">Añadir <Icon name="fi-shopping-cart"></Icon></Link>
              </Cell>
              <Cell auto="all">
                <input type="number" min={1} max={this.props.stock}
                  value={this.state.cantElegida}
                  onChange={this.cambiaCantidad.bind(this)}/>
              </Cell>
            </Grid>
          </Cell>
        </Grid>
      </Cell>
    );
  }

  cambiaCantidad(event){
    this.setState(
      {cantElegida:event.target.value}
    );
  }
}

export default DisplayProducto;
