import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { ParameterHttp } from 'src/app/shared/http/parameters.http';
import { ProductParametersHttp } from 'src/app/shared/http/product-parameters.http';
import { ProductHttp } from 'src/app/shared/http/products.http';
import { AdminDashboardProductsParametersPresenter } from './admin-dashboard-products-parameters.presenter';


@Component({
  selector: 'app-admin-dashboard-products-parameters',
  templateUrl: './admin-dashboard-products-parameters.component.html',
  styleUrls: ['./admin-dashboard-products-parameters.component.css'],
  providers: [AdminDashboardProductsParametersPresenter]
})
export class AdminDashboardProductsParametersComponent implements OnInit {

  data: any[] = [];
  parameters: any[] = [];
  product;
  item = {};
  productId = 0;
  addItem = false;
  updateItem = false;
  showItem = false;
  constructor(private productParametersHttp: ProductParametersHttp, private parameterHttp: ParameterHttp,
    private productHttp: ProductHttp, private activatedRoute: ActivatedRoute, private router: Router,
    private presenter: AdminDashboardProductsParametersPresenter) { }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        mergeMap(params => {
          this.productId = +params['id'];
          return this.productHttp.getById(this.productId);
        }),
        mergeMap(item => {
          this.product = item;
          return this.parameterHttp.getAll();
        }),
        mergeMap(parameterData => {
          this.parameters = parameterData;
          return this.productParametersHttp.getAll();
        }),
      ).subscribe((productParametersData) => {
        this.getAllSelectedParameters(productParametersData);
      });
  }

  getAllSelectedParameters(parameters: any[]) {
    this.data = parameters.filter((productParameter) => productParameter.productId === this.productId);
    this.data = this.data.map((parameter) => {
      const response = {
        ...parameter,
        parameter: this.parameters.find((p) => p.id === parseInt(parameter.code) && p.status === true)
      };

      response.parameterParent = this.parameters.find((p) => p.id === response.parameter.parentId);

      return response;
    });
    this.data = this.data.sort((a, b) => a.parameterParent.code.localeCompare(b.parameterParent.code));
  }

  handleAdded(item: any) {
    let data = {
      code: item.id,
      productId: this.productId,
    };
    const filter = this.data.find((parameter) => {
      const data = parseInt(parameter.code) === item.id && parameter.productId === this.productId;
      return data;
    });

    if (!filter) {
      this.productParametersHttp.add(data)
        .pipe(
          mergeMap(data => {
            return this.productParametersHttp.getAll();
          }),
        ).subscribe((productParametersData) => {
          this.getAllSelectedParameters(productParametersData);
          this.updateItem = false;
          this.showItem = false;
          this.addItem = false;
          (window as any).success("¡Guardado!");
        });
    }


  }

  handleUpdated(item: any) {
    this.data = this.data.map((data) => {
      if (data.productParameterId === item.productParameterId) {
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
    this.router.navigate([`/admin/dashboard/products`]);
  }
}
