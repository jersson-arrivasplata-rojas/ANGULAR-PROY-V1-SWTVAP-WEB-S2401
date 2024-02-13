import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatternEnum } from 'src/app/shared/constants/patterns.const';
import { OrderHttp } from 'src/app/shared/http/orders.http';
import { AdminDashboardOrdersPresenter } from '../admin-dashboard-orders.presenter';

@Component({
  selector: 'app-component-update-orders',
  templateUrl: './component-update-orders.component.html',
  styleUrls: ['./component-update-orders.component.scss'],
  providers: [AdminDashboardOrdersPresenter]
})
export class ComponentUpdateOrdersComponent implements OnInit, OnChanges {
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private orderHttp: OrderHttp,
    private presenter: AdminDashboardOrdersPresenter
  ) {
    this.itemForm = this.formBuilder.group({
      code: ['', Validators.required],
      address: ['', Validators.required],
      subtotal: ['', [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      subtotalUSD: ['', [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      subtotalEUR: ['', [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      taxes: ['', [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      taxesUSD: ['', [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      taxesEUR: ['', [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      discountAmount: ['', [Validators.required, Validators.pattern(PatternEnum.NUMBER)]],
      total: ['', [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      totalUSD: ['', [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      totalEUR: ['', [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      pickUp: [false, Validators.required],
      otherDetails: [''],
      status: [true, [Validators.required]]
    });
    this.presenter.itemForm = this.itemForm;
  }

  ngOnInit(): void {
    this.itemForm.patchValue(this.item);
    this.presenter.handleForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.item.status = Boolean(this.item.status);
      this.item.pickUp = Boolean(this.item.pickUp);
      this.itemForm.patchValue(this.item);
    }
  }

  update() {
    if (this.itemForm.valid) {
      const item = { ...this.item, ...this.itemForm.value };
      item.status = Number(item.status);
      item.pickUp = Number(item.pickUp);
      this.orderHttp.update(item.orderId, item).subscribe((item) => {
        this.updated.emit(item);
      });
    }
  }
}
