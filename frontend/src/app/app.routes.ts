import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { SubtasksComponent } from './components/subtasks/subtasks.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { AccountConfirmedComponent } from './components/account-confirmed/account-confirmed.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'tasks', component: TasksComponent },
    { path: 'task/:url', component: SubtasksComponent },
    { path: 'new-account', component: NewUserComponent},
    { path: 'account/:name', component: AccountConfirmedComponent }
];
