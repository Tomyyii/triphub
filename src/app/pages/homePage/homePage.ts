import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Usuario } from '../../shared/interfaces/usuario.interface';
import { AuthService } from '../../core/services/authService';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './homePage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {

  serviceAuth = inject(AuthService);

  buscarUsuario()
  {
    this.serviceAuth.login("tomas.dallier@gmail.com","1234pas").subscribe({
      next: (usuario) =>{
        console.log(usuario)
      },
      error: (error) =>{
        console.error(error)
      }
    })
  }

  buscarVarios()
  {
    this.serviceAuth.devolverUsuarios().subscribe({
      next: (usuarios) =>{
        console.log(usuarios)
      },
      error: (error)=>{
        console.error(error)
      }
    })
  }
}
