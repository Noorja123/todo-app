import { effect, Injectable, signal } from '@angular/core';
import { TaskStatus, Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  tasks = signal<Todo[]>(this.loadTodos());
  private delay = 1000; // Delay in milliseconds

  constructor() {
    // Effect to auto-save todos whenever tasks update
    effect(() => this.saveTodos(this.tasks()));
  }

  // Load todos from localStorage
  private loadTodos(): Todo[] {
    const todos = localStorage.getItem('todos');
    if (!todos) return [];

    return JSON.parse(todos).map((todo: any) => ({
      ...todo,
      status: todo.status as TaskStatus,
      // Parse date strings back to Date objects
      dueDate: todo.dueDate ? new Date(todo.dueDate) : null
    }));
  }

  // Save todos to localStorage
  private saveTodos(todos: Todo[]): void {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  // Add a new todo
  addTodo(title: string): void {
    this.tasks.update(todos => [
      ...todos,
      { id: Date.now(), title, completed: false, status: TaskStatus.TODO, dueDate: null }
    ]);
  }

  // Rename a todo
  renameTodo(id: number, newTitle: string): void {
    this.tasks.update(todos =>
      todos.map(todo => (todo.id === id ? { ...todo, title: newTitle } : todo))
    );
  }

  // Schedule a todo
  scheduleTodo(id: number, dueDate: Date | null): void {
    this.tasks.update(todos =>
      todos.map(todo => (todo.id === id ? { ...todo, dueDate } : todo))
    );
  }

  // Toggle todo completion status
  toggleTodo(id: number): void {
    this.tasks.update(todos =>
      todos.map(todo =>
        todo.id === id
          ? { ...todo, status: todo.status === TaskStatus.TODO ? TaskStatus.COMPLETED : TaskStatus.TODO }
          : todo
      )
    );
  }

  // Delete a todo
  deleteTodo(id: number): void {
    this.tasks.update(todos => todos.filter(todo => todo.id !== id));
  }

  // Cycle through task statuses
  toggleTodoStatus(id: number): void {
    this.tasks.update(todos =>
      todos.map(todo => {
        if (todo.id === id) {
          let newStatus: TaskStatus;
          switch (todo.status) {
            case TaskStatus.TODO:
              newStatus = TaskStatus.IN_PROGRESS;
              break;
            case TaskStatus.IN_PROGRESS:
              newStatus = TaskStatus.COMPLETED;
              break;
            case TaskStatus.COMPLETED:
              newStatus = TaskStatus.TODO;
              break;
            default:
              newStatus = TaskStatus.TODO;
          }
          return { ...todo, status: newStatus };
        }
        return todo;
      })
    );
  }
}