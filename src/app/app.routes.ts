import { Routes } from '@angular/router';
import { HomeLoginComponent } from './pages/not-logged/home-login/home-login.component';
import { RegistrationComponent } from './pages/not-logged/registration/registration.component';
import { HomeMainComponent } from './pages/logged/home-main/home-main.component';
import { HomeUserComponent } from './pages/logged/home-user/home-user.component';
import { HomeTecComponent } from './pages/logged/home-tec/home-tec.component';
import { AllCalledTableComponent } from './pages/logged/all-called-table/all-called-table.component';
import { DashboardComponent } from './pages/logged/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeLoginComponent
  },
  {
    path: 'nova-senha',
    component: RegistrationComponent
  },
  {
    path: 'main',
    component: HomeMainComponent
  },
  {
    path: 'user-main',
    component: HomeUserComponent
  },
  {
    path: 'tec-main',
    component: HomeTecComponent
  },
  {
    path: 'todos-chamados',
    component: AllCalledTableComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
];
