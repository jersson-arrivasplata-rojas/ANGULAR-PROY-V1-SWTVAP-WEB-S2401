import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatternEnum } from 'src/app/shared/constants/patterns.const';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'app-component-add-products-discounts',
  templateUrl: './component-add-products-discounts.component.html',
  styleUrls: ['./component-add-products-discounts.component.scss'],
})
export class ComponentAddProductsDiscountsComponent implements OnInit {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() productId;

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.itemForm = this.formBuilder.group({
      productId: ['', Validators.required],
      discountPercentage: ['', [Validators.required, Validators.pattern(PatternEnum.NUMBER)]],
      startDate: [CommonUtils.getDayNow(), [Validators.required, Validators.pattern(PatternEnum.DATE)]],
      endDate: [CommonUtils.getDayNow(), [Validators.required, Validators.pattern(PatternEnum.DATE)]],
      otherDetails: ['']
    });
  }

  ngOnInit(): void {
    this.itemForm.patchValue({productId: this.productId});
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
