import { Routes } from '@angular/router';
import {TodoListPage} from './Pages/TodoListPage/TodoListPage';

export const routes: Routes = [
  {
    path: '',
    component: TodoListPage,
  },
  {
    path: ':id',
    component: TodoListPage
  }
];
