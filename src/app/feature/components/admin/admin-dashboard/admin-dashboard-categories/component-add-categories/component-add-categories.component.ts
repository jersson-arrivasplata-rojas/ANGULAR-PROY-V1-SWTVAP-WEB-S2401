import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-component-add-categories',
  templateUrl: './component-add-categories.component.html',
  styleUrls: ['./component-add-categories.component.scss'],
})
export class ComponentAddCategoriesComponent {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.itemForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      description: [null],
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
      name: '',
      description: '',
      status: false
    };
  }
}
