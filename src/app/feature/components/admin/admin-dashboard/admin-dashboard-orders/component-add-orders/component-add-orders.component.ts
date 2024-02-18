import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatternEnum } from 'src/app/shared/constants/patterns.const';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
import { AdminDashboardOrdersPresenter } from '../admin-dashboard-orders.presenter';

@Component({
  selector: 'app-component-add-orders',
  templateUrl: './component-add-orders.component.html',
  styleUrls: ['./component-add-orders.component.scss'],
  providers: [AdminDashboardOrdersPresenter]
})
export class ComponentAddOrdersComponent implements OnInit {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private presenter: AdminDashboardOrdersPresenter
  ) {
    this.itemForm = this.formBuilder.group({
      code: ['', Validators.required],
      address: ['', Validators.required],
      subtotal: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      subtotalUSD: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      subtotalEUR: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      taxes: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      taxesUSD: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      taxesEUR: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      discountAmount: [0, [Validators.required, Validators.pattern(PatternEnum.NUMBER)]],
      total: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      totalUSD: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      totalEUR: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      pickUp: [false, Validators.required],
      otherDetails: [''],
      status: [true, [Validators.required]]
    });
    this.presenter.itemForm = this.itemForm;
  }

  ngOnInit(): void {
    this.presenter.handleForm();
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
      orderDate: CommonUtils.getDayNow(),
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
