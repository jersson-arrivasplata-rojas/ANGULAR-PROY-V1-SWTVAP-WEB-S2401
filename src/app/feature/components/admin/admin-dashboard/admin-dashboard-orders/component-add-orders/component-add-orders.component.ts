import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'app-component-add-orders',
  templateUrl: './component-add-orders.component.html',
  styleUrls: ['./component-add-orders.component.scss'],
})
export class ComponentAddOrdersComponent {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.itemForm = this.formBuilder.group({
      code: ['', Validators.required],
      address: ['', Validators.required],
      subtotal: [''],
      subtotalUSD: [''],
      subtotalEUR: [''],
      taxes: [''],
      taxesUSD: [''],
      taxesEUR: [''],
      discountAmount: ['', Validators.required],
      total: [''],
      totalUSD: [''],
      totalEUR: [''],
      pickUp: [false, Validators.required],
      otherDetails: [''],
      status: [true, [Validators.required]]
    });
  }

  add() {
    if (this.itemForm.valid) {
      const item = { ...this.init(), ...this.itemForm.value };
      item.pickUp = Number(item.pickUp);
      item.status = Number(item.status);
      this.added.emit(item);
    }
  }

  init() {
    return {
      clientId: '',
      code: '',
      otherDate: CommonUtils.getDayNow(),
      address: '',
      subtotal: 0,
      subtotalUSD: 0,
      subtotalEUR: 0,
      taxes: 0,
      taxesUSD: 0,
      taxesEUR: 0,
      discountAmount: 0,
      total: 0,
      totalUSD: 0,
      totalEUR: 0,
      pickUp: false,
      otherDetails: '',
      status: true
    };
  }
}
