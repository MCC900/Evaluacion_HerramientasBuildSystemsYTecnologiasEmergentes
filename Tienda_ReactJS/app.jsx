import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './Login.jsx';
import Catalogo from './Catalogo.jsx';
import DisplayDetalladoProducto from './DisplayDetalladoProducto.jsx';
import PaginaPrincipal from './PaginaPrincipal.jsx';

class App extends React.Component {
  render(){
    return(
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/" component={PaginaPrincipal}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
