import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-component-show-sub-secondary-parameters',
  templateUrl: './component-show-sub-secondary-parameters.component.html',
  styleUrls: ['./component-show-sub-secondary-parameters.component.scss'],
})
export class ComponentShowSubSecondaryParametersComponent implements OnChanges {
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
