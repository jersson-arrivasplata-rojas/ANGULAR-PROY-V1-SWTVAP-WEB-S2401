import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-component-show-catalogs',
  templateUrl: './component-show-catalogs.component.html',
  styleUrls: ['./component-show-catalogs.component.scss'],
})
export class ComponentShowCatalogsComponent implements OnChanges {
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.item.status = Boolean(this.item.status);
      this.item = changes['item'].currentValue;
    }
  }
}
