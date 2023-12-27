import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  newTaskInput = '';

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
      // Cambiar el estado en el front 
      const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
        }
    });
  }

  addNewTask(task: string){
    this._tasksService.newTask(task).subscribe((newTask) => {
      this.tasks.push(newTask);
      this.newTaskInput = '';
    })
  }

}
