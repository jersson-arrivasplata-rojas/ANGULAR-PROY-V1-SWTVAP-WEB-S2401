import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-component-add-clients',
  templateUrl: './component-add-clients.component.html',
  styleUrls: ['./component-add-clients.component.scss'],
})
export class ComponentAddClientsComponent {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      cellphone: ['', Validators.required],
      countryCode: ['', Validators.required],
      email: ['', Validators.required],
      whatsapp: [false, Validators.required],
      details: ['', Validators.required],
      otherDetails: [''],
      sourceAggregate: ['ADMINISTRATIVE_SYSTEM', Validators.required]
    });
  }

  add() {
    if (this.itemForm.valid) {
      const item = { ...this.init(), ...this.itemForm.value };
      item.whatsapp = Number(item.whatsapp);
      this.added.emit(item);
    }
  }

  init() {
    return {
      name: '',
      address: '',
      phone: '',
      cellphone: '',
      countryCode: '',
      email: '',
      whatsapp: false,
      details: '',
      otherDetails: '',
      sourceAggregate: 'ADMINISTRATIVE_SYSTEM'
    };
  }
}
