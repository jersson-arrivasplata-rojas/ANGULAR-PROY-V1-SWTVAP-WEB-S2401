import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ParametersEnum } from 'src/app/shared/config/parameters.enum';
import { AdminDashboardProductsParametersPresenter } from '../admin-dashboard-products-parameters.presenter';

@Component({
  selector: 'swtvap-component-add-products-parameters',
  templateUrl: './component-add-products-parameters.component.html',
  styleUrls: ['./component-add-products-parameters.component.scss'],
  providers: [AdminDashboardProductsParametersPresenter]
})
export class ComponentAddProductsParametersComponent implements OnInit, OnChanges {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() parameters = [];
  @Input() productId;

  selectAllParameters = [];
  selectAllParametersFilter = [];
  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public presenter: AdminDashboardProductsParametersPresenter,
    private router: Router
  ) {
    this.itemForm = this.formBuilder.group({
      productId: ['', Validators.required],
      parameter: [null],
      code: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.selectAllParameters = this.presenter.getAllSelectedParameters(this.parameters);
    if (this.selectAllParameters.length > 0) {
      const firstDetail = this.selectAllParameters[0]?.details[0];
      this.itemForm.patchValue({ productId: this.productId, parameter: firstDetail?.id }, { emitEvent: false });

      if (firstDetail?.details.length > 0) {
        this.selectAllParametersFilter = firstDetail.details;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parameters'] && changes['parameters'].currentValue) {
      this.parameters = changes['parameters'].currentValue;
    }
  }

  show(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    if (this.selectAllParameters.length > 0) {
      const selectedItem = this.selectAllParameters.find(item => item.code === ParametersEnum.SELECT);
      const firstDetail = selectedItem?.details.find(detail => detail.id === parseInt(selectedValue, 10));

      if (firstDetail) {
        this.itemForm.patchValue({ parameter: firstDetail.id }, { emitEvent: false });
        this.selectAllParametersFilter = firstDetail.details;
      }
    }
  }

  add() {
    if (this.itemForm.valid) {
      const item = { ...this.init(), ...this.itemForm.value };
      this.added.emit(item);
    }
  }

  addParameter(item) {
    this.added.emit(item);
  }

  goToParameters() {
    this.router.navigate(['/admin/dashboard/products/add-parameters', this.productId, 'parameters', this.selectAllParameters[0].parentId, 'add-secondary', this.selectAllParameters[0].id]);
  }

  init() {
    return {
      productId: this.productId,
      code: ''
    };
  }
}
