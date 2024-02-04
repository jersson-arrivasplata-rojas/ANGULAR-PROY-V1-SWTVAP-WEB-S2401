import { Component, OnInit } from '@angular/core';
import { ParameterHttp } from 'src/app/shared/http/parameters.http';


@Component({
  selector: 'app-admin-dashboard-parameters',
  templateUrl: './admin-dashboard-parameters.component.html',
  styleUrls: ['./admin-dashboard-parameters.component.css']
})
export class AdminDashboardParametersComponent implements OnInit {

  data: any[] = [];
  item = {};
  addItem = false;
  updateItem = false;
  showItem = false;
  constructor(private parameterHttp: ParameterHttp) { }

  ngOnInit() {
    this.parameterHttp.getAll().subscribe((data) => {
      this.data = data;
    });
  }

  handleAdded(data: any) {
    this.parameterHttp.add(data).subscribe((data) => {
      this.data.push(data);
      this.updateItem = false;
      this.showItem = false;
      this.addItem = false;
    });
  }

  handleUpdated(item: any) {
    this.data = this.data.map((response) => {
      if (response.id === item.id) {
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
