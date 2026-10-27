import {TodoItem} from './TodoItem';

export interface TodoService {
  addTodo(item: TodoItem): number;
  deleteTodo(id: number): boolean;
  updateTodo(id: number, item: TodoItem): boolean;
  getAllTodos(): TodoItem[];
  getTodo(id: number): TodoItem | undefined;
}
