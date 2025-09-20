import { Component } from '@angular/core';
import { RegisterPasswordComponent } from "../../../components/not-logged/register-password/register-password.component";

@Component({
  selector: 'app-registration',
  imports: [RegisterPasswordComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

}
