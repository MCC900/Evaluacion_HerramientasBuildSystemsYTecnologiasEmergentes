import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GridContainer, Grid, Cell } from 'react-foundation';
import conexionBD from "./conexionBD";

import BarraSuperior from './BarraSuperior.jsx';
import Catalogo from './Catalogo.jsx';
import DisplayDetalladoProducto from './DisplayDetalladoProducto.jsx';
import Carrito from './Carrito.jsx';

class PaginaPrincipal extends React.Component {
  constructor(){
    super();
    this.state = {
      productosCarrito:[],
      estadoLogin:0, //0: Verificando 1:Invitado 2:Logueado 3:Sin conexión/error,
      usuarioLogueado:""
    }

    conexionBD.verificarSesion((respuesta)=>{
      if(respuesta.exito){
        if(respuesta.usuarioLogueado == ""){
          this.setState({estadoLogin:1, usuarioLogueado:""}); //Navegando como invitado
        } else {
          this.setState({estadoLogin:2, usuarioLogueado:respuesta.usuarioLogueado}); //Usuario logueado
          this.getCarritoSesion();
        }
      } else {
        this.setState({estadoLogin:3, usuarioLogueado:""}); //Sin conexión/error
      }
    });
  }

  getCarritoSesion(){
    conexionBD.obtenerCarrito((respuesta)=>{
      if(respuesta.exito){
        this.setState({productosCarrito:respuesta.prodsCarrito});
        console.log("Carrito recuperado de la última sesión de "+this.state.usuarioLogueado);
      } else {
        console.log(respuesta.msjError);
        console.log(respuesta.error);
      }
    });
  }

  render(){
    return(
      <div className="main">
        <div className="fondo mainFondo"/>
        <GridContainer>

          <BarraSuperior
            cantProdsCarrito={this.state.productosCarrito ? this.state.productosCarrito.length : 0}
            usuarioLogueado={this.state.usuarioLogueado}
            estadoLogin={this.state.estadoLogin}
          />

          <Grid>
            <Cell className="panelPrincipal" small={12}>
              <div>
                <Route path="/catalogo" render={(props)=>
                  <Catalogo
                    anadirProductoCarrito={this.anadirProductoCarrito.bind(this)}
                  />}
                />
                <Route path="/producto/:idProducto" component={DisplayDetalladoProducto}/>
                <Route path="/carrito" render={(props)=>
                  <Carrito
                    productosCarrito={this.state.productosCarrito}
                  />}
                />
              </div>
            </Cell>
          </Grid>
        </GridContainer>
      </div>
    );
  }

  anadirProductoCarrito(idProducto, cantidad){
    console.log(idProducto + ", " +cantidad);
    let prodsCarrito = this.state.productosCarrito;
    let existeProducto = false;
    for(let i = 0; i < prodsCarrito.length; i++){
      if(prodsCarrito[i].idProducto == idProducto){
        existeProducto = true;
        prodsCarrito[i].cantidad += cantidad;
        break;
      }
    }
    if(!existeProducto){
      prodsCarrito.push({idProducto:idProducto, cantidad:cantidad});
    }
    this.setState({productoCarrito:prodsCarrito});

    conexionBD.actualizarCarrito(prodsCarrito, (respuesta)=>{
      if(respuesta.exito){
        console.log("Carrito online de "+this.state.usuarioLogueado+" actualizado.");
      } else {
        if(respuesta.msjError == "nohaylogin"){
          console.log("No hay usuario logueado. Usando carrito offline.")
        } else {
          console.log(respuesta.msjError);
        }
      }
    });
  }
}

export default PaginaPrincipal;
