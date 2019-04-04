import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './Login.jsx';
import Catalogo from './Catalogo.jsx';

class App extends React.Component {
  render(){
    return(
      <Router>
        <div>
          <Route exact path="/" component={Login}/>
          <Route path="/catalogo" component={Catalogo}/>
        </div>
      </Router>
    );
  }
}

export default App;
