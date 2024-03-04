import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { ParameterTree } from 'src/app/shared/class/parameter-tree.class';
import { ParameterHttp } from 'src/app/shared/http/parameters.http';


@Component({
  selector: 'swtvap-admin-dashboard-sub-tertiary-parameters',
  templateUrl: './admin-dashboard-sub-tertiary-parameters.component.html',
  styleUrls: ['./admin-dashboard-sub-tertiary-parameters.component.css']
})
export class AdminDashboardSubTertiaryParametersComponent implements OnInit {

  data: any[] = [];
  dataTree: any[] = [];
  parameter;
  item;
  addItem = false;
  updateItem = false;
  showItem = false;
  properties = {
    id: 0,
    idSubParameter: 0,
    idParentParameter: 0
  };

  previousUrl: string = '';

  constructor(private parameterHttp: ParameterHttp, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.params
      .pipe(
        mergeMap(params => {
          this.properties.id = +params['id'];
          this.properties.idSubParameter = +params['idSubParameter'];
          this.properties.idParentParameter = +params['idSubSecondaryParameter'];
          return this.parameterHttp.getById(this.properties.idParentParameter);
        }),
        mergeMap(item => {
          this.parameter = item;
          this.item = item;
          return this.parameterHttp.getAll();
        })
      )
      .subscribe(data => {
        const parameterTree = new ParameterTree(data);
        this.dataTree = parameterTree.buildTree();
        this.parameter.deletedAt = parameterTree.hasDeletedParent(this.parameter);
        this.data = data.filter((response) => response.parentId === (this.parameter as any)?.id);
      });

    this.activatedRoute.queryParams.subscribe(params => {
      if(params['previousUrl']){
        this.previousUrl = params['previousUrl'];
      }
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

  back() {
    const extras = (this.previousUrl.includes('/admin/dashboard/products')) ? { queryParams: { previousUrl: this.previousUrl } } : {};

    this.router.navigate(
      ['/admin/dashboard/parameters/add', this.properties.id, 'add-secondary', this.properties.idSubParameter],
      extras
    );
  }
}
