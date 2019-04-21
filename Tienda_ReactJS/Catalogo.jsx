import React from 'react';
import { Icon, Sizes, Cell, GridContainer, TopBar, TopBarLeft, TopBarRight, Menu, MenuItem } from 'react-foundation';

class Catalogo extends React.Component {
  render(){
    return(
      <div className="main">
        <div className="fondo mainFondo"/>
        <GridContainer>
          <TopBar className="barraSuperior">
            <TopBarLeft>
              <h5>Catálogo de productos</h5>
            </TopBarLeft>
            <TopBarRight>
              <Menu className="barraSuperior">
                <MenuItem><a><Icon name="fi-thumbnails"></Icon> <span>Catálogo</span></a></MenuItem>
                <MenuItem><a><Icon name="fi-shopping-cart"></Icon> <span>Carrito</span></a></MenuItem>
                <MenuItem><a><Icon name="fi-x"></Icon> <span>Salir</span></a></MenuItem>
              </Menu>
            </TopBarRight>
          </TopBar>
        </GridContainer>
      </div>
    )
  }
}

export default Catalogo;
