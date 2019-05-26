import { Component } from '@angular/core';
import { ConexionBDService } from './conexion-bd.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ ConexionBDService ]
})
export class AppComponent {
}
