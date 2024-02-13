import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatternEnum } from 'src/app/shared/constants/patterns.const';
import { ProductHttp } from 'src/app/shared/http/products.http';

@Component({
  selector: 'app-component-update-products',
  templateUrl: './component-update-products.component.html',
  styleUrls: ['./component-update-products.component.scss'],
})
export class ComponentUpdateProductsComponent implements OnInit, OnChanges {
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productHttp: ProductHttp
  ) {
    this.itemForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      priceUSD: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      priceEUR: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      stock: [0, [Validators.required, Validators.pattern(PatternEnum.NUMBER)]],
      stockMin: [0, [Validators.required, Validators.pattern(PatternEnum.NUMBER)]],
      otherDetails: [''],
      status: [false, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.itemForm.patchValue(this.item);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.item.status = Boolean(this.item.status);
      this.itemForm.patchValue(this.item);
    }
  }

  update() {
    if (this.itemForm.valid) {
      const item = { ...this.item, ...this.itemForm.value };
      item.status = Number(item.status);
      this.productHttp.update(item.productId, item).subscribe((item) => {
        this.updated.emit(item);
      });
    }
  }
}
