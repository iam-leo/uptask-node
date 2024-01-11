import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'login',
  standalone: true,
  imports: [FormsModule, RouterModule, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorStatus = false;
  errorMessage = '';

  constructor( private _loginService: LoginService, private route: Router, private cookieService: CookieService ) { }

  login(email: string, password: string){

    const isValidEmail = this.validateEmail(email);
    const isValidPassword = this.validatePassword(password);

    if( !isValidEmail || !isValidPassword ){
      return
    }

    const credentials = {
      email,
      password
    }

    this._loginService.login(credentials).subscribe({
      next: () => {
        this.cookieService.set('auth', 'user authenticated');
        this.route.navigate(['/tasks'])

      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
      },
    });
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

  validatePassword(password: string){
    if (!password || password.trim() === '') {
      this.errorMessage = 'La contraseña es requerida.';
      this.errorStatus = true;
      this.hideError();
      return false;
    } else if (password.length < 6) {
      this.errorMessage= 'La contraseña debe tener al menos 6 caracteres.';
      this.errorStatus = true;
      this.hideError();
      return false;
    } else {
      return true;
    }
  }

  hideError(){
    setTimeout(()=> this.errorStatus=false ,3000)
  }
}
