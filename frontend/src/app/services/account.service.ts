import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor( private http: HttpClient ) { }

  newAccount(user: object): Observable<any>{
    return this.http.post('http://localhost:3000/new-user', user);
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post('http://localhost:3000/reset-password', { email });
  }

  verifyToken(token: string): Observable<any> {
    return this.http.get(`http://localhost:3000/reset-password/${ token }`);
  }

  newPassword(token: string, password: string): Observable<any> {
    return this.http.post(`http://localhost:3000/reset-password/${token}`, { password })
  }
}
