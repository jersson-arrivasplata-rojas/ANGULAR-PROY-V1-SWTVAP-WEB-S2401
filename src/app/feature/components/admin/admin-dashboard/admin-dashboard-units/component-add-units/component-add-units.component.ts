import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-component-add-units',
  templateUrl: './component-add-units.component.html',
  styleUrls: ['./component-add-units.component.scss'],
})
export class ComponentAddUnitsComponent {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.itemForm = this.formBuilder.group({
      unitName: ['', Validators.required],
      abbreviation: ['', Validators.required],
      conversionFactor: [''],
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
      unitName: '',
      abbreviation: '',
      conversionFactor: '',
      status: false
    };
  }
}
