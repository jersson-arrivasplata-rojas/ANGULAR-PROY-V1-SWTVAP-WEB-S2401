import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'swtvap-component-show-providers',
  templateUrl: './component-show-providers.component.html',
  styleUrls: ['./component-show-providers.component.scss'],
})
export class ComponentShowProvidersComponent implements OnChanges {
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.item.whatsapp = Boolean(this.item.whatsapp);
      this.item.status = CommonUtils.fromStatusText(this.item.status);
      this.item = changes['item'].currentValue;
    }
  }
}
