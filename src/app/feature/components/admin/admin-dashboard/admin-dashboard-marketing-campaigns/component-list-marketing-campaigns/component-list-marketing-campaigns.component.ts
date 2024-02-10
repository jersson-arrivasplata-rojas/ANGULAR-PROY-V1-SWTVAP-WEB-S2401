import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MarketingCampaignHttp } from 'src/app/shared/http/marketing-campaigns.http';

@Component({
  selector: 'app-component-list-marketing-campaigns',
  templateUrl: './component-list-marketing-campaigns.component.html',
  styleUrls: ['./component-list-marketing-campaigns.component.scss'],
})
export class ComponentListMarketingCampaignsComponent {
  @Input() data: any[] = [];
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() showed: EventEmitter<any> = new EventEmitter();

  item: any;

  showItem = false;

  constructor(private marketingcampaignHttp: MarketingCampaignHttp) {}

  show(item: any) {
    if (item.marketingCampaignId === this.item?.marketingCampaignId && this.showItem) {
      this.showItem = !this.showItem;
      return;
    }
    this.marketingcampaignHttp  .getById(item.marketingCampaignId).subscribe((response) => {
      this.item = response;
      if (!this.showItem) this.showItem = !this.showItem;
      this.showed.emit({item: this.item, showItem: this.showItem});
    });
  }

  delete(item: any) {
    let text = 'Presiona el bot\xf3n para eliminar! ';
    if (confirm(text) === true) {
      this.marketingcampaignHttp.delete(item.marketingCampaignId).subscribe(() => {
        item.deleted = true;
        this.data = this.data.filter((f) => f.marketingCampaignId !== item.marketingCampaignId);
        this.deleted.emit(this.data);
      });
    }
  }

  update(item: any) {
    this.updated.emit(item);
  }
}