import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { CarritoComponent } from './carrito/carrito.component';
import { DisplayDetalladoProductoComponent } from './display-detallado-producto/display-detallado-producto.component';

const routes: Routes = [
  { path:"", component:LoginComponent, pathMatch: 'full' },
  { path:"", component:PaginaPrincipalComponent, children:[
      { path:"catalogo", component:CatalogoComponent },
      { path:"producto/:idProducto", component:DisplayDetalladoProductoComponent},
      { path:"carrito", component:CarritoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
