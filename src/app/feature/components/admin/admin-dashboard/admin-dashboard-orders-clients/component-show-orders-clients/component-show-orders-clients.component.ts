import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'swtvap-component-show-orders-clients',
  templateUrl: './component-show-orders-clients.component.html',
  styleUrls: ['./component-show-orders-clients.component.scss'],
})
export class ComponentShowOrdersClientsComponent implements OnChanges {
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.item = changes['item'].currentValue;
    }
  }
}
