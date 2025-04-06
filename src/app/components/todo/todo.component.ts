import { Component, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { TodoBoardComponent } from '../todo-board/todo-board.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Todo } from '../../models/todo.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { RenameDialogComponent } from '../rename-dialog/rename-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from '../../services/theme.service';
import { CalendarViewComponent } from '../calendar-view/calendar-view.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    TodoBoardComponent,
    MatCheckboxModule,
    MatCardModule,
    MatTableModule,
    MatRadioModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    CalendarViewComponent
  ],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  todoService = inject(TodoService);
  dialog = inject(MatDialog);
  themeService = inject(ThemeService);
  
  todos = this.todoService.tasks;
  currentTheme = this.themeService.theme;
  
  dataSource = computed(() => new MatTableDataSource<Todo>(this.todos()));

  newTodo = '';
  displayedColumns: string[] = ['select', 'title', 'actions'];

  isListView = true;
  isBoardView = false;
  isCalendarView = false;
  
  // Track which row is being hovered
  hoveredRowId: number | null = null;

  setHoveredRow(id: number | null): void {
    this.hoveredRowId = id;
  }

  isRowHovered(id: number): boolean {
    return this.hoveredRowId === id;
  }

  toggleTheme(): void {
    const newTheme = this.currentTheme() === 'dark-theme' ? 'light-theme' : 'dark-theme';
    this.themeService.setTheme(newTheme);
  }

  listView() {
    this.isBoardView = false;
    this.isCalendarView = false;
    this.isListView = true;
  }

  boardview() {
    this.isBoardView = true;
    this.isCalendarView = false;
    this.isListView = false;
  }

  calendarview() {
    this.isCalendarView = true;
    this.isBoardView = false;
    this.isListView = false;
  }

  addTodo(): void {
    if (this.newTodo.trim()) {
      this.todoService.addTodo(this.newTodo.trim());
      this.newTodo = '';
    }
  }

  toggleTodo(id: number): void {
    this.todoService.toggleTodo(id);
  }

  renameTask(id: number): void {
    const todo = this.todos().find(t => t.id === id);
    if (!todo) return;

    const dialogRef = this.dialog.open(RenameDialogComponent, {
      width: '400px',
      data: { newTitle: todo.title },
      panelClass: this.currentTheme() === 'dark-theme' ? 'dark-theme-dialog' : 'light-theme-dialog'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.trim()) {
        this.todoService.renameTodo(id, result.trim());
      }
    });
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
  }
}