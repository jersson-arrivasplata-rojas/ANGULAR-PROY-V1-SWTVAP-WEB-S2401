import { Component, OnInit } from '@angular/core';
import { catchError, mergeMap, of } from 'rxjs';
import { CatalogHttp } from 'src/app/shared/http/catalogs.http';
import { CategoryCatalogsHttp } from 'src/app/shared/http/category-catalogs.http';


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
  constructor(private catalogHttp: CatalogHttp, private categoryCatalagHttp: CategoryCatalogsHttp) { }

  ngOnInit() {
    this.catalogHttp.getAll().pipe(
      mergeMap(catalogData => {
        this.data = catalogData;
        return this.categoryCatalagHttp.getAll();
      })
    ).pipe(
      catchError(error => {
        console.error('Error al consultar datos:', error);
        return of([]); // Devuelve un observable vac&iacute;o para que la cadena de observables pueda continuar
      })
    ).subscribe((categoryCatalogs) => {
      this.data.map((catalog: any) => {
        catalog.categories = categoryCatalogs.filter(categoryCatalog => categoryCatalog.catalog.catalogId === catalog.catalogId);
      });
    });
  }

  handleAdded(data: any) {
    this.catalogHttp.add(data).subscribe((data) => {
      this.data.push(data);
      this.updateItem = false;
      this.showItem = false;
      this.addItem = false;
    });
  }

  handleUpdated(item: any) {
    this.data = this.data.map((data) => {
      if (data.catalogId === item.catalogId) {
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
