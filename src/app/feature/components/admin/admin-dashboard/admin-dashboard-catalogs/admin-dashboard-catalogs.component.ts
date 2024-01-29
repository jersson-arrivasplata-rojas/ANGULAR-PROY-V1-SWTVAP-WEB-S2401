import { Component, OnInit } from '@angular/core';
import { CatalogHttp } from 'src/app/shared/http/catalogs.http';


@Component({
  selector: 'app-admin-dashboard-catalogs',
  templateUrl: './admin-dashboard-catalogs.component.html',
  styleUrls: ['./admin-dashboard-catalogs.component.css']
})
export class AdminDashboardCatalogsComponent implements OnInit {

  data: any[] = [];
  item = {};
  addItem = false;
  updateItem = false;
  showItem = false;
  constructor(private catalogHttp: CatalogHttp) { }

  ngOnInit() {
    this.catalogHttp.getAll().subscribe((data) => {
      this.data = data;
    });
  }

  handleAdded(data: any) {
    this.catalogHttp.add(data).subscribe((data) => {
      this.data.push(data);
      this.updateItem = true;
      this.showItem = false;
      this.addItem = false;
    });
  }

  handleUpdated(data: any) {
    this.data = this.data.map((response) => {
      if (response.id === data.id) {
        return data;
      }
      return response;
    });
    this.addItem = true;
    this.updateItem = false;
    this.showItem = false;
  }

  handleTableUpdated(data: any) {
    this.data = data;
    this.addItem = false;
    this.updateItem = true;
    this.showItem = false;
  }

  handleTableDeleted(data: any) {
    this.data = data;
  }


  handleTableShowed(data: any) {
    this.item = data.item;
    this.showItem = data.showItem;
    this.addItem = false;
    this.updateItem = false;
  }
}
