import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductDiscountsHttp } from 'src/app/shared/http/product-discounts.http';

@Component({
  selector: 'app-component-update-products-discounts',
  templateUrl: './component-update-products-discounts.component.html',
  styleUrls: ['./component-update-products-discounts.component.scss'],
})
export class ComponentUpdateProductsDiscountsComponent implements OnInit {
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
      productId: [this.productId, Validators.required],
      discountPercentage: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      otherDetails: ['', Validators.required]
    });
  }

  ngOnInit(): void {
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
      });
    }
  }
}
