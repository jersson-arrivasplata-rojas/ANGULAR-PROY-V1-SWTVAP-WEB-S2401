import { Component, OnInit } from '@angular/core';
import { catchError, mergeMap, of } from 'rxjs';
import { ProductCategoriesHttp } from 'src/app/shared/http/product-categories.http';
import { ProductProvidersHttp } from 'src/app/shared/http/product-providers.http';
import { ProductUnitsHttp } from 'src/app/shared/http/product-units.http';
import { ProductHttp } from 'src/app/shared/http/products.http';


@Component({
  selector: 'app-admin-dashboard-products',
  templateUrl: './admin-dashboard-products.component.html',
  styleUrls: ['./admin-dashboard-products.component.css']
})
export class AdminDashboardProductsComponent implements OnInit {

  data: any[] = [];
  item = {};
  addItem = false;
  updateItem = false;
  showItem = false;
  constructor(private productHttp: ProductHttp, private productCategoriesHttp: ProductCategoriesHttp,
    private productProvidersHttp: ProductProvidersHttp, private productUnitsHttp: ProductUnitsHttp) { }

  ngOnInit() {
    this.productHttp.getAll().pipe(
      mergeMap(productData => {
        this.data = productData;
        return this.productCategoriesHttp.getAll();
      }),
      mergeMap(productCategories => {
        this.data.map((product: any) => {
          product.categories = productCategories.filter(productCategory => productCategory.product.productId === product.productId);
        });
        return this.productProvidersHttp.getAll();
      }),
      mergeMap(productProviders => {
        this.data.map((product: any) => {
          product.providers = productProviders.filter(productProvider => productProvider.product.productId === product.productId);
        });
        return this.productUnitsHttp.getAll();
      })
    ).pipe(
      catchError(error => {
        console.error('Error al consultar datos:', error);
        return of([]); // Devuelve un observable vacío para que la cadena de observables pueda continuar
      })
    ).subscribe((productUnits) => {
      this.data.map((product: any) => {
        product.units = productUnits.filter(productUnit => productUnit.product.productId === product.productId);
      });
    });
  }

  handleAdded(data: any) {
    this.productHttp.add(data).subscribe((data) => {
      this.data.push(data);
      this.updateItem = false;
      this.showItem = false;
      this.addItem = false;
    });
  }

  handleUpdated(item: any) {
    this.data = this.data.map((response) => {
      if (response.productId === item.productId) {
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
