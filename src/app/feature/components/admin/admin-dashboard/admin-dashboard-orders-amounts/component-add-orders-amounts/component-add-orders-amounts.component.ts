import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatternEnum } from 'src/app/shared/constants/patterns.const';
import { AdminDashboardOrdersAmountsPresenter } from '../admin-dashboard-orders-amounts.presenter';

@Component({
  selector: 'app-component-add-orders-amounts',
  templateUrl: './component-add-orders-amounts.component.html',
  styleUrls: ['./component-add-orders-amounts.component.scss'],
  providers: [AdminDashboardOrdersAmountsPresenter],
})
export class ComponentAddOrdersAmountsComponent implements OnInit {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() orderId;

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private presenter: AdminDashboardOrdersAmountsPresenter
  ) {
    this.itemForm = this.formBuilder.group({
      orderId: ['', Validators.required],
      name: ['', Validators.required],
      amount: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      amountUSD: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      amountEUR: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      otherDetails: ['']
    });
    this.presenter.itemForm = this.itemForm;
  }

  ngOnInit(): void {
    this.itemForm.patchValue({ orderId: this.orderId });
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
      name: '',
      amount: 0,
      amountUSD: 0,
      amountEUR: 0,
      otherDetails: ''
    };
  }
}
