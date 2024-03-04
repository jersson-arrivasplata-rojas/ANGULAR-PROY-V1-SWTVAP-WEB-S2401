import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'swtvap-component-show-orders-dispatches-providers',
  templateUrl: './component-show-orders-dispatches-providers.component.html',
  styleUrls: ['./component-show-orders-dispatches-providers.component.scss'],
})
export class ComponentShowOrdersDispatchesProvidersComponent implements OnChanges {
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.item = changes['item'].currentValue;
    }
  }
}
