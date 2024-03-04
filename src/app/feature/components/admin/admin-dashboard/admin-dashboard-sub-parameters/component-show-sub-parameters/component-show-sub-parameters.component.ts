import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'swtvap-component-show-sub-parameters',
  templateUrl: './component-show-sub-parameters.component.html',
  styleUrls: ['./component-show-sub-parameters.component.scss'],
})
export class ComponentShowSubParametersComponent implements OnChanges {
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.item.status = Boolean(this.item.status);
      this.item = changes['item'].currentValue;
    }
  }
}
