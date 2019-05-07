import React from 'react';
import { Link } from 'react-router-dom';
import { TopBar, TopBarLeft, TopBarRight, Menu, MenuItem, Icon, Cell, Badge } from 'react-foundation';

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
              <MenuItem><Link to="/catalogo"><Icon name="fi-thumbnails"></Icon> <span>Catálogo</span></Link></MenuItem>
              <MenuItem><Link to="/carrito"><Icon name="fi-shopping-cart"></Icon> <span>Carrito</span>
                {this.props.cantProdsCarrito == 0 ? null :
                <Badge className="iconoNotifCarrito">{this.props.cantProdsCarrito}</Badge>}
                </Link></MenuItem>
              <MenuItem><Link to="/"><Icon name="fi-x"></Icon> <span>Cerrar sesión</span></Link></MenuItem>
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
}

export default BarraSuperior;
