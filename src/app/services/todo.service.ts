import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskStatus, Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosSubject = new BehaviorSubject<Todo[]>(this.loadTodos());
  todos$ = this.todosSubject.asObservable();

  constructor() {}

  // private loadTodos(): Todo[] {
  //   const todos = localStorage.getItem('todos');
  //   return todos ? JSON.parse(todos) : [];
  // }

  private loadTodos(): Todo[] {
    const todos = localStorage.getItem('todos');
    if (!todos) return [];
  
    return JSON.parse(todos).map((todo: any) => ({
      ...todo,
      status: todo.status as TaskStatus,  // Ensure proper TaskStatus enum mapping
    }));
  }


  private saveTodos(todos: Todo[]): void {
    localStorage.setItem('todos', JSON.stringify(todos));
    this.todosSubject.next(todos);
  }

  addTodo(title: string): void {
    const todos = this.todosSubject.getValue();
    const newTodo: Todo = { id: Date.now(), title, completed: false, status:TaskStatus.TODO };
    this.saveTodos([...todos, newTodo]);
  }

  renameTodo(id: number, newTitle: string): void {
    const todos = this.todosSubject.getValue().map(todo =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );
    this.saveTodos(todos);
  }
  
  toggleTodo(id: number): void {
    const todos = this.todosSubject.getValue().map(todo =>
      // todo.id === id ? { ...todo, status: TaskStatus.COMPLETED } : todo
      todo.id === id
      ? { ...todo, status: todo.status === TaskStatus.TODO ? TaskStatus.COMPLETED : TaskStatus.TODO }
      : todo

    );
    this.saveTodos(todos);
  }

  deleteTodo(id: number): void {
    const todos = this.todosSubject.getValue().filter(todo => todo.id !== id);
    this.saveTodos(todos);
  }
  toggleTodoStatus(id: number): void {
    const todos = this.todosSubject.getValue().map(todo => {
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
    });
  
    this.saveTodos(todos);
  }
  
  
}
