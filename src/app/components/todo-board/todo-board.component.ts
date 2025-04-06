import { Component, EventEmitter, Output, ViewEncapsulation, computed, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskStatus, Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { NgFor } from '@angular/common'; 
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RenameDialogComponent } from '../rename-dialog/rename-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../services/theme.service';
import { DateSchedulerDialogComponent } from '../date-scheduler-dialog/date-scheduler-dialog.component';

@Component({
  selector: 'app-todo-board',
  imports: [
    NgFor,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './todo-board.component.html',
  styleUrl: './todo-board.component.css',
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class TodoBoardComponent {
  @Output() addTask = new EventEmitter<void>();
  @ViewChild('datepicker') datepicker!: MatDatepicker<Date>;

  // Inject services
  todoService = inject(TodoService);
  dialog = inject(MatDialog);

  // Use signals instead of observables
  todos = this.todoService.tasks;

  themeService = inject(ThemeService);
  currentTheme = this.themeService.theme;

  newTodo = '';
  showModal = false;
  selectedTaskId: number | null = null;

  // Computed signals to filter tasks dynamically
  todosTodo = computed(() => this.todos().filter(todo => todo.status === TaskStatus.TODO));
  todosInProgress = computed(() => this.todos().filter(todo => todo.status === TaskStatus.IN_PROGRESS));
  todosCompleted = computed(() => this.todos().filter(todo => todo.status === TaskStatus.COMPLETED));

  addTodo(): void {
    if (this.newTodo.trim()) {
      this.todoService.addTodo(this.newTodo);
      this.newTodo = '';
    }
  }

  dataSource = computed(() => new MatTableDataSource<Todo>(this.todos()));

  onOptionSelected(event: any, id: number): void {
    if (event.value === 'rename') {
      this.renameTask(id);
    } else if (event.value === 'delete') {
      this.todoService.deleteTodo(id);
    } else if (event.value === 'schedule') {
      this.openDateSchedulerDialog(id);
    }
    event.source.value = null;
  }

  renameTask(id: number): void {
    const dialogRef = this.dialog.open(RenameDialogComponent, {
      width: '400px',
      data: { newTitle: '' },
      panelClass: this.currentTheme() === 'dark-theme' ? 'dark-theme-dialog' : 'light-theme-dialog'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.trim()) {
        this.todoService.renameTodo(id, result.trim());
      }
    });
  }

  openDateSchedulerDialog(id: number): void {
    const task = this.todos().find(t => t.id === id);
    if (!task) return;

    const dialogRef = this.dialog.open(DateSchedulerDialogComponent, {
      width: '400px',
      data: { currentDate: task.dueDate },
      panelClass: this.currentTheme() === 'dark-theme' ? 'dark-theme-dialog' : 'light-theme-dialog'
    });

    dialogRef.afterClosed().subscribe((result: Date | null) => {
      if (result !== undefined) {
        this.todoService.scheduleTodo(id, result);
      }
    });
  }

  openDatePicker(id: number): void {
    this.selectedTaskId = id;
    
    // Open a dialog with just a date picker
    const dialogRef = this.dialog.open(DateSchedulerDialogComponent, {
      width: '300px',
      data: { 
        currentDate: this.todos().find(t => t.id === id)?.dueDate || null 
      },
      panelClass: this.currentTheme() === 'dark-theme' ? 'dark-theme-dialog' : 'light-theme-dialog'
    });

    dialogRef.afterClosed().subscribe((result: Date | null) => {
      if (result !== undefined) {
        this.todoService.scheduleTodo(id, result);
      }
    });
  }

  onDatePickerClosed(): void {
    this.selectedTaskId = null;
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