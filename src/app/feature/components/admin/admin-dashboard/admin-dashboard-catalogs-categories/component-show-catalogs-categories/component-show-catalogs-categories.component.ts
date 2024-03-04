import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'swtvap-component-show-catalogs-categories',
  templateUrl: './component-show-catalogs-categories.component.html',
  styleUrls: ['./component-show-catalogs-categories.component.scss'],
})
export class ComponentShowCatalogsCategoriesComponent implements OnChanges {
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.item = changes['item'].currentValue;
    }
  }
}
