import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubtasksService } from '../../services/subtasks.service';
import { of, switchMap } from 'rxjs';
import { TasksService } from '../../services/tasks.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'subtasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  constructor(private route: ActivatedRoute, private _taskService: TasksService, private _subtasksService: SubtasksService, private cd: ChangeDetectorRef ) {}

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
}
