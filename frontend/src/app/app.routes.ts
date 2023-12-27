import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { SubtasksComponent } from './components/subtasks/subtasks.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'tasks', component: TasksComponent },
    { path: 'task/:url', component: SubtasksComponent }
];
