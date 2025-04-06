import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskStatus, Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { RenameDialogComponent } from '../rename-dialog/rename-dialog.component';
import { DateSchedulerDialogComponent } from '../date-scheduler-dialog/date-scheduler-dialog.component';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {
  // Inject the TodoService
  todoService = inject(TodoService);
  dialog = inject(MatDialog);
  
  // Use signal for todos
  todos = this.todoService.tasks;
  
  // Current date signals
  currentDate = signal<Date>(new Date());
  currentMonth = computed(() => this.currentDate().getMonth());
  currentYear = computed(() => this.currentDate().getFullYear());
  
  // Calendar data
  weeks = signal<any[][]>([]);
  daysInMonth = computed(() => new Date(this.currentYear(), this.currentMonth() + 1, 0).getDate());
  firstDayOfMonth = computed(() => new Date(this.currentYear(), this.currentMonth(), 1).getDay());
  
  // New task properties
  newTodo = '';
  selectedDate = signal<Date | null>(null);
  
  ngOnInit() {
    this.generateCalendar();
  }
  
  // Generate the calendar grid based on current month/year
  generateCalendar() {
    const daysInMonth = this.daysInMonth();
    const firstDayOfMonth = this.firstDayOfMonth();
    
    let date = 1;
    const calendar: any[][] = [];
    
    // Create weeks
    for (let i = 0; i < 6; i++) {
      const week: any[] = [];
      
      // Create days in a week
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          // Empty cells before the start of the month
          week.push({ date: null, tasks: [] });
        } else if (date > daysInMonth) {
          // Empty cells after the end of the month
          week.push({ date: null, tasks: [] });
        } else {
          // Valid date cells with associated tasks
          const currentDate = new Date(this.currentYear(), this.currentMonth(), date);
          const tasksForDay = this.getTasksForDate(currentDate);
          week.push({ 
            date, 
            tasks: tasksForDay,
            isToday: this.isToday(date)
          });
          date++;
        }
      }
      
      calendar.push(week);
      
      // Stop if we've reached the end of the month
      if (date > daysInMonth) {
        break;
      }
    }
    
    this.weeks.set(calendar);
  }
  
  // Check if a date is today
  isToday(date: number): boolean {
    const today = new Date();
    return date === today.getDate() && 
           this.currentMonth() === today.getMonth() && 
           this.currentYear() === today.getFullYear();
  }
  
  // Get tasks for a specific date
  getTasksForDate(date: Date): Todo[] {
    return this.todos().filter(todo => {
      if (!todo.dueDate) return false;
      
      const todoDate = new Date(todo.dueDate);
      return todoDate.getDate() === date.getDate() && 
             todoDate.getMonth() === date.getMonth() && 
             todoDate.getFullYear() === date.getFullYear();
    });
  }
  
  // Navigation methods
  previousMonth() {
    const newDate = new Date(this.currentYear(), this.currentMonth() - 1, 1);
    this.currentDate.set(newDate);
    this.generateCalendar();
  }
  
  nextMonth() {
    const newDate = new Date(this.currentYear(), this.currentMonth() + 1, 1);
    this.currentDate.set(newDate);
    this.generateCalendar();
  }
  
  // Task management
  selectDate(date: number) {
    if (date) {
      this.selectedDate.set(new Date(this.currentYear(), this.currentMonth(), date));
      this.openAddTaskDialog();
    } else {
      this.selectedDate.set(null);
    }
  }
  
  openAddTaskDialog(): void {
    if (!this.selectedDate()) return;
    
    // Open dialog for adding task on selected date
    const dialogRef = this.dialog.open(DateSchedulerDialogComponent, {
      width: '400px',
      data: { currentDate: this.selectedDate() }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && this.newTodo.trim()) {
        // Add task with selected date
        this.todoService.addTodo(this.newTodo);
        const newTaskId = this.todos()[this.todos().length - 1].id;
        this.todoService.scheduleTodo(newTaskId, result);
        this.newTodo = '';
        this.generateCalendar();
      }
    });
  }
  
  addTodo(): void {
    if (this.newTodo.trim()) {
      this.todoService.addTodo(this.newTodo);
      if (this.selectedDate()) {
        const newTaskId = this.todos()[this.todos().length - 1].id;
        this.todoService.scheduleTodo(newTaskId, this.selectedDate());
      }
      this.newTodo = '';
      this.generateCalendar(); // Refresh calendar
    }
  }
  
  toggleTaskStatus(id: number) {
    this.todoService.toggleTodoStatus(id);
    this.generateCalendar(); // Refresh calendar
  }
  
  scheduleTask(id: number): void {
    const dialogRef = this.dialog.open(DateSchedulerDialogComponent, {
      width: '300px',
      data: { currentDate: this.todos().find(t => t.id === id)?.dueDate || null }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.todoService.scheduleTodo(id, result);
        this.generateCalendar(); // Refresh calendar
      }
    });
  }
  
  deleteTask(id: number) {
    this.todoService.deleteTodo(id);
    this.generateCalendar(); // Refresh calendar
  }
  
  // Helper to get task status class
  getStatusClass(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.TODO:
        return 'todo-task';
      case TaskStatus.IN_PROGRESS:
        return 'in-progress-task';
      case TaskStatus.COMPLETED:
        return 'completed-task';
      default:
        return '';
    }
  }
  
  // Get the month name
  get monthName(): string {
    return new Date(this.currentYear(), this.currentMonth(), 1)
      .toLocaleString('default', { month: 'long' });
  }
}