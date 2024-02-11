import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { StatusProviderEnum } from 'src/app/shared/config/status-provider.enum';

@Component({
  selector: 'app-component-show-orders-dispatches',
  templateUrl: './component-show-orders-dispatches.component.html',
  styleUrls: ['./component-show-orders-dispatches.component.scss'],
})
export class ComponentShowOrdersDispatchesComponent implements OnChanges {
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.item = changes['item'].currentValue;
    }
  }

  getStatusProvider(value: string | number): string {
    return StatusProviderEnum[value] || '';
  }
}
