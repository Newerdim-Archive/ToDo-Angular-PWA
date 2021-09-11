import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-editable-text',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.scss']
})
export class EditableTextComponent implements OnInit {
  @Input() text = '';
  @Output() changeText = new EventEmitter<string>();

  textInput = new FormControl('');

  isEdited = false;

  constructor() {
  }

  ngOnInit(): void {
    this.textInput.setValue(this.text);
  }

  enableEditing(): void {
    this.isEdited = true;
  }

  disableEditing(): void {
    this.isEdited = false;
  }

  save(): void {
    this.disableEditing();

    this.text = this.textInput.value;

    this.changeText.emit(this.text);
  }
}
