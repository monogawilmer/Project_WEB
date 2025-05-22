import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor (private router : Router){

  }
  title = 'Project_WEB';

  redireccionFormulario(ruta:string){
    this.router.navigate([ruta]);
  }
}
