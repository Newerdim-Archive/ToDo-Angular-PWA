import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from "../../../interfaces/todo";
import {faTimes, faSquare, faCheckSquare} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() deleteTodo = new EventEmitter<number>();
  @Output() updateTodo = new EventEmitter<Todo>();

  faTimes = faTimes;
  faSquare = faSquare;
  faCheckSquare = faCheckSquare;

  constructor() {
  }

  ngOnInit(): void {
  }

  delete() {
    this.deleteTodo.emit(this.todo.id);
  }

  completed() {
    this.todo.isCompleted = !this.todo.isCompleted;
    this.updateTodo.emit(this.todo);
  }

  updateName(name: string): void {
    this.todo.name = name;

    this.updateTodo.emit(this.todo);
  }
}
