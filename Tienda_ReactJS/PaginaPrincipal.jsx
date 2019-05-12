import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
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
      volverAlLogin:false,
      productosCarrito:[],
      totalCarrito:0,
      estadoLogin:0, //0: Verificando 1:Invitado 2:Logueado 3:Sin conexión/error,
      usuarioLogueado:""
    }

    //Cargamos el estado de sesión actual y el usuario logueado. Utilizado por varios componentes hijos
    conexionBD.verificarSesion((respuesta)=>{
      if(respuesta.exito){
        if(respuesta.usuarioLogueado == ""){
          this.setState({estadoLogin:1, usuarioLogueado:""}); //Navegando como invitado
        } else {
          this.setState({estadoLogin:2, usuarioLogueado:respuesta.usuarioLogueado}); //Usuario logueado
          this.getCarritoSesion(); //Cargamos el carrito de la sesión previa del usuario
        }
      } else {
        this.setState({estadoLogin:3, usuarioLogueado:""}); //Sin conexión/error
      }
    });
  }

  //--Carga el carrito de la sesión previa del usuario--
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

    if(this.state.volverAlLogin){
      return(<Redirect to="/" push/>);
    }

    return(
      <div className="main">
        <div className="fondo mainFondo"/>
        <GridContainer>

          <BarraSuperior
            irALogin={this.irALogin.bind(this)}
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
                    prodsCarrito={this.state.productosCarrito}
                  />}
                />
                <Route path="/producto/:idProducto" component={DisplayDetalladoProducto}/>
                <Route path="/carrito" render={(props)=>
                  <Carrito
                    productosCarrito={this.state.productosCarrito}
                    totalCarrito={this.state.totalCarrito}
                    vaciarCarrito={this.vaciarCarrito.bind(this)}
                    pagarCarrito={this.pagarCarrito.bind(this)}
                    logueado={this.state.estadoLogin==2}
                  />}
                />
              </div>
            </Cell>
          </Grid>
        </GridContainer>
      </div>
    );
  }

  //--Añade un producto al carrito. Se llama desde un DisplayProducto cuando el botón "Añadir", "Cambiar" o "Quitar" es clickeado
  /* anadirProductoCarrito(idProducto, 0) para eliminar producto del carrito
     anadirProductoCarrito(idProducto, n>0) --->Actualiza la cantidad si ya existe el producto
                                            --->Agrega el producto al carrito en caso contrario, con esa cantidad
  */
  anadirProductoCarrito(idProducto, cantidad){
    let prodsCarrito = this.state.productosCarrito;
    let existeProducto = false;

    for(let i = 0; i < prodsCarrito.length; i++){
      if(prodsCarrito[i].idProducto == idProducto){ //Ya está el producto en el carrito
        existeProducto = true;
        if(cantidad == 0){
          //QUITAR
          prodsCarrito.splice(i,1); //Eliminamos el producto de la lista
        } else {
          //CAMBIAR
          prodsCarrito[i].cantidad = cantidad; //Actualizamos la cantidad elegida
        }
        break;
      }
    }
    if(!existeProducto){
      //AÑADIR
      prodsCarrito.push({idProducto:idProducto, cantidad:cantidad});
    }
    this.setState({productosCarrito:prodsCarrito});

    //--Enviamos el carrito actualizado al servidor para que lo guarde en la BD
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

  //--Vacía el carrito aquí y en el servidor/BD--
  vaciarCarrito(){
    //Vaciamos el carrito del cliente
    this.setState({productosCarrito:[], totalCarrito:0});

    //Llamamos a actualizarCarrito con un array vacío para actualizar la BD
    conexionBD.actualizarCarrito([], (respuesta)=>{
      if(respuesta.exito){
        console.log("Carrito online de "+this.state.usuarioLogueado+" vaciado.");
      } else {
        if(respuesta.msjError == "nohaylogin"){
          console.log("No hay usuario logueado. Vaciando carrito offline.")
        } else {
          console.log(respuesta.msjError);
        }
      }
    })
  }

  /*Llama al servidor para concretar el "pago" de los ítems del carrito.
    Es llamada desde el componente Carrito al clickear "Pagar".
    El callback se utiliza allí. */
  pagarCarrito(callback){
    conexionBD.realizarPago((respuesta)=>{
      if(respuesta.exito){
        //Carrito pagado e ítems descontados del stock
        //Vaciamos el carrito
        this.setState({productosCarrito:[]});
        callback(true);
      } else {
        //Error
        console.log(respuesta.msjError);
        console.log(respuesta.error);
        alert("Error al intentar hacer la compra");
        callback(false);
      }
    })
  }

  //Regresa a la página de login
  irALogin(){
    this.setState({volverAlLogin:true});
  }
}

export default PaginaPrincipal;
