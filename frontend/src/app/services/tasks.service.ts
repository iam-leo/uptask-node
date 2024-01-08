import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor( private http: HttpClient ) { }

  newTask(task: string): Observable<any>{
    return this.http.post(`${environment.baseUrl}/new-task`, { task }, { withCredentials: true });
  }

  getAllTasks(): Observable<any>{
    return this.http.get(`${environment.baseUrl}/all-tasks`, { withCredentials: true });
  }

  getTaskByURL(url: string): Observable<any>{
    return this.http.get(`${environment.baseUrl}/task/${url}`, { withCredentials: true });
  }

  taskIsCompleted(id: number): Observable<any>{
    return this.http.patch(`${environment.baseUrl}/task-is-completed/${id}`,{completed: null}, { withCredentials: true });
  }

  deleteTask(id: number){
    return this.http.delete(`${environment.baseUrl}/delete-task/${id}`, { withCredentials: true })
  }
}
