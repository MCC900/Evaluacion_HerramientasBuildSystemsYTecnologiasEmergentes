import React from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Column, Link as BtnLink } from 'react-foundation';

import FormInput from './FormInput.jsx';
import conexionBD from './conexionBD';

class Login extends React.Component {

  constructor(){
    super();
    this.state = {
      validCorrecta:false,
      errorEnvio:false,
      exitoLogin:false,
      msjError:""
    }

    this.emailIngresado = "";
    this.emailValidCorrecta = false;
    this.contrasenaIngresada = "";
    this.contrasenaValidCorrecta = false;
  }

  render(){
    if(this.state.exitoLogin){
      return(<Redirect to="/catalogo"/>);
    }
    return(
      <div className="login">
        <div className="fondo loginFondo"/>
        <div className="vAlign">
          <Column className="formLogin" centerOnSmall small={8} medium={6} large={4}>
            <Row>
              <h3 className="tituloLogin">Inicia Sesión</h3>
            </Row>
            <Row>
              <FormInput tipo="email" texto="Correo electrónico" placeholder="Ingrese su email"
                alCambiarValor={this.cambiaEmail.bind(this)}/>
            </Row>
            <Row>
              <FormInput tipo="password" texto="Contraseña" placeholder="Ingrese su contraseña"
                alCambiarValor={this.cambiaContrasena.bind(this)}/>
            </Row>
            <Row>
              <Column small={8} centerOnSmall>
                <BtnLink isExpanded
                className={this.state.validCorrecta ? "":"disabled"}
                onClick={this.state.validCorrecta ? this.clickIngresar.bind(this) : null}>Ingresar</BtnLink>
              </Column>
            </Row>
            <Row>
              <label className={"text-center lblError "+(this.state.errorEnvio ? "":"hide")}>{this.state.msjError}</label>
            </Row>
          </Column>
        </div>
      </div>
    );
  }

  clickIngresar(){
    this.intentarLogin((resultado) => {
      if(resultado.exito){
        this.setState({
          exitoLogin:true,
          errorEnvio:false
        });
        this.forceUpdate();
      } else {
        if(this.state.msjError == resultado.msjError){
          resultado.msjError = "*** "+resultado.msjError+" ***";
        }
        if(resultado.error){
          console.log(resultado.error);
        }
        this.setState({
          errorEnvio:true,
          msjError:resultado.msjError
        });
      }
    });
  }

  cambiaEmail(email, esValido){
    this.emailIngresado = email;
    this.emailValidCorrecta = esValido;
    this.verificarValidarDatos();
  }

  cambiaContrasena(contrasena, esValido){
    this.contrasenaIngresada = contrasena;
    this.contrasenaValidCorrecta = esValido;
    this.verificarValidarDatos();
  }

  verificarValidarDatos(){
    if(!this.state.validCorrecta && this.emailValidCorrecta && this.contrasenaValidCorrecta){
      this.setState({validCorrecta:true});
    } else if(this.state.validCorrecta && (!this.emailValidCorrecta || !this.contrasenaValidCorrecta)){
      this.setState({validCorrecta:false});
    }
  }

  intentarLogin(callback){
    let email = this.emailIngresado;
    let contrasena = this.contrasenaIngresada;

    conexionBD.intentarLogin(email, contrasena, (respuesta) => {
      console.log(respuesta);
      callback(respuesta);
    });

  }
}

export default Login;
