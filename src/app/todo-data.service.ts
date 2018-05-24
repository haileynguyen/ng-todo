import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable()
export class TodoDataService {

  lastId: number = 0;
  todos: Todo[] = [];

  constructor() { }

  addTodo(todo: Todo): TodoDataService {
    if (!todo.id) {
      todo.id = this.lastId++;
    }
    this.todos.push(todo);
    return this;
  }

  deleteTodoById(todoId: number): TodoDataService {
    this.todos = this.todos.filter(todo => todo.id !== todoId);
    return this;
  }

  updateTodoById(todoId: number, value: Object = {}): Todo {
    let todo: Todo = this.getTodoById(todoId);
    if (!todo) {
      return null;
    }

    Object.assign(todo, value);
    return todo;
  }

  getTodoById(todoId: number): Todo {
    return this.todos.filter(todo => todo.id === todoId)
      .pop();
  }

  getAllTodos(): Todo[] {
    return this.todos;
  }

  toggleTodoComplete(todo: Todo) {
    let updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });

    return updatedTodo;
  }
}

