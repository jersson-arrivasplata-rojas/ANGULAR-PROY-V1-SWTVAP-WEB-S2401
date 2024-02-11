import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderDetailsHttp } from 'src/app/shared/http/order-details.http';

@Component({
  selector: 'app-component-update-orders-details',
  templateUrl: './component-update-orders-details.component.html',
  styleUrls: ['./component-update-orders-details.component.scss'],
})
export class ComponentUpdateOrdersDetailsComponent implements OnInit, OnChanges {
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};
  @Input() ordersId;
  products: any[] = [];

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private orderDetailsHttp: OrderDetailsHttp
  ) {
    this.itemForm = this.formBuilder.group({
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
    this.itemForm.patchValue({ordersId: this.ordersId});
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
      this.orderDetailsHttp.update(item.orderDetailId, item).subscribe((item) => {
        this.updated.emit(item);
      });
    }
  }
}
