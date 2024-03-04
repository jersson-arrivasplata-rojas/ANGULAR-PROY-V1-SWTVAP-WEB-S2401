import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TypesEnum } from 'src/app/shared/config/types.enum';

@Component({
  selector: 'swtvap-component-show-catalogs-products',
  templateUrl: './component-show-catalogs-products.component.html',
  styleUrls: ['./component-show-catalogs-products.component.scss'],
})
export class ComponentShowCatalogsProductsComponent implements OnChanges {
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
