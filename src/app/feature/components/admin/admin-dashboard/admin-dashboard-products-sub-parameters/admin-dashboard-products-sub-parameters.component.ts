import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { ParameterTree } from 'src/app/shared/class/parameter-tree.class';
import { ParameterHttp } from 'src/app/shared/http/parameters.http';
import { ProductHttp } from 'src/app/shared/http/products.http';


@Component({
  selector: 'app-admin-dashboard-products-sub-parameters',
  templateUrl: './admin-dashboard-products-sub-parameters.component.html',
  styleUrls: ['./admin-dashboard-products-sub-parameters.component.css']
})
export class AdminDashboardProductsSubParametersComponent implements OnInit {

  data: any[] = [];
  dataTree: any[] = [];
  product;
  parameter;
  item;
  addItem = false;
  updateItem = false;
  showItem = false;
  properties = {
    id: 0,
    idParameter: 0,
    idSubParameter: 0
  }

  constructor(private parameterHttp: ParameterHttp, private productHttp: ProductHttp,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.params
      .pipe(
        mergeMap(params => {
          this.properties.id = +params['id'];
          this.properties.idParameter = +params['idParameter'];
          this.properties.idSubParameter = +params['idSubParameter'];
          return this.productHttp.getById(this.properties.id);
        }),
        mergeMap(item => {
          this.product = item;
          return this.parameterHttp.getById(this.properties.idSubParameter);
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
    this.router.navigate(['/admin/dashboard/products/add-parameters', this.properties.id, 'parameters', this.properties.idParameter, 'add-secondary', this.properties.idSubParameter, 'add-tertiary', data.id]);
  }

  back() {
    this.router.navigate(['/admin/dashboard/products/add-parameters', this.properties.id]);
  }
}
