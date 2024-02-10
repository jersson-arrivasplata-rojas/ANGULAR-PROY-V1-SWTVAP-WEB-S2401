import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderTransactionsHttp } from 'src/app/shared/http/order-transactions.http';

@Component({
  selector: 'app-component-update-orders-transactions',
  templateUrl: './component-update-orders-transactions.component.html',
  styleUrls: ['./component-update-orders-transactions.component.scss'],
})
export class ComponentUpdateOrdersTransactionsComponent implements OnInit, OnChanges {
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};
  @Input() ordersId;

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private orderTransactionsHttp: OrderTransactionsHttp
  ) {
    this.itemForm = this.formBuilder.group({
      ordersId: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      amount: ['', Validators.required],
      transactionDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.itemForm.patchValue({ordersId: this.ordersId});
    this.itemForm.patchValue(this.item);
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
