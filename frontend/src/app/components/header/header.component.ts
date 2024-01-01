import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'header-app',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  nameUser = '';

  constructor( private _userService: UserService, private _loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this._userService.getUserName().subscribe((res) => {
      this.nameUser = res.name;
    })
  }

  logout(){
    this._loginService.logout().subscribe( () => {
      this.router.navigate(['/'])
    })
  }

}
