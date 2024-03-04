import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatternEnum } from 'src/app/shared/constants/patterns.const';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
import { AdminDashboardOrdersDispatchesPresenter } from '../admin-dashboard-orders-dispatches.presenter';

@Component({
  selector: 'swtvap-component-add-orders-dispatches',
  templateUrl: './component-add-orders-dispatches.component.html',
  styleUrls: ['./component-add-orders-dispatches.component.scss'],
  providers: [AdminDashboardOrdersDispatchesPresenter]
})
export class ComponentAddOrdersDispatchesComponent implements OnInit {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() orderId;

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private presenter: AdminDashboardOrdersDispatchesPresenter
  ) {
    this.itemForm = this.formBuilder.group({
      orderId: [''],
      providerId: [''],
      cost: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      typeCurrency: ['USD', Validators.required],
      date: [CommonUtils.getDayNow(), Validators.required],
      status: ['0', Validators.required],
      otherDetails: ['']
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
      providerId: '',
      cost: 0,
      typeCurrency: 'USD',
      date: CommonUtils.getDayNow(),
      status: '0',
      otherDetails: ''
    };
  }
}
