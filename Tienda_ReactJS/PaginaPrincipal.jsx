import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GridContainer, Grid, Cell } from 'react-foundation';

import BarraSuperior from './BarraSuperior.jsx';
import Catalogo from './Catalogo.jsx';
import DisplayDetalladoProducto from './DisplayDetalladoProducto.jsx';

class PaginaPrincipal extends React.Component {
  render(){
    return(
      <div className="main">
        <div className="fondo mainFondo"/>
        <GridContainer>

          <BarraSuperior/>

          <Grid>
            <Cell className="panelPrincipal" small={12}>
            <Router>
              <div>
                <Route path="/catalogo" component={Catalogo}/>
                <Route path="/producto/:idProducto" component={DisplayDetalladoProducto}/>
              </div>
            </Router>
            </Cell>
          </Grid>
        </GridContainer>
      </div>
    );
  }
}

export default PaginaPrincipal;
