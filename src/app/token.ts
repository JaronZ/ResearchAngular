import {InjectionToken} from "@angular/core";
import {TodoService} from './todo-service.interface';

export const TODO_SERVICE = new InjectionToken<TodoService>("TodoService");
