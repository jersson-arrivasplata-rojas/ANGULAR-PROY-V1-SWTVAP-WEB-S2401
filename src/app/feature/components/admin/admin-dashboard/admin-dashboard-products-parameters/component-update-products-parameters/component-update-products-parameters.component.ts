import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductParametersHttp } from 'src/app/shared/http/product-parameters.http';

@Component({
  selector: 'app-component-update-products-parameters',
  templateUrl: './component-update-products-parameters.component.html',
  styleUrls: ['./component-update-products-parameters.component.scss'],
})
export class ComponentUpdateProductsParametersComponent implements OnInit {
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};
  @Input() productId;

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productParametersHttp: ProductParametersHttp
  ) {
    this.itemForm = this.formBuilder.group({
      productId: [this.productId, Validators.required],
      code: ['', Validators.required]
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
      this.productParametersHttp.update(item.productParameterId, item).subscribe((item) => {
        this.updated.emit(item);
      });
    }
  }
}
