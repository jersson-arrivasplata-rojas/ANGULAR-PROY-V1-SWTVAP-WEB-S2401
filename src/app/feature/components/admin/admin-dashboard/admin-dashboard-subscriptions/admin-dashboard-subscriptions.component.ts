import { Component, OnInit } from '@angular/core';
import { SubscriptionHttp } from 'src/app/shared/http/subscriptions.http';


@Component({
  selector: 'app-admin-dashboard-subscriptions',
  templateUrl: './admin-dashboard-subscriptions.component.html',
  styleUrls: ['./admin-dashboard-subscriptions.component.css']
})
export class AdminDashboardSubscriptionsComponent implements OnInit {

  data: any[] = [];
  item = {};
  addItem = false;
  updateItem = false;
  showItem = false;
  constructor(private subscriptionHttp: SubscriptionHttp) { }

  ngOnInit() {
    this.subscriptionHttp.getAll().subscribe((data) => {
      this.data = data;
    });
  }

  handleAdded(data: any) {
    this.subscriptionHttp.add(data).subscribe((data) => {
      this.data.push(data);
      this.updateItem = false;
      this.showItem = false;
      this.addItem = false;
    });
  }

  handleUpdated(item: any) {
    this.data = this.data.map((response) => {
      if (response.newsletterSubscriptionId === item.newsletterSubscriptionId) {
        return item;
      }
      return response;
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
