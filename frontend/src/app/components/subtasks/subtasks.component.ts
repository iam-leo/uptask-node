import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubtasksService } from '../../services/subtasks.service';
import { of, switchMap } from 'rxjs';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'subtasks',
  standalone: true,
  imports: [],
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

  constructor(private route: ActivatedRoute, private _taskService: TasksService, private _subtasksService: SubtasksService, private cd: ChangeDetectorRef ) {}

  ngOnInit(): void {
    this.urlParam = this.route.snapshot.params['url'];
    this._taskService.getTaskByURL(this.urlParam).subscribe((task) => {
      this.currentTask = task;
      this.task = task.title;
      console.log(this.currentTask);
    })
    this.refreshTasks();
  }

  refreshTasks() {
    of(null).pipe(
      switchMap(() => this._subtasksService.getSubtasks(this.currentTask.id))
    ).subscribe({
      next: (res) => {
        this.subtasks = res;
        console.log(this.subtasks)
        this.cd.detectChanges(); // Forzar la actualización de la vista
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
