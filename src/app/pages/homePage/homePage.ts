import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Usuario } from '../../shared/interfaces/usuario.interface';
import { AuthService } from '../../core/services/authService';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
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


}
