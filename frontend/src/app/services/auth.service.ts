import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private cookieService: CookieService) {}

  isAuthenticated(): boolean {
    const isAuthenticated = this.cookieService.check('auth');
    return isAuthenticated;
  }
}
