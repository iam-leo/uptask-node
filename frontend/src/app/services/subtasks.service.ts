import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubtasksService {

  constructor( private http: HttpClient ) { }

  newSubtask(id: number, subtask: string): Observable<any>{
    return this.http.post(`http://localhost:3000/task/${id}/new-subtask`, { subtask }, { withCredentials: true });
  }

  getSubtasks(id: number): Observable<any>{
    return this.http.get(`http://localhost:3000/task/${id}/all-subtasks`, { withCredentials: true });
  }

  subtaskIsCompleted(id: number): Observable<any>{
    return this.http.patch(`http://localhost:3000/task/subtask/is-completed/${id}`, {completed: null}, { withCredentials: true });
  }

  deleteSubtask(id: number){
    return this.http.delete(`http://localhost:3000/task/subtask/${id}`, { withCredentials: true })
  }
}
