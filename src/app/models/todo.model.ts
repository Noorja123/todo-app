// export class Todo {
// }

export enum TaskStatus {
    TODO = 'To Do',
    IN_PROGRESS = 'In Progress',
    COMPLETED = 'Completed',
  }
  
  
  
  export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    status: TaskStatus;
  }