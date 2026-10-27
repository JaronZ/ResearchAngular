import { Service } from '@angular/core';
import {TodoItem} from './TodoItem';
import {TodoService} from './todo-service.interface';

@Service()
export class TodoStore implements TodoService {
  private todos: TodoItem[] = [
    new TodoItem(1, "Clean room", "I need to clean my room before my friends arrive"),
    new TodoItem(2, "Do the dishes"),
    new TodoItem(3, "Cook food")
  ];

  addTodo(item: TodoItem): number {
    const lastId = this.todos.map(item => item.id).sort((a, b) => b - a)?.[0] ?? 0;
    this.todos.push(new TodoItem(lastId + 1, item.name, item.description));
    return lastId + 1;
  }

  deleteTodo(id: number): boolean {
    const index = this.todos.findIndex(item => item.id === id);
    if (index === -1)
      return false;

    this.todos.splice(index, 1);
    return true;
  }

  updateTodo(id: number, item: TodoItem): boolean {
    const index = this.todos.findIndex(item => item.id === id);
    if (index === -1)
      return false;

    this.todos[index] = {...item, id};
    return true;
  }

  getAllTodos(): TodoItem[] {
    return [...this.todos].sort((a, b) => a.id - b.id);
  }

  getTodo(id: number): TodoItem | undefined {
    return this.todos.find(item => item.id === id);
  }
}
