import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductImagesHttp } from 'src/app/shared/http/product-images.http';

@Component({
  selector: 'swtvap-component-update-products-images',
  templateUrl: './component-update-products-images.component.html',
  styleUrls: ['./component-update-products-images.component.scss'],
})
export class ComponentUpdateProductsImagesComponent implements OnInit, OnChanges {
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};
  @Input() productId;

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productImagesHttp: ProductImagesHttp
  ) {
    this.itemForm = this.formBuilder.group({
      productId: ['', Validators.required],
      files: [],
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
      this.productImagesHttp.update(item.productImageId, item).subscribe((item) => {
        this.updated.emit(item);
        (window as any).success("¡Actualizado!");
      });
    }
  }

  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.itemForm.patchValue({ files: inputElement.files });
  }
}
