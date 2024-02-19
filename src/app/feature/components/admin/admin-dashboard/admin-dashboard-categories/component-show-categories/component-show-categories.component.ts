import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'app-component-show-categories',
  templateUrl: './component-show-categories.component.html',
  styleUrls: ['./component-show-categories.component.scss'],
})
export class ComponentShowCategoriesComponent implements OnChanges {
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.item.status = CommonUtils.fromStatusText(this.item.status);
      this.item = changes['item'].currentValue;
    }
  }
}
