import { Component, OnInit } from '@angular/core';
import { AnalyticHttp } from 'src/app/shared/http/analytics.http';


@Component({
  selector: 'app-admin-dashboard-analytics',
  templateUrl: './admin-dashboard-analytics.component.html',
  styleUrls: ['./admin-dashboard-analytics.component.css']
})
export class AdminDashboardAnalyticsComponent implements OnInit {

  data: any[] = [];
  item = {};
  addItem = false;
  updateItem = false;
  showItem = false;
  constructor(private analyticHttp: AnalyticHttp) { }

  ngOnInit() {
    this.analyticHttp.getAll().subscribe((data) => {
      this.data = data;
    });
  }

  handleAdded(data: any) {
    this.analyticHttp.add(data).subscribe((data) => {
      this.data.push(data);
      this.updateItem = false;
      this.showItem = false;
      this.addItem = false;
    });
  }

  handleUpdated(item: any) {
    this.data = this.data.map((data) => {
      if (data.analyticId === item.analyticId) {
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
