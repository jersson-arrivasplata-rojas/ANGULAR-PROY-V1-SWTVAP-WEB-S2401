import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParameterHttp } from 'src/app/shared/http/parameters.http';


@Component({
  selector: 'swtvap-admin-dashboard-parameters',
  templateUrl: './admin-dashboard-parameters.component.html',
  styleUrls: ['./admin-dashboard-parameters.component.css']
})
export class AdminDashboardParametersComponent implements OnInit {

  data: any[] = [];
  item = {};
  addItem = false;
  updateItem = false;
  showItem = false;
  constructor(private parameterHttp: ParameterHttp, private router:Router) { }

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
      (window as any).success("¡Guardado!");
    });
  }

  handleUpdated(item: any) {
    this.data = this.data.map((data) => {
      if (data.id === item.id) {
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

  handleTableAdded(data: any){
    this.router.navigate(['/admin/dashboard/parameters/add', data.id]);
  }
}
