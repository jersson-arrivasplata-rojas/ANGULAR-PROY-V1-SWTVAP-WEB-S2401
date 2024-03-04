import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'swtvap-component-show-clients',
  templateUrl: './component-show-clients.component.html',
  styleUrls: ['./component-show-clients.component.scss'],
})
export class ComponentShowClientsComponent implements OnChanges {
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.item.whatsapp = Boolean(this.item.whatsapp);
      this.item = changes['item'].currentValue;
    }
  }
}
