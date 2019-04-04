import React from 'react';
import { Link } from 'react-router-dom';
import {Link as BtnLink, Alignments, Sizes, Row, Column} from 'react-foundation';

class Login extends React.Component {
  render(){
    return(
      <div className="login">
        <div className="fondo loginFondo"/>
        <div className="vAlign">
          <Column className="formLogin" centerOnSmall small={8} medium={6} large={4}>
            <Row>
              <h3 className="tituloLogin">Inicia Sesión</h3>
            </Row>
            <Row>
              <label className="subtituloLogin" htmlFor="inputEmail">Correo electrónico:
                <input id="inputEmail" type="email" placeholder="Ingrese su email"></input>
              </label>
            </Row>
            <Row>
              <label className="subtituloLogin" htmlFor="inputPass">Contraseña:
                <input id="inputPass" type="password" placeholder="Ingrese su contraseña"></input>
              </label>
            </Row>
            <Row>
              <Column small={8} centerOnSmall>
                <BtnLink isExpanded>Ingresar</BtnLink>
              </Column>
            </Row>
          </Column>
        </div>
      </div>
    );
  }
}

export default Login;
