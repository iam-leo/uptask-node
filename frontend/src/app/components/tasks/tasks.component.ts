import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { of, switchMap } from 'rxjs';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SubtasksService } from '../../services/subtasks.service';

@Component({
  selector: 'tasks',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  newTaskInput = '';
  errorMessage = '';
  statusError = false;
  showSpinner = false;

  constructor(
    private _tasksService: TasksService,
    private _subtasksService: SubtasksService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.refreshTasks();
  }

  refreshTasks() {
    of(null)
      .pipe(switchMap(() => this._tasksService.getAllTasks()))
      .subscribe({
        next: (res) => {
          this.tasks = res;
          this.cd.detectChanges(); // Forzar la actualización de la vista
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  taskIsCompleted(id: number) {
    this._tasksService.taskIsCompleted(id).subscribe((data) => {
      // Cambiar el estado en el front
      const task = this.tasks.find((task) => task.id === id);
      if (task) {
        task.completed = !task.completed;

        // Llamar al método para actualizar los estados de las subtareas
        this.updateSubtasksStatus(task.id, task.completed);
      }
    });
  }

  updateSubtasksStatus(taskId: number, completed: boolean) {
    // Obtener subtareas de la tarea actual
    this._subtasksService.getSubtasks(taskId).subscribe((subtasks) => {
      // Filtrar subtareas según su estado actual
      const subtasksToUpdate = subtasks.filter(
        (subtask: any) => subtask.completed !== completed
      );

      // Actualizar el estado de cada subtarea
      subtasksToUpdate.forEach((subtask: any) => {
        subtask.completed = completed;

        // Llamar al método para marcar la subtarea como completa o incompleta
        this._subtasksService
          .subtaskIsCompleted(subtask.id)
          .subscribe(() => {});
      });
    });
  }

  addNewTask(task: string) {
    // Si el input está vacío paramos la ejecución
    if (!this.validateInputTask(task)) {
      return;
    }

    this.showSpinner = true;

    this._tasksService.newTask(task).subscribe((newTask) => {
      this.refreshTasks();
      this.newTaskInput = '';
      this.cd.detectChanges();

      // Ocultar spinner luego de agregar una tarea
      this.showSpinner = false;
    });
  }

  deleteTask(id: number) {
    this.showSpinner = true;
    this._tasksService.deleteTask(id).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.refreshTasks();
        }, 200);
        this.cd.detectChanges();

        // Ocultar spinner luego de elimnar la tarea
        this.showSpinner = false;
      },
      error: (err) => {
        console.log(err);

        // Ocultar spinner luego de haber fallado la eliminación de la tarea
        this.showSpinner = false;
      },
    });
  }

  validateInputTask(task: string) {
    if (task === '') {
      this.errorMessage = 'Debes escribir una tarea!';
      this.statusError = true;
      this.hideError();
      return false;
    } else if (task.trim() === '') {
      this.errorMessage =
        'La tarea no puede estar compuesta solo por espacios!';
      this.statusError = true;
      this.hideError();
      return false;
    }
    return true;
  }

  hideError() {
    setTimeout(() => {
      this.newTaskInput = '';
      this.statusError = false;
    }, 3000);
  }
}
