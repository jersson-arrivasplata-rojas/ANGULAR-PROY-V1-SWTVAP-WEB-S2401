import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-component-add-orders-amounts',
  templateUrl: './component-add-orders-amounts.component.html',
  styleUrls: ['./component-add-orders-amounts.component.scss'],
})
export class ComponentAddOrdersAmountsComponent implements OnInit {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() ordersId;

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.itemForm = this.formBuilder.group({
      ordersId: ['', Validators.required],
      name: ['', Validators.required],
      amount: ['', Validators.required],
      amountUSD: ['', Validators.required],
      amountEUR: ['', Validators.required],
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
      name: '',
      amount: '',
      amountUSD: '',
      amountEUR: '',
      otherDetails: ''
    };
  }
}
