import { Routes } from '@angular/router';
import { HomeLoginComponent } from './pages/not-logged/home-login/home-login.component';
import { RegistrationComponent } from './pages/not-logged/registration/registration.component';
import { HomeMainComponent } from './pages/logged/home-main/home-main.component';

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
];
