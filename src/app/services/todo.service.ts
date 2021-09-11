import {Injectable} from '@angular/core';
import {NgxIndexedDBService} from "ngx-indexed-db";
import {Todo} from "../../interfaces/todo";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  storeName = "todos";

  constructor(private dbService: NgxIndexedDBService) {
  }

  /**
   * Get all todos
   *
   * @return All todos if exist; otherwise, empty array
   */
  getAll(): Observable<Todo[]> {
    return this.dbService
      .getAll<Todo>(this.storeName);
  }

  /**
   * Create new todo
   *
   * @param todo - New todo
   *
   * @return Newly created todo
   */
  create(todo: Todo): Observable<Todo> {
    return this.dbService
      .addItem<Todo>(this.storeName, todo);
  }

  /**
   * Delete todo
   *
   * @param todoId - Id of todo to delete
   *
   * @return True if deleted successfully; otherwise, false
   */
  delete(todoId: number): Observable<boolean> {
    return this.dbService
      .delete<Todo>(this.storeName, todoId)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  /**
   * Update todo
   *
   * @param todo - Updated todo
   *
   * @return Updated todo
   */
  update(todo: Todo): Observable<Todo> {
    return this.dbService
      .update<Todo>(this.storeName, todo)
      .pipe(
        map(todos => todos.find(x => x.id === todo.id) as Todo)
      );
  }
}
