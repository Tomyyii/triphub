import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/authService';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-dashboard-page',
  imports: [Navbar, RouterLink,RouterOutlet],
  templateUrl: './dashboardPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {

}
