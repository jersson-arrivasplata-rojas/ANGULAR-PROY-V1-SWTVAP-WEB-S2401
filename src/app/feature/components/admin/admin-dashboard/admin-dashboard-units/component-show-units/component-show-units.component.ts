import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TypesEnum } from 'src/app/shared/config/types.enum';

@Component({
  selector: 'app-component-show-units',
  templateUrl: './component-show-units.component.html',
  styleUrls: ['./component-show-units.component.scss'],
})
export class ComponentShowUnitsComponent implements OnChanges {
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};
  @Input() properties = {
    id: 0,
    type: ''
  };
  typesEnum = TypesEnum;


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.item.status = Boolean(this.item.status);
      this.item = changes['item'].currentValue;
    }
  }
}
