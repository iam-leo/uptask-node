import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient ) { }

  login(credentials: object): Observable<any>{
    return this.http.post('http://localhost:3000/login', credentials, { withCredentials: true });
  }
}
