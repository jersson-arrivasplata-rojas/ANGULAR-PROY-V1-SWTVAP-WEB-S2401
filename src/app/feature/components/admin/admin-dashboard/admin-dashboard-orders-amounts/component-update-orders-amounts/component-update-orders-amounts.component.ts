import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatternEnum } from 'src/app/shared/constants/patterns.const';
import { OrderAmountsHttp } from 'src/app/shared/http/order-amounts.http';
import { AdminDashboardOrdersAmountsPresenter } from '../admin-dashboard-orders-amounts.presenter';

@Component({
  selector: 'app-component-update-orders-amounts',
  templateUrl: './component-update-orders-amounts.component.html',
  styleUrls: ['./component-update-orders-amounts.component.scss'],
  providers: [AdminDashboardOrdersAmountsPresenter],
})
export class ComponentUpdateOrdersAmountsComponent implements OnInit, OnChanges {
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};
  @Input() orderId;

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private orderAmountsHttp: OrderAmountsHttp,
    private presenter: AdminDashboardOrdersAmountsPresenter
  ) {
    this.itemForm = this.formBuilder.group({
      orderId: ['', Validators.required],
      name: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      amountUSD: ['', [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      amountEUR: ['', [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      otherDetails: ['']
    });
    this.presenter.itemForm = this.itemForm;
  }

  ngOnInit(): void {
    this.itemForm.patchValue({orderId: this.orderId});
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
      this.orderAmountsHttp.update(item.orderAmountId, item).subscribe((item) => {
        this.updated.emit(item);
      });
    }
  }
}
