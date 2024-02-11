import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DispatcheHttp } from 'src/app/shared/http/dispatches.http';

@Component({
  selector: 'app-component-update-orders-dispatches',
  templateUrl: './component-update-orders-dispatches.component.html',
  styleUrls: ['./component-update-orders-dispatches.component.scss'],
})
export class ComponentUpdateOrdersDispatchesComponent implements OnInit, OnChanges {
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};
  @Input() ordersId;

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private orderDispatchesHttp: DispatcheHttp
  ) {
    this.itemForm = this.formBuilder.group({
      ordersId: [''],
      providerId: [''],
      cost: ['', Validators.required],
      typeCurrency: ['', Validators.required],
      date: [''],
      status: ['', Validators.required],
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
      this.orderDispatchesHttp.update(item.id, item).subscribe((item) => {
        this.updated.emit(item);
      });
    }
  }
}
