import {Component, inject, model} from '@angular/core';
import {TodoItem} from '../../TodoItem';
import {TODO_SERVICE} from '../../token';

@Component({
  selector: 'app-todo-list',
  styleUrl: './TodoList.css',
  templateUrl: './TodoList.html'
})
export class TodoList {
  todoService = inject(TODO_SERVICE);
  todos = model.required<TodoItem[]>();

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
    this.todos.update(() => this.todoService.getAllTodos());
  }

  createTodo() {
    this.todoService.addTodo(new TodoItem(-1, "Unnamed"));
    this.todos.update(() => this.todoService.getAllTodos());
  }
}
