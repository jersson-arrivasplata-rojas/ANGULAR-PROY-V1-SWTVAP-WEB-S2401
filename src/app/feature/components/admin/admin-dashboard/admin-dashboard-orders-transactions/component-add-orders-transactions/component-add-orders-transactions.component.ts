import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'app-component-add-orders-transactions',
  templateUrl: './component-add-orders-transactions.component.html',
  styleUrls: ['./component-add-orders-transactions.component.scss'],
})
export class ComponentAddOrdersTransactionsComponent implements OnInit {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() ordersId;

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.itemForm = this.formBuilder.group({
      ordersId: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      typeCurrency: ['', Validators.required],
      amount: ['', Validators.required],
      transactionDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.itemForm.patchValue({ordersId: this.ordersId});
  }

  add() {
    if (this.itemForm.valid) {
      const item = { ...this.init(), ...this.itemForm.value };
      this.added.emit(item);
    }
  }

  init() {
    return {
      ordersId: this.ordersId,
      paymentMethod: '',
      typeCurrency: '',
      amount: '',
      transactionDate: CommonUtils.getDayNow()
    };
  }
}
