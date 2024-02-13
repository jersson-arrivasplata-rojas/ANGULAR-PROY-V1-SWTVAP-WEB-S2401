import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { ParameterHttp } from 'src/app/shared/http/parameters.http';


@Component({
  selector: 'app-admin-dashboard-sub-secondary-parameters',
  templateUrl: './admin-dashboard-sub-secondary-parameters.component.html',
  styleUrls: ['./admin-dashboard-sub-secondary-parameters.component.css']
})
export class AdminDashboardSubSecondaryParametersComponent implements OnInit {

  data: any[] = [];
  item;
  addItem = false;
  updateItem = false;
  showItem = false;
  properties = {
    id: 0,
    idParentParameter: 0
  }
  constructor(private parameterHttp: ParameterHttp, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.params
      .pipe(
        mergeMap(params => {
          this.properties.id = +params['id'];
          this.properties.idParentParameter = +params['idSubParameter'];
          return this.parameterHttp.getById(this.properties.idParentParameter);
        }),
        mergeMap(item => {
          this.item = item;
          return this.parameterHttp.getAll();
        })
      )
      .subscribe(data => {
        this.data = data.filter((response) => response.parentId === (this.item as any)?.id);
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

  back() {
    this.router.navigate(['/admin/dashboard/parameters/add', this.properties.id]);
  }
}
