import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'swtvap-component-show-orders-transactions',
  templateUrl: './component-show-orders-transactions.component.html',
  styleUrls: ['./component-show-orders-transactions.component.scss'],
})
export class ComponentShowOrdersTransactionsComponent implements OnChanges {
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.item = changes['item'].currentValue;
    }
  }
}
