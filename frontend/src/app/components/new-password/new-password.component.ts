import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'new-password',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent implements OnInit {
  token: string;
  verification = false;
  password = '';
  errorMessage = '';
  errorStatus = false;
  successStatus = false;

  constructor( private router: Router, private route: ActivatedRoute, private _accountService: AccountService) {
    this.token = this.route.snapshot.params['token'];
  }

  ngOnInit(): void {
    this._accountService.verifyToken(this.token).subscribe({
      next: () => {
        this.verification = true;
      },
      error: () => {
        this.verification = false;
      }
    })
  }

  newPassword(password: string){
    if(!this.validatePassword(password)){
      return
    }

    this._accountService.newPassword(this.token, this.password).subscribe( ()=>{
      this.successStatus = true;

      setTimeout(() => {
        this.router.navigate(['/']);
      }, 3500);
    })
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
