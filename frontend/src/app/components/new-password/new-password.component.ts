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
    this._accountService.newPassword(this.token, this.password).subscribe( ()=>{
      this.router.navigate(['/']);
    })
  }
}
