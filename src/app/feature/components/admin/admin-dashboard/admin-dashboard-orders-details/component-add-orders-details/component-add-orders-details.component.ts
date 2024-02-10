import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-component-add-orders-details',
  templateUrl: './component-add-orders-details.component.html',
  styleUrls: ['./component-add-orders-details.component.scss'],
})
export class ComponentAddOrdersDetailsComponent implements OnInit {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() ordersId;

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.itemForm = this.formBuilder.group({
      quantity: ['', Validators.required],
      unitPrice: ['', Validators.required],
      subtotal: ['', Validators.required],
      discountPercentage: ['', Validators.required],
      otherDetails: [''],
      status: [false, [Validators.required]]
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

  addProduct(element: any){
    console.log(element);

  }

  init() {
    return {
      ordersId: this.ordersId,
      unitPrice: '',
      subtotal: '',
      discountPercentage: '',
      otherDetails: '',
      status: false
    };
  }
}
