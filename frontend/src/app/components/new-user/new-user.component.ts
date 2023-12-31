import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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

  constructor( private _accountService: AccountService ) {}

  createAccount(name: string, email: string, password: string){
    const user = {
      name,
      email,
      password
    }

    this._accountService.newAccount(user).subscribe(()=>{
      console.log('User creado');
    })
  }

}
