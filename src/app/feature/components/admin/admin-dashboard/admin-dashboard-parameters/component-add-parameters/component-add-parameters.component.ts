import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-component-add-parameters',
  templateUrl: './component-add-parameters.component.html',
  styleUrls: ['./component-add-parameters.component.scss'],
})
export class ComponentAddParametersComponent {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.itemForm = this.formBuilder.group({
      parentId: [null],
      groupId: ['', Validators.required],
      description: ['', Validators.required],
      value: ['', Validators.required],
      code: [null],
      position: [null],
      status: [false, [Validators.required]]
    });
  }

  add() {
    if (this.itemForm.valid) {
      const item = { ...this.init(), ...this.itemForm.value };
      item.status = Number(item.status);
      this.added.emit(item);
    }
  }

  init() {
    return {
      parentId: '',
      groupId: '',
      description: '',
      value: '',
      code: '',
      position: '',
      status: false
    };
  }
}