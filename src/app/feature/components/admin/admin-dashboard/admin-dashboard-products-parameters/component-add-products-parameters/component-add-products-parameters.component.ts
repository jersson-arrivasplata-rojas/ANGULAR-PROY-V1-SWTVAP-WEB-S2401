import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminDashboardProductsParametersPresenter } from '../admin-dashboard-products-parameters.presenter';

@Component({
  selector: 'app-component-add-products-parameters',
  templateUrl: './component-add-products-parameters.component.html',
  styleUrls: ['./component-add-products-parameters.component.scss'],
  providers: [AdminDashboardProductsParametersPresenter]
})
export class ComponentAddProductsParametersComponent implements OnInit, OnChanges {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() parameters = [];
  @Input() productId;

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.itemForm = this.formBuilder.group({
      productId: ['', Validators.required],
      parameter: [null],
      code: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.itemForm.patchValue({ productId: this.productId, parameter: this.parameters[0]?.id});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parameters'] && changes['parameters'].currentValue) {
      this.parameters = changes['parameters'].currentValue;
    }
  }

  show(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    console.log(selectedValue);
  }

  add() {
    if (this.itemForm.valid) {
      const item = { ...this.init(), ...this.itemForm.value };
      this.added.emit(item);
    }
  }

  init() {
    return {
      productId: this.productId,
      code: ''
    };
  }
}
