import {Service} from '@angular/core';
import {TodoService} from './todo-service.interface';
import {TodoItem} from "./TodoItem";

@Service()
export class TodoJsonService implements TodoService {
  private readonly todos: TodoItem[];

  constructor() {
    const todosJson = localStorage.getItem("todos");

    if (!todosJson) {
      this.todos = [];
      this.saveTodos();
      return;
    }

    const todos = JSON.parse(todosJson) as Record<string, any>[];
    this.todos = todos.map(todo => new TodoItem(todo["id"], todo["name"], todo?.["description"]));
  }

  addTodo(item: TodoItem): number {
    const lastId = this.todos.map(item => item.id).sort((a, b) => b - a)?.[0] ?? 0;
    this.todos.push(new TodoItem(lastId + 1, item.name, item.description));
    this.saveTodos();
    return lastId + 1;
  }

  deleteTodo(id: number): boolean {
    const index = this.todos.findIndex(item => item.id === id);
    if (index === -1)
      return false;

    this.todos.splice(index, 1);
    this.saveTodos();
    return true;
  }

  updateTodo(id: number, item: TodoItem): boolean {
    const index = this.todos.findIndex(item => item.id === id);
    if (index === -1)
      return false;

    this.todos[index] = {...item, id};
    this.saveTodos();
    return true;
  }

  getAllTodos(): TodoItem[] {
    return [...this.todos].sort((a, b) => a.id - b.id);
  }

  getTodo(id: number): TodoItem | undefined {
    return this.todos.find(item => item.id === id);
  }

  private saveTodos() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
}
