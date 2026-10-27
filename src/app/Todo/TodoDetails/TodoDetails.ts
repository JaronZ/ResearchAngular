import {Component, inject, model} from '@angular/core';
import {TodoItem} from '../../TodoItem';
import {TODO_SERVICE} from '../../token';

@Component({
  selector: 'app-todo-details',
  styleUrl: './TodoDetails.css',
  templateUrl: './TodoDetails.html',
})
export class TodoDetails {
  todoService = inject(TODO_SERVICE);
  todo = model<TodoItem>();

  editName() {
    this.todo.update(todo => {
      if (!todo)
        return;

      const newName = prompt("Enter a name", todo.name)?.trim();

      if (!newName || todo.name == newName)
        return todo;

      this.todoService.updateTodo(todo.id, { ...todo, name: newName });
      return this.todoService.getTodo(todo.id) ?? undefined;
    });
  }
}
