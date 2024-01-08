import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubtasksService {

  constructor( private http: HttpClient ) { }

  newSubtask(id: number, subtask: string): Observable<any>{
    return this.http.post(`${environment.baseUrl}/task/${id}/new-subtask`, { subtask }, { withCredentials: true });
  }

  getSubtasks(id: number): Observable<any>{
    return this.http.get(`${environment.baseUrl}/task/${id}/all-subtasks`, { withCredentials: true });
  }

  subtaskIsCompleted(id: number): Observable<any>{
    return this.http.patch(`${environment.baseUrl}/task/subtask/is-completed/${id}`, {completed: null}, { withCredentials: true });
  }

  deleteSubtask(id: number){
    return this.http.delete(`${environment.baseUrl}/task/subtask/${id}`, { withCredentials: true })
  }
}
