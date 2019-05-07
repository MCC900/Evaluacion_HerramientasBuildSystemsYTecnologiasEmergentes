import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Cell, Link, Icon } from 'react-foundation';

class DisplayProducto extends React.Component {
  constructor(){
    super();
    this.state = {
      cantElegida:1,
      cambiaPagina:false,
      urlPagina:""
    }
  }

  render(){
    if(this.state.cambiaPagina){
      return(<Redirect to={this.state.urlPagina} push/>);
    }
    return(
      <Cell className="displayProducto" small={6} medium={4} large={3}>
        <div className="mitadSuperiorDisplay" style={{backgroundImage:("url("+this.props.srcImagen+")")}}>
          <img src={this.props.srcImagen}/>
        </div>
        <div className="mitadInferiorDisplay">
          <h4>{this.props.nombreProducto}</h4>
          <label className="lblProducto"><b>Precio: $</b> {this.props.precio}</label>
          <label className="lblProducto"><b>Unidades Disponibles:</b> {this.props.stock}</label>
          <Grid>
            <Cell small={12}>
              <Link isExpanded className="btnVerMas"
                onClick={this.clickVerMas.bind(this)}>Ver más</Link>
            </Cell>
            <Cell small={12}>
              <Grid>
                <Cell small={8}>
                  <Link isExpanded className="btnAnadir"
                    onClick={this.clickAnadir.bind(this)}>
                      Añadir <Icon name="fi-shopping-cart"></Icon>
                  </Link>
                </Cell>
                <Cell auto="all">
                  <input type="number" min={1} max={this.props.stock}
                    value={this.state.cantElegida}
                    onChange={this.cambiaCantidad.bind(this)}/>
                </Cell>
              </Grid>
            </Cell>
          </Grid>
        </div>
      </Cell>
    );
  }

  cambiaCantidad(event){
    this.setState(
      {cantElegida:parseInt(event.target.value)}
    );
  }

  clickVerMas(){
    this.setState({cambiaPagina:true, urlPagina:"/producto/"+this.props.idProducto});
  }

  clickAnadir(){
    this.props.anadirProductoCarrito(this.props.id, this.state.cantElegida);
    this.state.cantElegida = 1;
  }
}

export default DisplayProducto;
