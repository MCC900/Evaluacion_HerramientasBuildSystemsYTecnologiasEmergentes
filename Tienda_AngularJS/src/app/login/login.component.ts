import { Component } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  validCorrecta:boolean = false;
  errorEnvio:boolean = false;
  exitoLogin:boolean = false;
  msjError:string = "";

  emailIngresado = "";
  contrasenaIngresada = "";
  emailValidCorrecta:boolean = false;
  contrasenaValidCorrecta:boolean = false;

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
    if(!this.validCorrecta && this.emailValidCorrecta && this.contrasenaValidCorrecta){
      this.validCorrecta = true;
    } else if(this.validCorrecta && (!this.emailValidCorrecta || !this.contrasenaValidCorrecta)){
      this.validCorrecta = false;
    }
  }
}
