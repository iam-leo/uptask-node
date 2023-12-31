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

  constructor ( private _accountService: AccountService, private router: Router ){ }

  resetPassword(email: string){
    console.log(email)
    this._accountService.resetPassword(email).subscribe(() => {
      console.log('Please check your inbox for a password reset link');
      this.showMessage = true;
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 5000);
    })
  }
}
