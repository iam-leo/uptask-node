import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor( private _loginService: LoginService, private route: Router ) { }

  login(email: string, password: string){

    const credentials = {
      email,
      password
    }

    this._loginService.login(credentials).subscribe({
      next: () => {
        console.log('Has iniciado sesion');
        this.route.navigate(['/tasks'])

      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
      },
    });
  }
}
