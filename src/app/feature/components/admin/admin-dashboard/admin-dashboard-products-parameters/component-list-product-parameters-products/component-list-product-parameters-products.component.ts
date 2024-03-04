import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'swtvap-component-list-product-parameters-products',
  templateUrl: './component-list-product-parameters-products.component.html',
  styleUrls: ['./component-list-product-parameters-products.component.scss'],
})
export class ComponentListProductsParametersProductsComponent {
  @Output() selected: EventEmitter<any> = new EventEmitter();
  @Input() data: any[] = [];

  item: any;

  showItem = false;
  searchTerm = '';

  constructor() { }

  add(item) {
    this.selected.emit(item);
  }
}
