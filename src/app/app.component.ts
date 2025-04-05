import { Component,computed,signal,inject, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { TodoService } from './services/todo.service';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { ThemeService } from './services/theme.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ThemeToggleComponent],
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
// export class AppComponent {
//   title = 'todo-app';
//   constructor(private themeService: ThemeService) {
//   }
// }
export class AppComponent implements OnInit {
  private themeService = inject(ThemeService);
  currentTheme = this.themeService.theme;
  
  ngOnInit(): void {
    // Theme is already initialized in the service
  }
}
