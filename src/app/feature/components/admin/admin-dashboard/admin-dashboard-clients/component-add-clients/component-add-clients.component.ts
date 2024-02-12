import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatternEnum } from 'src/app/shared/constants/patterns.const';

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
      phone: ['', [Validators.required, Validators.pattern(PatternEnum.NUMBER)]],
      cellphone: ['', [Validators.required, Validators.pattern(PatternEnum.NUMBER)]],
      countryCode: ['', [Validators.required, Validators.pattern(PatternEnum.NUMBER_PLUS)]],
      email: ['', [Validators.required, Validators.email]],
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
