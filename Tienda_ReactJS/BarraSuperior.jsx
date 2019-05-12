import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { TopBar, TopBarLeft, TopBarRight, Menu, MenuItem, Icon, Cell, Badge } from 'react-foundation';

import conexionBD from './conexionBD';

class BarraSuperior extends React.Component {
  constructor() {
    super();
  }

  render(){
    return(
      <div>
        <TopBar className="barraSuperior">
          <TopBarLeft>
            <h5>Tienda Web</h5>
          </TopBarLeft>
          <TopBarRight>
            <Menu className="barraSuperior">
              <MenuItem>
                <Link to="/catalogo">
                  <Icon name="fi-thumbnails"></Icon>Catálogo
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/carrito">
                  <Icon name="fi-shopping-cart"></Icon>Carrito
                  {
                    this.props.cantProdsCarrito == 0 ? null :
                    <Badge className="iconoNotifCarrito">{this.props.cantProdsCarrito}</Badge>
                  }
                </Link>
              </MenuItem>
              <MenuItem>
                <a onClick={this.cerrarSesion.bind(this)}>
                  <Icon name={this.props.estadoLogin == 2 ? "fi-x":"fi-home"}/>
                  {this.props.estadoLogin == 2 ? "Cerrar sesión" : "Login"}
                </a>
              </MenuItem>
            </Menu>
          </TopBarRight>
        </TopBar>
        <Cell small={12} className="msjBienvenida">
          { this.props.estadoLogin == 0 ? "Verificando sesión..." :
           (this.props.estadoLogin == 1 ? "Navegando como invitado" :
           (this.props.estadoLogin == 2 ? "Bienvenido, "+this.props.usuarioLogueado :
           (this.props.estadoLogin == 3 ? "Sin conexión con el servidor" : "ERROR")))}
        </Cell>
      </div>
    );
  }

  /*Cierra la sesión en el servidor. Funcione o no regresa a la página de login llamando
   a la función del componente Login pasada por props */
  cerrarSesion(){
    conexionBD.cerrarSesion((respuesta)=>{
      this.props.irALogin();
    });
  }
}

export default BarraSuperior;
