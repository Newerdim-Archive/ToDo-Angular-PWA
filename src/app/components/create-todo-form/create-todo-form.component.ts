import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Todo} from "../../../interfaces/todo";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {TodoService} from "../../services/todo.service";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-create-todo-form',
  templateUrl: './create-todo-form.component.html',
  styleUrls: ['./create-todo-form.component.scss']
})
export class CreateTodoFormComponent implements OnInit {
  @Output() createTodo = new EventEmitter<Todo>();

  faPlusCircle = faPlusCircle;

  isSubmitted = false;

  createTodoForm = this.formBuilder.group({
    todoName: ['', Validators.required]
  });

  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  create(): void {
    if (!this.createTodoForm.valid) {
      this.isSubmitted = true;
      return;
    }

    this.createTodo.emit({
      name: this.name.value,
      isCompleted: false
    });

    this.createTodoForm.reset();
  }

  get name(): AbstractControl {
    return this.createTodoForm.get('todoName') as AbstractControl;
  }
}
