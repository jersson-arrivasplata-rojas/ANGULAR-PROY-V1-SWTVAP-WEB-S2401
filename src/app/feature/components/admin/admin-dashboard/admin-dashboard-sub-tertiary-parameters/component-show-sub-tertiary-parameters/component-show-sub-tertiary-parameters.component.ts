import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'swtvap-component-show-sub-tertiary-parameters',
  templateUrl: './component-show-sub-tertiary-parameters.component.html',
  styleUrls: ['./component-show-sub-tertiary-parameters.component.scss'],
})
export class ComponentShowSubTertiaryParametersComponent implements OnChanges {
  @Output() revoke: EventEmitter<any> = new EventEmitter();

  @Input() item: any = {};
  @Input() properties:any;


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.item.status = Boolean(this.item.status);
      this.item = changes['item'].currentValue;
    }
  }
}
