import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormInputComponent } from './form-input/form-input.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { BarraSuperiorComponent } from './barra-superior/barra-superior.component';
import { DisplayDetalladoProductoComponent } from './display-detallado-producto/display-detallado-producto.component';
import { CarritoComponent } from './carrito/carrito.component';
import { DisplayProductoComponent } from './display-producto/display-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormInputComponent,
    PaginaPrincipalComponent,
    CatalogoComponent,
    BarraSuperiorComponent,
    DisplayDetalladoProductoComponent,
    CarritoComponent,
    DisplayProductoComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
