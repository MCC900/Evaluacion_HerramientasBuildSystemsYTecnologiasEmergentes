import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})

export class FormInputComponent {
  //<form-input> es un componente que puede ser un input de email o de contraseña, se utiliza para los dos

  @Input() texto:string;
  @Input() tipo:string;
  @Input() placeholder:string;
  @Input() alCambiarValor;

  mostrarMsjError:boolean = false;
  valorIngresado:string = "";
  validCorrecta:boolean = false;
  msjError:string = "Error de prueba";

  //Valida el formulario cada vez que hay un cambio
  actualizarEstado(valorIngresado){
    if(valorIngresado == ""){
      this.msjError = "Este campo no puede estar vacío";
      this.validCorrecta = false;
      this.mostrarMsjError = true;
    } else if(this.tipo=="email" && !this.validateEmail(valorIngresado)){
      this.msjError = "Formato de email incorrecto";
      this.validCorrecta = false;
      this.mostrarMsjError = true;
    } else {
      this.validCorrecta = true;
      this.mostrarMsjError = false;
    }

    this.valorIngresado = valorIngresado;
    //Llamamos la función pasada por atributos (ver login.component.html) cuando cambia el valor ingresado
    this.alCambiarValor(this.valorIngresado, this.validCorrecta);
  }

  //Función con regex obtenida de: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
