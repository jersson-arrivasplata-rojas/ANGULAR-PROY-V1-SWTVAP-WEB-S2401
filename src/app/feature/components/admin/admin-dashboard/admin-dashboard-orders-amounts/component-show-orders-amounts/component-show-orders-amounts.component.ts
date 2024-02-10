import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-component-show-orders-amounts',
  templateUrl: './component-show-orders-amounts.component.html',
  styleUrls: ['./component-show-orders-amounts.component.scss'],
})
export class ComponentShowOrdersAmountsComponent implements OnChanges {
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.item = changes['item'].currentValue;
    }
  }
}
