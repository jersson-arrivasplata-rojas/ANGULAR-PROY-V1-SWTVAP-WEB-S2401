import { Component, OnInit } from '@angular/core';
import { catchError, mergeMap, of } from 'rxjs';
import { CategoryHttp } from 'src/app/shared/http/categories.http';
import { CategoryCatalogsHttp } from 'src/app/shared/http/category-catalogs.http';
import { ProductCategoriesHttp } from 'src/app/shared/http/product-categories.http';


@Component({
  selector: 'app-admin-dashboard-categories',
  templateUrl: './admin-dashboard-categories.component.html',
  styleUrls: ['./admin-dashboard-categories.component.css']
})
export class AdminDashboardCategoriesComponent implements OnInit {

  data: any[] = [];
  item = {};
  addItem = false;
  updateItem = false;
  showItem = false;
  constructor(private categoryHttp: CategoryHttp, private categoryCatalagHttp: CategoryCatalogsHttp,
    private productCategoriesHttp: ProductCategoriesHttp) { }

  ngOnInit() {
    this.categoryHttp.getAll().pipe(
      mergeMap(categoryData => {
        this.data = categoryData;
        return this.categoryCatalagHttp.getAll();
      }),
      mergeMap(categoryCatalogs => {

        this.data.map((category: any) => {
          category.catalogs = categoryCatalogs.filter(categoryCatalog => categoryCatalog.category.categoryId === category.categoryId && !categoryCatalog.catalog.deletedAt);
        });

        return this.productCategoriesHttp.getAll();
      }),
    ).pipe(
      catchError(error => {
        console.error('Error al consultar datos:', error);
        return of([]); // Devuelve un observable vac&iacute;o para que la cadena de observables pueda continuar
      })
    ).subscribe((productCategories) => {
      this.data.map((category: any) => {
        category.products = productCategories.filter(productCategory => productCategory.category.categoryId === category.categoryId);
      });
    });
  }

  handleAdded(data: any) {
    this.categoryHttp.add(data).subscribe((item) => {
      this.updateItem = false;
      this.showItem = false;
      this.addItem = false;
      item.catalogs = [];
      item.products = [];
      this.data.push(item);
      (window as any).success("¡Guardado!");
    });
  }

  handleUpdated(item: any) {
    this.data = this.data.map((data) => {
      if (data.categoryId === item.categoryId) {
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
