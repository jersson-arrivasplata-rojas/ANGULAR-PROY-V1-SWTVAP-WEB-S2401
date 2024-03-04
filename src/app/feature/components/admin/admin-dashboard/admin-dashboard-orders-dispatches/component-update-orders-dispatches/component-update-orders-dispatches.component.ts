import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatternEnum } from 'src/app/shared/constants/patterns.const';
import { DispatcheHttp } from 'src/app/shared/http/dispatches.http';
import { AdminDashboardOrdersDispatchesPresenter } from '../admin-dashboard-orders-dispatches.presenter';

@Component({
  selector: 'swtvap-component-update-orders-dispatches',
  templateUrl: './component-update-orders-dispatches.component.html',
  styleUrls: ['./component-update-orders-dispatches.component.scss'],
  providers: [AdminDashboardOrdersDispatchesPresenter]
})
export class ComponentUpdateOrdersDispatchesComponent implements OnInit, OnChanges {
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};
  @Input() orderId;

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private orderDispatchesHttp: DispatcheHttp,
    private presenter: AdminDashboardOrdersDispatchesPresenter
  ) {
    this.itemForm = this.formBuilder.group({
      orderId: [''],
      providerId: [''],
      cost: [0, [Validators.required, Validators.pattern(PatternEnum.AMOUNT)]],
      typeCurrency: ['USD', Validators.required],
      date: ['', Validators.required],
      status: ['0', Validators.required],
      otherDetails: ['']
    });
    this.presenter.itemForm = this.itemForm;
  }

  ngOnInit(): void {
    this.itemForm.patchValue({orderId: this.orderId});
    this.itemForm.patchValue(this.item);
    this.presenter.handleForm();
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
        (window as any).success("¡Actualizado!");
      });
    }
  }
}
