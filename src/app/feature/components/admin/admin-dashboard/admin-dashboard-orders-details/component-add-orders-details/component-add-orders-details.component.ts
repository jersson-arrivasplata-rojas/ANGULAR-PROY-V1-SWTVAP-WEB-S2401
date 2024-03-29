import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatternEnum } from 'src/app/shared/constants/patterns.const';
import { ProductHttp } from 'src/app/shared/http/products.http';
import { AdminDashboardOrdersDetailsPresenter } from '../admin-dashboard-orders-details.presenter';

@Component({
  selector: 'swtvap-component-add-orders-details',
  templateUrl: './component-add-orders-details.component.html',
  styleUrls: ['./component-add-orders-details.component.scss'],
  providers: [AdminDashboardOrdersDetailsPresenter]
})
export class ComponentAddOrdersDetailsComponent implements OnInit {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() orderId;

  itemForm: FormGroup;
  products: any[] = [];
  productName: string;
  showProduct: boolean = false;
  disabledProduct: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private productHttp: ProductHttp,
    private presenter: AdminDashboardOrdersDetailsPresenter
  ) {
    this.itemForm = this.formBuilder.group({
      productId: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.pattern(PatternEnum.NUMBER)]],
      unitPrice: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      unitPriceUSD: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      unitPriceEUR: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      subtotal: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      subtotalUSD: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      subtotalEUR: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      discountPercentage: [0, [Validators.required, Validators.pattern(PatternEnum.NUMBER)]],
      otherDetails: [''],
      status: [true, [Validators.required]]
    });
    this.presenter.itemForm = this.itemForm;
  }

  ngOnInit(): void {
    this.itemForm.disable();
    this.itemForm.patchValue({ orderId: this.orderId });

    this.productHttp.getAll().subscribe((products) => {
      this.products = products.filter((product) => product.status === true);
    });
    this.presenter.handleForm();
  }

  add() {
    if (this.itemForm.valid) {
      const item = { ...this.init(), ...this.itemForm.value };
      this.added.emit(item);
    }
  }

  addProduct(item) {
    this.disabledProduct = false;
    this.itemForm.enable();
    this.productName = item.name;
    this.itemForm.patchValue({
      productId: item.productId,
      unitPrice: item.price,
      unitPriceUSD: item.priceUSD,
      unitPriceEUR: item.priceEUR
    });
  }

  show() {
    this.showProduct = !this.showProduct;
  }

  init() {
    return {
      orderId: this.orderId,
      unitPrice: 0,
      unitPriceUSD: 0,
      unitPriceEUR: 0,
      subtotal: 0,
      subtotalUSD: 0,
      subtotalEUR: 0,
      discountPercentage: 0,
      otherDetails: '',
      status: false
    };
  }
}
