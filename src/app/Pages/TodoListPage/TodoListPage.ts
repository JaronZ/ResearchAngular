import {Component, inject, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TodoDetails} from '../../Todo/TodoDetails/TodoDetails';
import {TodoList} from '../../Todo/TodoList/TodoList';
import {TodoItem} from '../../TodoItem';
import {TODO_SERVICE} from '../../token';
import {TodoJsonService} from '../../todo-json-service';

@Component({
  imports: [
    TodoDetails,
    TodoList
  ],
  styleUrl: './TodoListPage.css',
  templateUrl: './TodoListPage.html',
})
export class TodoListPage {
  private route = inject(ActivatedRoute);
  private todoService = inject(TODO_SERVICE);
  private readonly todoId: number | null;

  todos: WritableSignal<TodoItem[]>;
  selectedTodo: WritableSignal<TodoItem | undefined>;

  constructor() {
    this.todos = signal(this.todoService.getAllTodos());

    const readonlyTodos = this.todos.asReadonly();
    const todoId = this.route.snapshot.paramMap.get("id");

    if (!todoId) {
      this.todoId = readonlyTodos().map(todo => todo.id)?.[0];
    } else {
      this.todoId = Number(todoId);
    }

    this.selectedTodo = signal(this.todoId === null ? undefined : this.todoService.getTodo(this.todoId));
  }

  onTodosChange() {
    if (this.todoId == null)
      return;

    this.selectedTodo.update(() => this.todoId === null ? undefined : this.todoService.getTodo(this.todoId));
  }

  onTodoChange(changed?: TodoItem) {
    if (!changed)
      return;

    this.todos.update(() => this.todoService.getAllTodos());
  }
}
