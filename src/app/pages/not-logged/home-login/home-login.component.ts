import { Component } from '@angular/core';
import { LoginComponent } from "../../../components/not-logged/login/login.component";

@Component({
  selector: 'app-home-login',
  imports: [LoginComponent],
  templateUrl: './home-login.component.html',
  styleUrl: './home-login.component.scss'
})
export class HomeLoginComponent {

}
