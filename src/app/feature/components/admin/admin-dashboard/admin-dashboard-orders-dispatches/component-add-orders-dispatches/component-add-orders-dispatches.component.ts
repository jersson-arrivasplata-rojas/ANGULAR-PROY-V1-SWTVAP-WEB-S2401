import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'app-component-add-orders-dispatches',
  templateUrl: './component-add-orders-dispatches.component.html',
  styleUrls: ['./component-add-orders-dispatches.component.scss'],
})
export class ComponentAddOrdersDispatchesComponent implements OnInit {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() ordersId;

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.itemForm = this.formBuilder.group({
      ordersId: [''],
      providerId: [''],
      cost: ['', Validators.required],
      typeCurrency: ['', Validators.required],
      date: [''],
      status: ['', Validators.required],
      otherDetails: ['']
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
      providerId: '',
      cost: '',
      typeCurrency: '',
      date: CommonUtils.getDayNow(),
      status: '',
      otherDetails: ''
    };
  }
}
