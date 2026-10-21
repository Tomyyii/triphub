import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/authService';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {

  menuAbierto = signal(false)


  private authService = inject(AuthService);

  private router = inject(Router);

  cerrarSesion(): void{
    this.authService.logout();
    this.router.navigate([''])
  }
}
