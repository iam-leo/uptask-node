import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];

  constructor( private _tasksService: TasksService ){}
  ngOnInit(): void {
    this._tasksService.getAllTasks().subscribe({
      next: (res) => {
        console.log(res)
        this.tasks = res
      }
    })
  }

  taskIsCompleted(id: number) {
    this._tasksService.taskIsCompleted(id).subscribe((data) => {
      console.log('Tarea completada: ', data);
      const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
        }
    });
  }

}
