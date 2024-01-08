import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor( private http: HttpClient ) { }

  newAccount(user: object): Observable<any>{
    return this.http.post(`${environment.baseUrl}/new-user`, user);
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}/reset-password`, { email });
  }

  verifyToken(token: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/reset-password/${ token }`);
  }

  newPassword(token: string, password: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}/reset-password/${token}`, { password });
  }
}
