import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-component-add-products-discounts',
  templateUrl: './component-add-products-discounts.component.html',
  styleUrls: ['./component-add-products-discounts.component.scss'],
})
export class ComponentAddProductsDiscountsComponent {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() productId;

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.itemForm = this.formBuilder.group({
      productId: [this.productId, Validators.required],
      discountPercentage: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      otherDetails: ['', Validators.required]
    });
  }

  add() {
    if (this.itemForm.valid) {
      const item = { ...this.init(), ...this.itemForm.value };
      this.added.emit(item);
    }
  }

  init() {
    return {
      productId: this.productId,
      discountPercentage: '',
      startDate: '',
      endDate: '',
      otherDetails: '',
    };
  }
}
