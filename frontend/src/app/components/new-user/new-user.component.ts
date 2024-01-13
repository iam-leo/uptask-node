import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'new-user',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  name = '';
  email = '';
  password = '';
  errorStatus = false;
  errorMessage = '';
  successStatus = false;

  constructor( private _accountService: AccountService, private router: Router ) {}

  createAccount(name: string, email: string, password: string){
    // Validamos si estan todos los campos requeridos sino paramos la ejecucion
    if(!this.validateName(name) || !this.validateEmail(email) || !this.validatePassword(password)){
      return
    }

    const user = {
      name,
      email,
      password
    }

    this._accountService.newAccount(user).subscribe(()=>{
      this.successStatus = true;
      setTimeout(() => {
        this.successStatus = false;
        this.router.navigate(['/']);

      },3000);
    })
  }

  validateName(name: string){
    if(!name || name.trim() === ''){
      this.errorMessage = 'El nombre es requerido.';
      this.errorStatus = true;
      this.hideError();
      return false;
    }else{
      return true
    }
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
