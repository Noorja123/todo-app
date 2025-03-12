import { Component, EventEmitter, Output,Input } from '@angular/core';
import { TodoService } from '../../services/todo.service'; // Import the service
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
// import { TaskModalComponent } from './task-modal.component';

// @NgModule({
//   declarations: [TaskModalComponent],
//   imports: [CommonModule],
//   exports: [TaskModalComponent]
// })
// export class TaskModalModule { }

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [FormsModule], // ✅ Add FormsModule here
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent {
  taskName = '';
  
  @Input() selectedTheme: string = 'light-theme';
  @Output() closeModal = new EventEmitter<void>();

  constructor(private todoService: TodoService) {}

  addTask() {
    if (this.taskName.trim()) {
      this.todoService.addTodo(this.taskName); // Call service method
      this.taskName = '';
      this.closeModal.emit(); // Close modal after adding task

      
    }
  }
}