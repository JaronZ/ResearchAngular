import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {TODO_SERVICE} from './token';
import {TodoJsonService} from './todo-json-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: TODO_SERVICE, useClass: TodoJsonService }
  ]
};
