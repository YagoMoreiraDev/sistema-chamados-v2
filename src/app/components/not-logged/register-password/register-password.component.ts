import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-password',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './register-password.component.html',
  styleUrl: './register-password.component.scss'
})
export class RegisterPasswordComponent {
  // Password visibility toggles
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  // Email verification properties
  email: string = '';
  emailVerified: boolean = false;
  emailVerificationMessage: string = '';
  isVerifying: boolean = false;

  // Simulated database of registered emails (in a real app, this would be an API call)
  private readonly registeredEmails: string[] = [
    'user@example.com',
    'admin@test.com',
    'teste@gmail.com',
    'user@helpdesk.com'
  ];

  toggleNewPasswordVisibility(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  verifyEmail(): void {
    if (!this.email) {
      return;
    }

    this.isVerifying = true;
    this.emailVerificationMessage = '';

    // Simulate API call delay
    setTimeout(() => {
      const isValidEmail = this.isValidEmailFormat(this.email);
      const isRegistered = this.registeredEmails.includes(this.email.toLowerCase());

      if (!isValidEmail) {
        this.emailVerified = false;
        this.emailVerificationMessage = 'Por favor, digite um e-mail válido.';
      } else if (!isRegistered) {
        this.emailVerified = false;
        this.emailVerificationMessage = 'E-mail não encontrado em nossa base de dados.';
      } else {
        this.emailVerified = true;
        this.emailVerificationMessage = 'E-mail verificado com sucesso!';
      }

      this.isVerifying = false;
    }, 1500); // Simulate 1.5s delay
  }

  private isValidEmailFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
