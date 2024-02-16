import { Component, OnInit } from '@angular/core';
import { ProviderHttp } from 'src/app/shared/http/providers.http';


@Component({
  selector: 'app-admin-dashboard-providers',
  templateUrl: './admin-dashboard-providers.component.html',
  styleUrls: ['./admin-dashboard-providers.component.css']
})
export class AdminDashboardProvidersComponent implements OnInit {

  data: any[] = [];
  item = {};
  addItem = false;
  updateItem = false;
  showItem = false;
  constructor(private providerHttp: ProviderHttp) { }

  ngOnInit() {
    this.providerHttp.getAll().subscribe((data) => {
      this.data = data;
    });
  }

  handleAdded(data: any) {
    this.providerHttp.add(data).subscribe((data) => {
      this.data.push(data);
      this.updateItem = false;
      this.showItem = false;
      this.addItem = false;
    });
  }

  handleUpdated(item: any) {
    this.data = this.data.map((data) => {
      if (data.providerId === item.providerId) {
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
