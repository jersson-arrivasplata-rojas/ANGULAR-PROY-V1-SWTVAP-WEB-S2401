import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatternEnum } from 'src/app/shared/constants/patterns.const';
import { ProductDiscountsHttp } from 'src/app/shared/http/product-discounts.http';

@Component({
  selector: 'swtvap-component-update-products-discounts',
  templateUrl: './component-update-products-discounts.component.html',
  styleUrls: ['./component-update-products-discounts.component.scss'],
})
export class ComponentUpdateProductsDiscountsComponent implements OnInit, OnChanges {
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};
  @Input() productId;

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productDiscountsHttp: ProductDiscountsHttp
  ) {
    this.itemForm = this.formBuilder.group({
      productId: ['', Validators.required],
      discountPercentage: ['', [Validators.required, Validators.pattern(PatternEnum.NUMBER)]],
      startDate: ['', [Validators.required, Validators.pattern(PatternEnum.DATE)]],
      endDate: ['', [Validators.required, Validators.pattern(PatternEnum.DATE)]],
      otherDetails: ['']
    });
  }

  ngOnInit(): void {
    this.itemForm.patchValue({productId: this.productId});
    this.itemForm.patchValue(this.item);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.itemForm.patchValue(this.item);
    }
  }

  update() {
    if (this.itemForm.valid) {
      const item = { ...this.item, ...this.itemForm.value };
      this.productDiscountsHttp.update(item.productDiscountId, item).subscribe((item) => {
        this.updated.emit(item);
        (window as any).success("¡Actualizado!");
      });
    }
  }
}
