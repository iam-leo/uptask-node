import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubtasksService } from '../../services/subtasks.service';
import { of, switchMap } from 'rxjs';
import { TasksService } from '../../services/tasks.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'subtasks',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './subtasks.component.html',
  styleUrl: './subtasks.component.css'
})
export class SubtasksComponent implements OnInit{
  urlParam = '';
  currentTask: { id: number, title: string, url: string, completed: boolean, UserId: number } = {
    id: 0,
    title: '',
    url: '',
    completed: false,
    UserId: 0
  };
  task = '';
  subtasks: any[] = [];
  newSubtaskInput = '';
  progressStatus = 0;
  taskCompletedFlag = false;
  errorMessage = '';
  statusError = false;

  constructor(private route: ActivatedRoute, private router: Router, private _taskService: TasksService, private _subtasksService: SubtasksService, private cd: ChangeDetectorRef ) {}

  ngOnInit(): void {
    this.urlParam = this.route.snapshot.params['url'];
    this._taskService.getTaskByURL(this.urlParam).subscribe((task) => {
      this.currentTask = task;
      this.task = task.title;
      this.refreshSubtasks();
    })
  }

  refreshSubtasks() {
    of(null).pipe(
      switchMap(() => this._subtasksService.getSubtasks(this.currentTask.id))
    ).subscribe({
      next: (res) => {
        this.subtasks = res;
        this.cd.detectChanges(); // Forzar la actualización de la vista
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addNewSubtask(newSubtask: string){
    // Si el input está vacío paramos la ejecución
    if(!this.validateInputSubtask(newSubtask)){
      return
    }

    this._subtasksService.newSubtask(this.currentTask.id, this.newSubtaskInput).subscribe(() => {
      this.refreshSubtasks();
      this.newSubtaskInput = '';
      this.cd.detectChanges();
    });
  }

  subtaskIsCompleted(id: number) {
    this._subtasksService.subtaskIsCompleted(id).subscribe((data) => {
      // Cambiar el estado en el front
      const subtask = this.subtasks.find(subtask => subtask.id === id);
        if (subtask) {
            subtask.completed = !subtask.completed;
        }
    });
  }

  deleteSubtask(id: number) {
    this._subtasksService.deleteSubtask(id).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.refreshSubtasks();
        }, 200);
        this.cd.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  progressTask(){
    if(this.subtasks.length > 0){
      let completed = this.subtasks.filter(task => task.completed).length;

      // Obtener porcentaje de subtareas completadas
      this.progressStatus = Math.round((completed / this.subtasks.length) * 100);

      // Si las subtareas llegaron al 100% y la bandera no está establecida, marcar tarea completada
      if (this.progressStatus === 100 && !this.taskCompletedFlag) {
        this.taskCompletedFlag = true;

        // Cambiar estado de tarea incompleta a completa
        this.taskCompleted();
      } else if (this.progressStatus !== 100) {
        // Si el progreso no es 100%, restablecer la bandera
        this.taskCompletedFlag = false;

        // Cambiar estado de tarea completa a incompleta
        this.taskCompleted();
      }

      return this.progressStatus + '%';
    } else {
      return '0%';
    }
  }

  taskCompleted(){
    if(this.progressStatus == 100){
      this._taskService.taskIsCompleted(this.currentTask.id).subscribe(() => {
        console.log('Tarea completada');
      })
    }
  }

  redirectToTasks(){
    this.router.navigate(['/tasks']);
  }

  validateInputSubtask(subtask: string){
    if(subtask === ''){
      this.errorMessage = 'Debes escribir una subtarea!';
      this.statusError = true;
      this.hideError();
      return false;
    } else if(subtask.trim() === ''){
      this.errorMessage = 'La subtarea no puede estar compuesta solo por espacios!';
      this.statusError = true;
      this.hideError();
      return false;
    }
    return true;
  }

  hideError(){
    setTimeout(() => {
      this.newSubtaskInput = '';
      this.statusError = false;
    }, 3000);
  }
}
