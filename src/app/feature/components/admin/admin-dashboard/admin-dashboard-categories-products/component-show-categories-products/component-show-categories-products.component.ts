import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TypesEnum } from 'src/app/shared/config/types.enum';

@Component({
  selector: 'app-component-show-categories-products',
  templateUrl: './component-show-categories-products.component.html',
  styleUrls: ['./component-show-categories-products.component.scss'],
})
export class ComponentShowCategoriesProductsComponent implements OnChanges {
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};
  @Input() properties = {
    id: 0,
    type: ''
  };

  typesEnum = TypesEnum;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.item = changes['item'].currentValue;
    }
  }
}
