import { Component, EventEmitter, Output,Input, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service'; // Import the service
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-task-modal',
  imports: [FormsModule,MatFormFieldModule,MatInputModule],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css'
})
export class TaskModalComponent {
  taskName = '';
  todoService = inject(TodoService);
  todos = this.todoService.tasks; // Directly using the signal
  
  @Input() selectedTheme: string = 'light-theme';
  @Output() closeModal = new EventEmitter<void>();

  // constructor(private todoService: TodoService) {}
  

  addTask() {
    if (this.taskName.trim()) {
      this.todoService.addTodo(this.taskName); // Call service method
      this.taskName = '';
      this.closeModal.emit(); // Close modal after adding task
    }
  }
}
