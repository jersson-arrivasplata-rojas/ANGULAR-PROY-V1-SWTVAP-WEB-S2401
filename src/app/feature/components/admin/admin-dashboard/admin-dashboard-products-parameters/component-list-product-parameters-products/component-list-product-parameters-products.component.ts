import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-component-list-product-parameters-products',
  templateUrl: './component-list-product-parameters-products.component.html',
  styleUrls: ['./component-list-product-parameters-products.component.scss'],
})
export class ComponentListProductsParametersProductsComponent {
  @Output() selected: EventEmitter<any> = new EventEmitter();
  @Input() data: any[] = [];

  item: any;

  showItem = false;

  constructor() { }

  add(item) {
    this.selected.emit(item);
  }
}
