import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {TaskStatus} from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { NgFor , NgIf, AsyncPipe , NgClass} from '@angular/common'; // ✅ Import NgFor
import { map } from 'rxjs/operators';  // ✅ Import `map`
import { Observable } from 'rxjs';  // ✅ Import Observable
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-todo-board',
  templateUrl: './todo-board.component.html',
  imports: [TaskModalComponent,NgFor,NgClass,NgIf, AsyncPipe,MatFormFieldModule, MatSelectModule,MatDatepickerModule, MatNativeDateModule, MatInputModule, FormsModule],
  styleUrls: ['./todo-board.component.scss']
})
// @Component({
//   selector: 'select-no-ripple-example',
//   templateUrl: 'select-no-ripple-example.html',
//   imports: [MatFormFieldModule, MatSelectModule],
// })


export class TodoBoardComponent {
  newTodo = '';
  showModal: boolean = false;

  todos$; // Declare first

  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.todos$; // Initialize inside constructor
  }

  openModal() {
    this.showModal = true;
  }
  
  closeModal() {
    this.showModal = false;
  }
  
  addTodo(): void {
    if (this.newTodo.trim()) {
      this.todoService.addTodo(this.newTodo);
      this.newTodo = '';
    }
  }

  onOptionSelected(event: any, id: number): void {
    if (event.value === 'rename') {
      this.renameTask(id);
    } else if (event.value === 'delete') {
      this.todoService.deleteTodo(id);
    }
    // Reset selection to avoid unwanted re-triggers
    event.source.value = null;
  }
  renameTask(id: number) {
    const newTitle = prompt("Enter new task name:");
    if (newTitle && newTitle.trim()) {
      this.todoService.renameTodo(id, newTitle.trim());
    }
  }

    filterTasksByStatus(status: TaskStatus) {
      return this.todos$.pipe(
        map(todos => todos.filter(todo => todo.status === status))
      );
    }
  
  
  toggleTaskStatus(id: number) {
    this.todoService.toggleTodoStatus(id);
  }

  getStatusClass(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.TODO:
        return 'status-todo';
      case TaskStatus.IN_PROGRESS:
        return 'status-inprogress';
      case TaskStatus.COMPLETED:
        return 'status-completed';
      default:
        return '';
    }
  }
}
