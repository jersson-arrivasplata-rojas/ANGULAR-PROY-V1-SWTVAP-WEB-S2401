import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-component-show-orders',
  templateUrl: './component-show-orders.component.html',
  styleUrls: ['./component-show-orders.component.scss'],
})
export class ComponentShowOrdersComponent implements OnChanges {
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.item.pickUp = Boolean(this.item.pickUp);
      this.item = changes['item'].currentValue;
    }
  }
}
