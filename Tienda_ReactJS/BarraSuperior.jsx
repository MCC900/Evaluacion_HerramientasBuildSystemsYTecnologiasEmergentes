import React from 'react';
import { TopBar, TopBarLeft, TopBarRight, Menu, MenuItem, Icon, Cell } from 'react-foundation';

import conexionBD from './conexionBD';

class BarraSuperior extends React.Component {
  constructor() {
    super();
    this.state = {
      checkeadoLogin:false,
      msjLogin:""
    };

    conexionBD.verificarSesion((respuesta)=>{
      let msjLogin;
      if(respuesta.exito){
        if(respuesta.usuarioLogueado == ""){
          msjLogin = "Navegando como invitado";
        } else {
          msjLogin = "Bienvenido, "+respuesta.usuarioLogueado;
        }
      } else {
        msjLogin = "Sin conexión con el servidor";
      }
      this.setState({checkeadoLogin:true, msjLogin:msjLogin})
    });
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
              <MenuItem><a><Icon name="fi-thumbnails"></Icon> <span>Catálogo</span></a></MenuItem>
              <MenuItem><a><Icon name="fi-shopping-cart"></Icon> <span>Carrito</span></a></MenuItem>
              <MenuItem><a><Icon name="fi-x"></Icon> <span>Cerrar sesión</span></a></MenuItem>
            </Menu>
          </TopBarRight>
        </TopBar>
        <Cell small={12} className="msjBienvenida">
          {this.state.checkeadoLogin ? this.state.msjLogin : "Verificando sesión..."}
        </Cell>
      </div>
    );
  }
}

export default BarraSuperior;
