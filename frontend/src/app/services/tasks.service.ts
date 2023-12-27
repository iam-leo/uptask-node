import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor( private http: HttpClient ) { }

  newTask(task: string): Observable<any>{
    return this.http.post('http://localhost:3000/new-task', { task }, { withCredentials: true });
  }

  getAllTasks(): Observable<any>{
    return this.http.get('http://localhost:3000/all-tasks', { withCredentials: true });
  }

  getTaskByURL(url: string): Observable<any>{
    return this.http.get(`http://localhost:3000/task/${url}`, { withCredentials: true });
  }

  taskIsCompleted(id: number): Observable<any>{
    return this.http.patch(`http://localhost:3000/task-is-completed/${id}`,{completed: null}, { withCredentials: true });
  }

  deleteTask(id: number){
    return this.http.delete(`http://localhost:3000/delete-task/${id}`, { withCredentials: true })
  }
}
