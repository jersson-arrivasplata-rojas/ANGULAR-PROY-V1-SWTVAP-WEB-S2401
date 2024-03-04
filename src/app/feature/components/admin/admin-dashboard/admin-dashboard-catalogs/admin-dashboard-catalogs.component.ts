import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs';
import { CatalogHttp } from 'src/app/shared/http/catalogs.http';
import { CategoryCatalogsHttp } from 'src/app/shared/http/category-catalogs.http';
import { ProductCatalogsHttp } from 'src/app/shared/http/product-catalogs.http';


@Component({
  selector: 'swtvap-admin-dashboard-catalogs',
  templateUrl: './admin-dashboard-catalogs.component.html',
  styleUrls: ['./admin-dashboard-catalogs.component.css']
})
export class AdminDashboardCatalogsComponent implements OnInit {

  data: any[] = [];
  dataFilter: any[] = [];
  item = {};
  searchTerm = '';
  addItem = false;
  updateItem = false;
  showItem = false;

  constructor(private catalogHttp: CatalogHttp, private categoryCatalagHttp: CategoryCatalogsHttp,
    private productCatalogsHttp: ProductCatalogsHttp, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.catalogHttp.getAll().pipe(
      mergeMap(catalogData => {
        this.data = catalogData;
        return this.categoryCatalagHttp.getAll();
      }),
      mergeMap(categoryCatalogs => {
        this.data.map((catalog: any) => {
          catalog.categories = categoryCatalogs.filter(categoryCatalog => categoryCatalog.catalog.catalogId === catalog.catalogId && !categoryCatalog.category.deletedAt);
        });
        return this.productCatalogsHttp.getAll();
      })
    ).subscribe((productCatalogs) => {
      this.data.map((catalog: any) => {
        catalog.products = productCatalogs.filter(productCatalog => productCatalog.catalog.catalogId === catalog.catalogId && !productCatalog.product.deletedAt);
      });
    });
  }

  handleAdded(data: any) {
    this.catalogHttp.add(data).subscribe((data) => {
      this.data.push(data);
      this.updateItem = false;
      this.showItem = false;
      this.addItem = false;
      (window as any).success("¡Guardado!");
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

  onPageChange({ page, data}) {
    console.log(page, data);
    //this.data = data;
    this.dataFilter = data;
    this.cdr.detectChanges();
  }
}
