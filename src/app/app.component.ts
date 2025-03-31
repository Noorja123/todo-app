import { Component,computed,signal,inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { TodoService } from './services/todo.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl:'./app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-app';

}
  
