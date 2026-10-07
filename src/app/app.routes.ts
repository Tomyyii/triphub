import { Routes } from '@angular/router';
import { HomePage } from './pages/homePage/homePage';
import { LoginPage } from './pages/loginPage/loginPage';
import { RegisterPage } from './pages/registerPage/registerPage';
import { DashboardPage } from './pages/dashboardPage/dashboardPage';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [

  {
    path:'',
    component: HomePage
  },
  {
    path:'login',
    component: LoginPage
  },
  {
    path:'register',
    component: RegisterPage
  },
  {
    path:'dashboard',
    component:DashboardPage,
    canActivate:[authGuard]
  }
];
