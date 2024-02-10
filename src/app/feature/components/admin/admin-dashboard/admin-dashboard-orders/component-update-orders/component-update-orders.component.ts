import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderHttp } from 'src/app/shared/http/orders.http';

@Component({
  selector: 'app-component-update-orders',
  templateUrl: './component-update-orders.component.html',
  styleUrls: ['./component-update-orders.component.scss'],
})
export class ComponentUpdateOrdersComponent implements OnInit, OnChanges {
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private orderHttp: OrderHttp
  ) {
    this.itemForm = this.formBuilder.group({
      code: ['', Validators.required],
      address: ['', Validators.required],
      subtotal: [''],
      subtotalUSD: [''],
      subtotalEUR: [''],
      taxes: [''],
      taxesUSD: [''],
      taxesEUR: [''],
      discountAmount: ['', Validators.required],
      total: [''],
      totalUSD: [''],
      totalEUR: [''],
      pickUp: [false, Validators.required],
      otherDetails: [''],
      status: [true, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.itemForm.patchValue(this.item);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.item.status = Boolean(this.item.status);
      this.item.pickUp = Boolean(this.item.pickUp);
      this.itemForm.patchValue(this.item);
    }
  }

  update() {
    if (this.itemForm.valid) {
      const item = { ...this.item, ...this.itemForm.value };
      item.status = Number(item.status);
      item.pickUp = Number(item.pickUp);
      this.orderHttp.update(item.orderId, item).subscribe((item) => {
        this.updated.emit(item);
      });
    }
  }
}
