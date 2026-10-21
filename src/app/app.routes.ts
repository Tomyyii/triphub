import { Routes } from '@angular/router';
import { HomePage } from './pages/homePage/homePage';
import { LoginPage } from './pages/loginPage/loginPage';
import { RegisterPage } from './pages/registerPage/registerPage';
import { DashboardPage } from './pages/dashboardPage/dashboardPage';
import { authGuard } from './core/guards/auth-guard';
import { ProfilePage } from './pages/profilePage/profilePage';
import { TripPage } from './pages/tripPage/tripPage';
import { SchedulePage } from './pages/calendarPage/calendarPage';
import { DestinationsPage } from './pages/destinationsPage/destinationsPage';
import { StatisticsPage } from './pages/statisticsPage/statisticsPage';
import { CreateTripPage } from './pages/tripPage/createTripPage/createTripPage';
import { CancelledTripPage } from './pages/tripPage/cancelledTripPage/cancelledTripPage';
import { CoinsPage } from './pages/coinsPage/coinsPage';
import { DashboardHomePage } from './pages/dashboardPage/dashboardHomePage/dashboardHomePage';

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
    canActivateChild:[authGuard],
    children:[
      {
        path:'',
        component:DashboardHomePage
      },
      {
        path:'profile',
        component:ProfilePage
      },
      {
        path:'trip',
        component:TripPage
      },
      {
        path:'schedule',
        component: SchedulePage
      },
      {
        path:'destination',
        component:DestinationsPage
      },
      {
        path:'statistics',
        component:StatisticsPage
      },
      {
        path:'createtrip',
        component:CreateTripPage
      },
      {
        path:'cancelledtrip',
        component: CancelledTripPage
      }
    ]
  },
  {
    path:'coins',
    component:CoinsPage
  }
];
