import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/authService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  imports: [],
  templateUrl: './dashboardPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {

  private authService = inject(AuthService);

  private router = inject(Router);

  cerrarSesion(): void{
    this.authService.logout();
    this.router.navigate([''])
  }
}
