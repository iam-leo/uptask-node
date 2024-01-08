import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { SubtasksComponent } from './components/subtasks/subtasks.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { AccountConfirmedComponent } from './components/account-confirmed/account-confirmed.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },
    { path: 'tasks', component: TasksComponent, canActivate: [authGuard] },
    { path: 'task/:url', component: SubtasksComponent, canActivate: [authGuard] },
    { path: 'new-account', component: NewUserComponent, canActivate: [noAuthGuard] },
    { path: 'account/:name', component: AccountConfirmedComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'reset-password/:token', component: NewPasswordComponent },
    { path: '**', redirectTo: 'login'}
];
