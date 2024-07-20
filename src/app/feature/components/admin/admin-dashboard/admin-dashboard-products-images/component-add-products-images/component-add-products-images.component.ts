import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'swtvap-component-add-products-images',
  templateUrl: './component-add-products-images.component.html',
  styleUrls: ['./component-add-products-images.component.scss'],
})
export class ComponentAddProductsImagesComponent implements OnInit {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() productId;

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.itemForm = this.formBuilder.group({
      productId: ['', Validators.required],
      files: [],
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

  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.itemForm.patchValue({ files: inputElement.files });
  }

  init() {
    return {
      productId: this.productId,
      files: []
    };
  }
}
