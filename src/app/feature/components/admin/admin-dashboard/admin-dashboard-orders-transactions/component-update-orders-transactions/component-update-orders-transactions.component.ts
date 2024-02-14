import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatternEnum } from 'src/app/shared/constants/patterns.const';
import { OrderTransactionsHttp } from 'src/app/shared/http/order-transactions.http';
import { AdminDashboardOrdersTransactionsPresenter } from '../admin-dashboard-orders-transactions.presenter';

@Component({
  selector: 'app-component-update-orders-transactions',
  templateUrl: './component-update-orders-transactions.component.html',
  styleUrls: ['./component-update-orders-transactions.component.scss'],
  providers: [AdminDashboardOrdersTransactionsPresenter]
})
export class ComponentUpdateOrdersTransactionsComponent implements OnInit, OnChanges {
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};
  @Input() ordersId;

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private orderTransactionsHttp: OrderTransactionsHttp,
    private presenter: AdminDashboardOrdersTransactionsPresenter
  ) {
    this.itemForm = this.formBuilder.group({
      ordersId: ['', Validators.required],
      paymentMethod: ['Transfer', Validators.required],
      typeCurrency: ['USD', Validators.required],
      amount: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      transactionDate: ['', [Validators.required, Validators.pattern(PatternEnum.DATE)]]
    });
    this.presenter.itemForm = this.itemForm;
  }

  ngOnInit(): void {
    this.itemForm.patchValue({ ordersId: this.ordersId });
    this.itemForm.patchValue(this.item);
    this.presenter.handleForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.itemForm.patchValue(this.item);
    }
  }

  update() {
    if (this.itemForm.valid) {
      const item = { ...this.item, ...this.itemForm.value };
      this.orderTransactionsHttp.update(item.orderTransactionId, item).subscribe((item) => {
        this.updated.emit(item);
      });
    }
  }
}
