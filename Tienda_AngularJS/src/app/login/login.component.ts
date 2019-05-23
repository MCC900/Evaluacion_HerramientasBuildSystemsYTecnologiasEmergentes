import { Component } from '@angular/core';
import { ClienteTiendaService } from '../cliente-tienda.service';
import { ConexionBDService } from '../conexion-bd.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(
    private conexionBDService:ConexionBDService,
    private clienteTiendaService:ClienteTiendaService
  ){}

  validCorrecta:boolean = false;
  errorEnvio:boolean = false;
  exitoLogin:boolean = false;
  msjError:string = "";

  emailIngresado:string = "";
  contrasenaIngresada:string = "";
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

  intentarLogin(callback){
    let email = this.emailIngresado;
    let contrasena = this.contrasenaIngresada;

    this.conexionBDService.intentarLogin(email, contrasena, (respuesta) => {
      callback(respuesta);
    });
  }

  clickIngresar(event){
    event.preventDefault();
    this.intentarLogin((resultado) => {
      if(resultado.exito){
        console.log("Usuario "+this.emailIngresado+" logueado");
        this.exitoLogin = true;
        this.errorEnvio = false;
        this.clienteTiendaService.cambiarPagina("/catalogo");
      } else {
        if(this.msjError == resultado.msjError){
          resultado.msjError = "*** "+resultado.msjError+" ***";
        }
        if(resultado.error){
          console.log(resultado.error);
        }
        this.errorEnvio = true;
        this.msjError = resultado.msjError;
      }
    });
  }

}
