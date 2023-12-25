import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'tasks',
  standalone: true,
  imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {

  constructor( private _tasksService: TasksService ){}
  ngOnInit(): void {
    this._tasksService.getAllTasks().subscribe({
      next: (res) => {
        console.log(res);
      }
    })
  }

}
