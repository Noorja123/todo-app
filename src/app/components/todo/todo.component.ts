import { Component,inject,computed,Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import {TodoBoardComponent} from '../todo-board/todo-board.component';
import {MatCardModule} from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Todo } from '../../models/todo.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { RenameDialogComponent } from '../rename-dialog/rename-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-todo',
  imports: [FormsModule,
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
    MatToolbarModule,],
  templateUrl:'./todo.component.html',
  styleUrl: './todo.component.css'
})

export class TodoComponent {

  todoService = inject(TodoService);
  dialog = inject(MatDialog);
  
  todos = this.todoService.tasks; // Directly using the signal

   // Reactive data source for MatTable
   dataSource = computed(() => new MatTableDataSource<Todo>(this.todos()));

  newTodo = '';
  displayedColumns: string[] = ['select', 'title', 'actions'];

  isListView = false;
  isBoardView = false;
  isCalendarView = false;
  isModalOpen = false;
  newTaskName = '';
  currentView: 'list' | 'board' | 'calendar' = 'list'; // Initialize currentView

toggleView() {
  this.isListView = !this.isListView;
}

listView() {
  this.isBoardView = false;
  this.isCalendarView=false;
  this.isListView = true;
}

boardview() {
  this.isBoardView = true;
  this.isCalendarView=false;
  this.isListView = false;
}

calendarview() {
  this.isCalendarView = true;
  this.isBoardView = false;
  this.isListView = false;
}
switchToListView() {
  this.currentView = 'list';
}

switchToBoardView() {
  this.currentView = 'board';
}

switchToCalendarView() {
  this.currentView = 'calendar';
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
  const dialogRef = this.dialog.open(RenameDialogComponent, {
    width: '400px',
    data: { newTitle: '' },
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