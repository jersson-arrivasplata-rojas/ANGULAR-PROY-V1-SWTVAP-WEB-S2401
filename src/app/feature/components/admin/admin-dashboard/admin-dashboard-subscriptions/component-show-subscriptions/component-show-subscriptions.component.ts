import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'swtvap-component-show-subscriptions',
  templateUrl: './component-show-subscriptions.component.html',
  styleUrls: ['./component-show-subscriptions.component.scss'],
})
export class ComponentShowSubscriptionsComponent implements OnChanges {
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.item = changes['item'].currentValue;
      this.item.status = CommonUtils.fromStatusText(this.item.status);
    }
  }
}
