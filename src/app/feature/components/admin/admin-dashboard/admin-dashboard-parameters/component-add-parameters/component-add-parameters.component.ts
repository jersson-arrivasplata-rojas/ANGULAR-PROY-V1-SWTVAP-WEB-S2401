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
      groupId: [''],
      description: ['', [Validators.required]],
      value: ['', Validators.required],
      value1: [''],
      value2: [''],
      code: [null, Validators.maxLength(50)],
      position: [null],
      status: [true, [Validators.required]]
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
      value1: '',
      value2: '',
      code: '',
      position: '',
      status: false
    };
  }
}
