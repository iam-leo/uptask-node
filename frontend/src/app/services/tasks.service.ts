import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor( private http: HttpClient ) { }

  getAllTasks(): Observable<any>{
    return this.http.get('http://localhost:3000/all-tasks', { withCredentials: true });
  }
}
