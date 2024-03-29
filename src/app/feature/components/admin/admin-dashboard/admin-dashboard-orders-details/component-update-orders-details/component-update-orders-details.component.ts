import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatternEnum } from 'src/app/shared/constants/patterns.const';
import { OrderDetailsHttp } from 'src/app/shared/http/order-details.http';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
import { AdminDashboardOrdersDetailsPresenter } from '../admin-dashboard-orders-details.presenter';

@Component({
  selector: 'swtvap-component-update-orders-details',
  templateUrl: './component-update-orders-details.component.html',
  styleUrls: ['./component-update-orders-details.component.scss'],
  providers: [AdminDashboardOrdersDetailsPresenter]
})
export class ComponentUpdateOrdersDetailsComponent implements OnInit, OnChanges {
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};
  @Input() orderId;
  products: any[] = [];

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private orderDetailsHttp: OrderDetailsHttp,
    private presenter: AdminDashboardOrdersDetailsPresenter
  ) {
    this.itemForm = this.formBuilder.group({
      quantity: [0, [Validators.required, Validators.pattern(PatternEnum.NUMBER)]],
      unitPrice: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      unitPriceUSD: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      unitPriceEUR: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      subtotal: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      subtotalUSD: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      subtotalEUR: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      discountPercentage: [0, [Validators.required, Validators.pattern(PatternEnum.NUMBER)]],
      otherDetails: [''],
      status: [false, [Validators.required]]
    });
    this.presenter.itemForm = this.itemForm;
  }

  ngOnInit(): void {
    this.itemForm.patchValue({ orderId: this.orderId });
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
      const { order, product, ...data } = item;
      data.status = CommonUtils.fromStatusBoolean(data.status);
      this.orderDetailsHttp.update(item.orderDetailId, data).subscribe((response) => {
        const data = { ...order, ...response, order, product };
        this.updated.emit(data);
        (window as any).success("¡Actualizado!");
      });
    }
  }
}
