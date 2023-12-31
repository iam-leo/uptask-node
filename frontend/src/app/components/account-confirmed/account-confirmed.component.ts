import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'account-confirmed',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './account-confirmed.component.html',
  styleUrl: './account-confirmed.component.css'
})
export class AccountConfirmedComponent implements OnInit {
  name = '';

  constructor( private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'].replace(/\_/g, '.');
  }

}
