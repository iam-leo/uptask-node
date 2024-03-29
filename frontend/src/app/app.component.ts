import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { TasksService } from './services/tasks.service';
import { FormsModule } from '@angular/forms';
import { SubtasksService } from './services/subtasks.service';
import { AccountService } from './services/account.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
//import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, LoginComponent, FormsModule],
  providers: [LoginService, TasksService, SubtasksService, AccountService, UserService, AuthService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
