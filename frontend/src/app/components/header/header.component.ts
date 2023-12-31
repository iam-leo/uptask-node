import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'header-app',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  nameUser = '';

  constructor( private _userService: UserService) { }

  ngOnInit(): void {
    this._userService.getUserName().subscribe((res) => {
      this.nameUser = res.name;
    })
  }

}
