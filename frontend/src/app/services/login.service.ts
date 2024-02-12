import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient ) { }

  login(credentials: object): Observable<any>{
    return this.http.post(`${environment.baseUrl}/login`, credentials, { withCredentials: true });
  }

  logout(): Observable<any>{
    return this.http.get(`${environment.baseUrl}/logout`, { withCredentials: true });
  }
}
