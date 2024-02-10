import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-component-add-products',
  templateUrl: './component-add-products.component.html',
  styleUrls: ['./component-add-products.component.scss'],
})
export class ComponentAddProductsComponent {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.itemForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      priceUSD: ['', Validators.required],
      priceEUR: ['', Validators.required],
      stock: ['', Validators.required],
      stockMin: ['', Validators.required],
      otherDetails: [''],
      status: [false, [Validators.required]]
    });
  }

  add() {
    if (this.itemForm.valid) {
      const item = { ...this.init(), ...this.itemForm.value };
      item.status = Number(item.status);
      this.added.emit(item);
    }
  }

  init() {
    return {
      code: '',
      name: '',
      description: '',
      price: '',
      priceUSD: '',
      priceEUR: '',
      stock: '',
      stockMin: '',
      otherDetails: '',
      status: false
    };
  }
}
