import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { ParameterHttp } from 'src/app/shared/http/parameters.http';


@Component({
  selector: 'swtvap-admin-dashboard-sub-parameters',
  templateUrl: './admin-dashboard-sub-parameters.component.html',
  styleUrls: ['./admin-dashboard-sub-parameters.component.css']
})
export class AdminDashboardSubParametersComponent implements OnInit {

  data: any[] = [];
  dataTree: any[] = [];
  parameter;
  item;
  addItem = false;
  updateItem = false;
  showItem = false;
  id;
  constructor(private parameterHttp: ParameterHttp, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.params
      .pipe(
        mergeMap(params => {
          this.id = +params['id'];
          return this.parameterHttp.getById(this.id);
        }),
        mergeMap(item => {
          this.parameter = item;
          this.item = item;
          return this.parameterHttp.getAll();
        })
      )
      .subscribe(data => {
        this.data = data.filter((response) => response.parentId === (this.parameter as any)?.id);
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

  handleTableAdded(data: any) {
    this.router.navigate(['/admin/dashboard/parameters/add', this.id, 'add-secondary', data.id]);
  }

  back() {
    this.router.navigate(['/admin/dashboard/parameters']);
  }
}
