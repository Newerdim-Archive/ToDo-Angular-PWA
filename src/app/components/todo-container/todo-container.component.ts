import {Component, OnInit} from '@angular/core';
import {Todo} from "../../../interfaces/todo";
import {TodoService} from "../../services/todo.service";

import "../../prototypes/array-prototype";

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss']
})
export class TodoContainerComponent implements OnInit {

  todos: Todo[] = [];

  completedTodos: Todo[] = [];
  uncompletedTodos: Todo[] = [];

  constructor(
    private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.todoService
      .getAll()
      .subscribe(todos => {
        this.todos = todos;
        this.sortTodos();
      });
  }

  deleteTodo(todoId: number): void {
    this.todoService
      .delete(todoId)
      .subscribe(isDeleted => {
        if (isDeleted) {
          this.todos = this.todos.delete(todo => todo.id === todoId);
          this.sortTodos();
        }
      });
  }

  updateTodo(todo: Todo): void {
    this.todoService
      .update(todo)
      .subscribe(updatedTodo => {
        this.todos = this.todos.replace(x => x.id === updatedTodo.id, updatedTodo);
        this.sortTodos();
      });
  }

  createTodo(todo: Todo): void {
    this.todoService
      .create(todo)
      .subscribe(addedTodo => {
        this.todos = [...this.todos, addedTodo];
        this.sortTodos();
      });
  }

  sortTodos(): void {
    this.todos = this.todos.sort((a, b) => {
      if (!a.id) {
        return -1;
      }

      if (!b.id) {
        return 1;
      }

      return b.id - a.id;
    });

    this.completedTodos = this.todos.filter(x => x.isCompleted);
    this.uncompletedTodos = this.todos.filter(x => !x.isCompleted);
  }
}
