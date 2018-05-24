import { TestBed, inject } from '@angular/core/testing';

import { TodoDataService } from './todo-data.service';
import { Todo } from './todo';

describe('TodoDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoDataService]
    });
  });

  it('should be created', inject([TodoDataService], (service: TodoDataService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getAllTodos()', () => {
    it('should return an empty array by default', inject([TodoDataService],
      (service: TodoDataService) => {
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should return all todos', inject([TodoDataService],
      (service: TodoDataService) => {
      let todo1 = new Todo({title: 'Task 1', complete: true});
      let todo2 = new Todo({title: 'Task 2', complete: false});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      }
    ));

    it('should delete todo has id: 1', inject([TodoDataService],
      (service: TodoDataService) => {
        let todo1 = new Todo({title: 'Task 1', complete: true});
        let todo2 = new Todo({title: 'Task 2', complete: false});
        service.addTodo(todo1);
        service.addTodo(todo2);
        expect(service.getAllTodos()).toEqual([todo1, todo2]);
        service.deleteTodoById(todo1.id);
        expect(service.getAllTodos()).toEqual([todo2]);
      }
    ));

    it('should can not delete a todo which does not exist in array', inject([TodoDataService],
      (service: TodoDataService) => {
        let todo1 = new Todo({title: 'Task 1', complete: true});
        let todo2 = new Todo({title: 'Task 2', complete: false});
        service.addTodo(todo1);
        service.addTodo(todo2);
        expect(service.getAllTodos()).toEqual([todo1, todo2]);
        service.deleteTodoById(3);
        expect(service.getAllTodos()).toEqual([todo1, todo2]);
      }
    ));

    it('should update corresponding todo', inject([TodoDataService],
      (service: TodoDataService) => {
        let todo1 = new Todo({title: 'Task 1', complete: true});
        let todo2 = new Todo({title: 'Task 2', complete: false});
        service.addTodo(todo1);
        service.addTodo(todo2);
        service.updateTodoById(1, {title: 'Task 1 Edited'});
        expect(service.getTodoById(1).title).toEqual('Task 1 Edited');
      }
    ));

    it('should return null if todo is not found', inject([TodoDataService],
      (service: TodoDataService) => {
        let todo1 = new Todo({title: 'Task 1', complete: true});
        let todo2 = new Todo({title: 'Task 2', complete: false});
        service.addTodo(todo1);
        let updatedTodo = service.updateTodoById(1, {title: 'Task 1 Edited'});
        expect(updatedTodo).toEqual(null);
      }
    ));

    it('should toggle value of complete', inject([TodoDataService],
      (service: TodoDataService) => {
        let todo1 = new Todo({title: 'Task 1', complete: true});
        service.addTodo(todo1);
        let updatedTodo = service.toggleTodoComplete(todo1);
        expect(updatedTodo.complete).toEqual(false);
      }
    ));
  });


});
