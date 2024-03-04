import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatternEnum } from 'src/app/shared/constants/patterns.const';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
import { AdminDashboardOrdersTransactionsPresenter } from '../admin-dashboard-orders-transactions.presenter';

@Component({
  selector: 'swtvap-component-add-orders-transactions',
  templateUrl: './component-add-orders-transactions.component.html',
  styleUrls: ['./component-add-orders-transactions.component.scss'],
  providers: [AdminDashboardOrdersTransactionsPresenter]
})
export class ComponentAddOrdersTransactionsComponent implements OnInit {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() orderId;

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private presenter: AdminDashboardOrdersTransactionsPresenter
  ) {
    this.itemForm = this.formBuilder.group({
      orderId: ['', Validators.required],
      paymentMethod: ['Transfer', Validators.required],
      typeCurrency: ['USD', Validators.required],
      amount: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      transactionDate: ['', [Validators.required, Validators.pattern(PatternEnum.DATE)]]
    });
    this.presenter.itemForm = this.itemForm;
  }

  ngOnInit(): void {
    this.itemForm.patchValue({orderId: this.orderId});
    this.presenter.handleForm();
  }

  add() {
    if (this.itemForm.valid) {
      const item = { ...this.init(), ...this.itemForm.value };
      this.added.emit(item);
    }
  }

  init() {
    return {
      orderId: this.orderId,
      paymentMethod: 'Transfer',
      typeCurrency: 'USD',
      amount: 0,
      transactionDate: CommonUtils.getDayNow()
    };
  }
}
