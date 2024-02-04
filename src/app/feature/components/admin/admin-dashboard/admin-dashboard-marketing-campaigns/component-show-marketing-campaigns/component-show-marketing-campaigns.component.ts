import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-component-show-marketing-campaigns',
  templateUrl: './component-show-marketing-campaigns.component.html',
  styleUrls: ['./component-show-marketing-campaigns.component.scss'],
})
export class ComponentShowMarketingCampaignsComponent implements OnChanges {
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.item = changes['item'].currentValue;
    }
  }
}
