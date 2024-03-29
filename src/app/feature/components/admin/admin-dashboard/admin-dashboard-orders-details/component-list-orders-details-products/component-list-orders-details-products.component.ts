import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'swtvap-component-list-orders-details-products',
  templateUrl: './component-list-orders-details-products.component.html',
  styleUrls: ['./component-list-orders-details-products.component.scss'],
})
export class ComponentListOrdersDetailsProductsComponent {
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
