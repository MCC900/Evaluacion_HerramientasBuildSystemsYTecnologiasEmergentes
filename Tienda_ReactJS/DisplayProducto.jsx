import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Cell, Link, Icon } from 'react-foundation';

class DisplayProducto extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      cantElegida:1,
      cambiaPagina:false,
      urlPagina:"",
      estaEnCarrito:false,
      cargandoCarrito:true
    }
  }

  /*Más o menos equivale a componentWillUpdate de versiones de React anteriores.
   Es llamada antes de render para hacer cambios de último momento al state antes del render,
   para contemplar cambios posibles en las props. */
  static getDerivedStateFromProps(props, state){
    if(props.prodsCarrito.length > 0 && state.cargandoCarrito){
      let estaEnCarrito = false;

      /*Verificamos si el producto está en el carrito actualmente, para saber si
       mostrar el botón con el texto "AÑADIR" O "QUITAR"/"CAMBIAR" */
      for(let i=0; i<props.prodsCarrito.length; i++){
        if(props.idProducto == props.prodsCarrito[i].idProducto){
          estaEnCarrito = true;
          break;
        }
      }

      //Devolver algo en getDerivedStateFromProps() implica que actualiza el estado
      return {estaEnCarrito:estaEnCarrito, cantElegida:(estaEnCarrito || props.stock == 0 ? 0 : 1), cargandoCarrito:false};
    }
    return null;
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
                  <Link isExpanded className={
                      this.props.stock > 0
                      ?
                      this.state.cantElegida > 0 ? "btnAnadir":"btnCancelar"
                      :
                      "btnDesactivado"
                    }
                    onClick={this.props.stock > 0 ? this.clickAnadir.bind(this) : null}>
                      {
                        //El botón cambia entre "AÑADIR" y "CAMBIAR"/"QUITAR" o "SIN STOCK" según corresponda
                        this.props.stock > 0 ? (
                          this.state.estaEnCarrito
                          ?
                          this.state.cantElegida == 0 ? "Quitar" : "Cambiar"
                          :
                          "Añadir"
                        ) : "Sin stock"
                      }
                      <Icon name={
                        this.state.cantElegida > 0 ? "fi-shopping-cart" : "fi-x"}></Icon>
                  </Link>
                </Cell>
                <Cell auto="all">
                  <input type="number" min={this.state.estaEnCarrito || this.props.stock == 0 ? 0 : 1} max={this.props.stock}
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

  //Actualiza la cantidad cada vez que cambia el valor del input numérico
  cambiaCantidad(event){
    this.setState(
      {cantElegida:parseInt(event.target.value)}
    );
  }

  //Nos envía a la página con el detalle del producto
  clickVerMas(){
    this.setState({cambiaPagina:true, urlPagina:"/producto/"+this.props.idProducto});
  }

  //Añade, cambia o quita el producto del carrito
  clickAnadir(){
    this.props.anadirProductoCarrito(this.props.idProducto, this.state.cantElegida);
    this.setState({
      estaEnCarrito:this.state.cantElegida > 0,
      cantElegida:this.state.cantElegida == 0 ? 1 : 0
    });
  }
}

export default DisplayProducto;
