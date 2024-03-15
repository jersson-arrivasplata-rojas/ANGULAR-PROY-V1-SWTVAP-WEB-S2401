import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'swtvap-component-add-catalogs',
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
      name: ['', [Validators.required, Validators.maxLength(200)]],
      name_en: [''],
      code: ['', [Validators.required, Validators.maxLength(50)]],
      description: [null],
      description_en: [null],
      lang: ['ES', [Validators.required]],
      status: ['ACTIVE', [Validators.required]]
    });
  }

  add() {
    if (this.itemForm.valid) {
      const item = { ...this.init(), ...this.itemForm.value };
      this.added.emit(item);
    }
  }

  init() {
    return {
      name: '',
      name_en: '',
      code: '',
      description: '',
      description_en: '',
      lang: 'ES',
      status: 'ACTIVE'
    };
  }
}
