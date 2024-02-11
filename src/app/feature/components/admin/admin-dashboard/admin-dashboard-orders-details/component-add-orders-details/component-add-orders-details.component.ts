import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductHttp } from 'src/app/shared/http/products.http';

@Component({
  selector: 'app-component-add-orders-details',
  templateUrl: './component-add-orders-details.component.html',
  styleUrls: ['./component-add-orders-details.component.scss'],
})
export class ComponentAddOrdersDetailsComponent implements OnInit {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() ordersId;

  itemForm: FormGroup;
  products: any[] = [];
  productName: string;
  showProduct: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private productHttp: ProductHttp
  ) {
    this.itemForm = this.formBuilder.group({
      productId: ['', Validators.required],
      quantity: ['', Validators.required],
      unitPrice: ['', Validators.required],
      unitPriceUSD: ['', Validators.required],
      unitPriceEUR: ['', Validators.required],
      subtotal: ['', Validators.required],
      subtotalUSD: ['', Validators.required],
      subtotalEUR: ['', Validators.required],
      discountPercentage: ['', Validators.required],
      otherDetails: [''],
      status: [false, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.itemForm.patchValue({ ordersId: this.ordersId });
    this.productHttp.getAll().subscribe((products) => {
      this.products = products.filter((product) => product.status === true);
    });
  }

  add() {
    if (this.itemForm.valid) {
      const item = { ...this.init(), ...this.itemForm.value };
      this.added.emit(item);
    }
  }

  addProduct(item) {
    this.productName = item.name;
    this.itemForm.patchValue({ productId: item.productId });
  }

  show() {
    this.showProduct = !this.showProduct;
  }
  init() {
    return {
      ordersId: this.ordersId,
      unitPrice: '',
      unitPriceUSD: '',
      unitPriceEUR: '',
      subtotal: '',
      subtotalUSD: '',
      subtotalEUR: '',
      discountPercentage: '',
      otherDetails: '',
      status: false
    };
  }
}
