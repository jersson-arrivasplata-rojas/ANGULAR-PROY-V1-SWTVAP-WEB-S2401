import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-component-add-catalogs',
  templateUrl: './component-add-catalogs.component.html',
  styleUrls: ['./component-add-catalogs.component.scss'],
})
export class ComponentAddCatalogsComponent {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
      status: [false, [Validators.required]]
    });
  }

  add() {
    if (this.itemForm.valid) {
      const data = { ...this.init(), ...this.itemForm.value };
      data.status = Number(data.status);
      this.added.emit(data);
    }
  }
  
  init() {
    return {
      name: '',
      code: '',
      description: '',
      status: false
    };
  }
}
