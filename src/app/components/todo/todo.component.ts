import { Component } from '@angular/core';
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


@Component({
  selector: 'app-todo',
  standalone: true,  //  Ensure it's a standalone component
  imports: [FormsModule,
     CommonModule, 
     TodoBoardComponent, 
     MatCheckboxModule,
     MatCardModule, 
     MatTableModule,
     MatRadioModule,
     MatIconModule],  //  Import FormsModule here
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent{
  
  todos$;
  newTodo = '';
  displayedColumns: string[] = ['select', 'title', 'actions'];
  dataSource = new MatTableDataSource<Todo>([]);
  overlay: any;


  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.todos$;
    this.todoService.todos$.subscribe(todos => {
      this.dataSource.data = todos || []; // Ensure it's always an array
    });
  }
   ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // Flag to switch between views
  isListView = false;

  toggleView() {
    this.isListView = !this.isListView;
  }
//new
isBoardView: boolean = false;

listView() {
  this.isBoardView = false;
}

boardview(){
  this.isBoardView = true;
}
  addTodo(): void {
    if (this.newTodo.trim()) {
      this.todoService.addTodo(this.newTodo);
      this.newTodo = '';
    }
  }

  toggleTodo(id: number): void {
    this.todoService.toggleTodo(id);
  }
  renameTask(id: number) {
    const newTitle = prompt("Enter new task name:");
    if (newTitle && newTitle.trim()) {
      this.todoService.renameTodo(id, newTitle.trim());
    }
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
  }
  isModalOpen = false;
  newTaskName = '';
}