import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubtasksService {

  constructor( private http: HttpClient ) { }

  getSubtasks(id: number): Observable<any>{
    return this.http.get(`http://localhost:3000/task/${id}/all-subtasks`, { withCredentials: true })
  }
}
