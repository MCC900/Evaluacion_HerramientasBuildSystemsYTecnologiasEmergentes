import React from 'react';

class FormInput extends React.Component {
  //FormInput es un componente que puede ser un input de email o de contraseña, se utiliza para los dos
  constructor(){
    super();
    this.state = {
      mostrarMsjError: false,
      valorIngresado:"",
      validCorrecta:false,
      msjError:""
    };
  }

  render(){
    return(
      <div>
        <label className="subtituloLogin">{this.props.texto}:
          <span className={"lblError "+(this.state.mostrarMsjError ? "":"hide")}>{"   ("+this.state.msjError+")"}</span>
          <input className={this.state.mostrarMsjError ? "inputError" : ""}
            type={this.props.tipo}
            placeholder={this.props.placeholder}
            onChange={this.actualizarEstado.bind(this)}
            onBlur={this.actualizarEstado.bind(this)}></input>
        </label>
        <label className={"lblError " + (this.state.mostrarMsjError ? "":"hide")}>
          {this.state.tipoError == "vacio" ? "Este campo no puede estar vacío" : ""}
        </label>
      </div>
    );
  }

  //Valida el formulario cada vez que hay un cambio
  actualizarEstado(event){
    let valorIngresado = event.target.value;
    let validCorrecta = true;
    let msjError = "";
    if(valorIngresado == ""){
      msjError = "Este campo no puede estar vacío";
      validCorrecta = false;
    } else if(this.props.tipo == "email" && !this.validateEmail(valorIngresado)){
      msjError = "Formato de email incorrecto";
      validCorrecta = false;
    }

    this.setState({
      mostrarMsjError:!validCorrecta,
      valorIngresado:valorIngresado,
      validCorrecta:validCorrecta,
      msjError:msjError
    });

    //Llamamos la función pasada por props cuando cambia el valor ingresado
    this.props.alCambiarValor(valorIngresado, validCorrecta);
  }

  //Función con regex obtenida de: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

export default FormInput;
