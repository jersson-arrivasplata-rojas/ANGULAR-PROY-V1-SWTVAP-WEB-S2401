import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatternEnum } from 'src/app/shared/constants/patterns.const';

@Component({
  selector: 'swtvap-component-add-products',
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
      nameEn: [''],
      description: ['', Validators.required],
      descriptionEn: [''],
      price: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      priceUSD: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      priceEUR: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      stock: [0, [Validators.required, Validators.pattern(PatternEnum.NUMBER)]],
      stockMin: [0, [Validators.required, Validators.pattern(PatternEnum.NUMBER)]],
      otherDetails: [''],
      otherDetailsEn: [''],
      status: [true, [Validators.required]]
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
      nameEn: '',
      description: '',
      descriptionEn: '',
      price: 0,
      priceUSD: 0,
      priceEUR: 0,
      stock: 0,
      stockMin: 0,
      otherDetails: '',
      otherDetails_en: '',
      status: false
    };
  }
}
