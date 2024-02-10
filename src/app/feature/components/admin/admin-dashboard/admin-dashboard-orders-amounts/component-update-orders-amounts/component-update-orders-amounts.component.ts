import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderAmountsHttp } from 'src/app/shared/http/order-amounts.http';

@Component({
  selector: 'app-component-update-orders-amounts',
  templateUrl: './component-update-orders-amounts.component.html',
  styleUrls: ['./component-update-orders-amounts.component.scss'],
})
export class ComponentUpdateOrdersAmountsComponent implements OnInit, OnChanges {
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};
  @Input() ordersId;

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private orderAmountsHttp: OrderAmountsHttp
  ) {
    this.itemForm = this.formBuilder.group({
      ordersId: ['', Validators.required],
      name: ['', Validators.required],
      amount: ['', Validators.required],
      otherDetails: ['']
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
      this.orderAmountsHttp.update(item.orderAmountId, item).subscribe((item) => {
        this.updated.emit(item);
      });
    }
  }
}
