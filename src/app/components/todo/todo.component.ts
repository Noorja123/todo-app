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

@Component({
  selector: 'app-todo',
  imports: [FormsModule,
    CommonModule,
    TodoBoardComponent,
    MatCheckboxModule,
    MatCardModule,
    MatTableModule,
    MatRadioModule,
    MatIconModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})

export class TodoComponent {
  // todos$;
  // newTodo = '';

  todoService = inject(TodoService);
  dialog = inject(MatDialog);
  
  todos = this.todoService.tasks; // Directly using the signal

   // Reactive data source for MatTable
   dataSource = computed(() => new MatTableDataSource<Todo>(this.todos()));
  
  // displayedColumns: string[] = ['select', 'title', 'actions'];
  // dataSource = new MatTableDataSource<Todo>([]);
  // overlay: any;

  newTodo = '';
  displayedColumns: string[] = ['select', 'title', 'actions'];

  // constructor(private todoService: TodoService, private dialog: MatDialog) {
  //  this.todos$ = this.todoService.todos$;
  //   this.todoService.todos$.subscribe(todos => {
  //     this.dataSource.data = todos || []; // Ensure it's always an array
  //   });
  // }

  // taskService = inject(TodoService);
  // tasks = this.taskService.tasks;

  
  // Flag to switch between views
  // isListView = false;


  isListView = false;
  isBoardView = false;
  isModalOpen = false;
  newTaskName = '';

//   toggleView() {
//     this.isListView = !this.isListView;
//   }
// //new
// isBoardView: boolean = false;

// listView() {
//   this.isBoardView = false;
// }

// boardview(){
//   this.isBoardView = true;
// }
//   addTodo(): void {
//     if (this.newTodo.trim()) {
//       this.todoService.addTodo(this.newTodo);
//       this.newTodo = '';
//     }
//   }

//   toggleTodo(id: number): void {
//     this.todoService.toggleTodo(id);
//   }

//   renameTask(id: number): void {
//     const dialogRef = this.dialog.open(RenameDialogComponent, {
//       width: '400px',
//       data: { newTitle: '' }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result && result.trim()) {
//         this.todoService.renameTodo(id, result.trim());
//       }
//     });
//   }

//   deleteTodo(id: number): void {
//     this.todoService.deleteTodo(id);
//   }
//   isModalOpen = false;
//   newTaskName = '';

// }

toggleView() {
  this.isListView = !this.isListView;
}

listView() {
  this.isBoardView = false;
}

boardview() {
  this.isBoardView = true;
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

