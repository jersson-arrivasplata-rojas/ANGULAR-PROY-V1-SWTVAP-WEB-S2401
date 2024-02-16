import { Component, OnInit } from '@angular/core';
import { MarketingCampaignHttp } from 'src/app/shared/http/marketing-campaigns.http';

@Component({
  selector: 'app-admin-dashboard-marketing-campaigns',
  templateUrl: './admin-dashboard-marketing-campaigns.component.html',
  styleUrls: ['./admin-dashboard-marketing-campaigns.component.css']
})
export class AdminDashboardMarketingCampaignsComponent implements OnInit {

  data: any[] = [];
  item = {};
  addItem = false;
  updateItem = false;
  showItem = false;
  constructor(private marketingCampaignHttp: MarketingCampaignHttp) { }

  ngOnInit() {
    this.marketingCampaignHttp.getAll().subscribe((data) => {
      this.data = data;
    });
  }

  handleAdded(data: any) {
    this.marketingCampaignHttp.add(data).subscribe((data) => {
      this.data.push(data);
      this.updateItem = false;
      this.showItem = false;
      this.addItem = false;
    });
  }

  handleUpdated(item: any) {
    this.data = this.data.map((data) => {
      if (data.marketingCampaignId === item.marketingCampaignId) {
        return {
          ...data,
          ...item
        };
      }
      return data;
    });
    this.addItem = false;
    this.updateItem = false;
    this.showItem = false;
  }

  handleTableUpdated(item: any) {
    this.item = item;
    this.updateItem = true;
    this.addItem = false;
    this.showItem = false;
  }

  handleTableDeleted(data: any[]) {
    this.data = data;
  }


  handleTableShowed(data: any) {
    this.item = data.item;
    this.showItem = data.showItem;
    this.addItem = false;
    this.updateItem = false;
  }

}
