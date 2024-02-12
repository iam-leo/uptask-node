import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { of, switchMap } from 'rxjs';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  newTaskInput = '';
  errorMessage = '';
  statusError = false;

  constructor( private _tasksService: TasksService, private cd: ChangeDetectorRef ){}

  ngOnInit(): void {
    this.refreshTasks();
  }

  refreshTasks() {
    of(null).pipe(
      switchMap(() => this._tasksService.getAllTasks())
    ).subscribe({
      next: (res) => {
        this.tasks = res;
        this.cd.detectChanges(); // Forzar la actualización de la vista
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  taskIsCompleted(id: number) {
    this._tasksService.taskIsCompleted(id).subscribe((data) => {
      // Cambiar el estado en el front
      const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
        }
    });
  }

  addNewTask(task: string){
    // Si el input está vacío paramos la ejecución
    if(!this.validateInputTask(task)){
      return
    }

    this._tasksService.newTask(task).subscribe((newTask) => {
      this.refreshTasks();
      this.newTaskInput = '';
      this.cd.detectChanges();
    })
  }

  deleteTask(id: number) {
    this._tasksService.deleteTask(id).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.refreshTasks();
        }, 200);
        this.cd.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  validateInputTask(task: string){
    if(task === ''){
      this.errorMessage = 'Debes escribir una tarea!';
      this.statusError = true;
      this.hideError();
      return false;
    } else if(task.trim() === ''){
      this.errorMessage = 'La tarea no puede estar compuesta solo por espacios!';
      this.statusError = true;
      this.hideError();
      return false;
    }
    return true;
  }

  hideError(){
    setTimeout(() => {
      this.newTaskInput = '';
      this.statusError = false;
    }, 3000);
  }

}
