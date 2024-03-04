import { Component, OnInit } from '@angular/core';
import { ContactHttp } from 'src/app/shared/http/contacts.http';


@Component({
  selector: 'swtvap-admin-dashboard-contacts',
  templateUrl: './admin-dashboard-contacts.component.html',
  styleUrls: ['./admin-dashboard-contacts.component.css']
})
export class AdminDashboardContactsComponent implements OnInit {

  data: any[] = [];
  item = {};
  addItem = false;
  updateItem = false;
  showItem = false;
  constructor(private contactHttp: ContactHttp) { }

  ngOnInit() {
    this.contactHttp.getAll().subscribe((data) => {
      this.data = data;
    });
  }

  handleAdded(data: any) {
    this.contactHttp.add(data).subscribe((data) => {
      this.updateItem = false;
      this.showItem = false;
      this.addItem = false;
      this.data.push(data);
      (window as any).success("¡Guardado!");
    });
  }

  handleUpdated(item: any) {
    this.data = this.data.map((data) => {
      if (data.contactId === item.contactId) {
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
