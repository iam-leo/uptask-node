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

  constructor( private _loginService: LoginService, private route: Router, private cookieService: CookieService ) { }

  login(email: string, password: string){

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
}
