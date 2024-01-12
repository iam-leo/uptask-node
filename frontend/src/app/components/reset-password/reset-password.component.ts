import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'reset-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  email = '';
  showMessage = false;
  errorMessage = '';
  errorStatus = false;

  constructor ( private _accountService: AccountService, private router: Router ){ }

  resetPassword(email: string){
    if(!this.validateEmail(email)){
      return
    }

    this._accountService.resetPassword(email).subscribe({
      next: () => {
        this.showMessage = true;
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 5000);
      }, error: (err) => {
        this.handleLoginError(err);
      }
    })
  }

  validateEmail(email: string){
    if (!email || email.trim() === '') {
      this.errorMessage = 'El email es requerido.';
      this.errorStatus = true;
      this.hideError();
      return false;
    } else if (!this.isValidEmail(email)) {
      this.errorMessage = 'Por favor, ingresa un email válido.';
      this.errorStatus = true;
      this.hideError();
      return false;
    } else {
      return true;
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  hideError(){
    setTimeout(()=> this.errorStatus=false ,3000)
  }

  private handleLoginError(error: any) {
    if (error.error.message === 'User not found!') {
      this.errorMessage = 'Usuario no encontrado. Verifica el email ingresado.';
    }
    this.errorStatus = true;
    this.hideError();
  }
}
