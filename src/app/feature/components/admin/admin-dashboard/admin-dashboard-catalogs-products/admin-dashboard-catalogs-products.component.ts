import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { TypesEnum } from 'src/app/shared/config/types.enum';
import { CatalogHttp } from 'src/app/shared/http/catalogs.http';
import { ProductCatalogsHttp } from 'src/app/shared/http/product-catalogs.http';
import { ProductHttp } from 'src/app/shared/http/products.http';


@Component({
  selector: 'app-admin-dashboard-catalogs-products',
  templateUrl: './admin-dashboard-catalogs-products.component.html',
  styleUrls: ['./admin-dashboard-catalogs-products.component.css']
})
export class AdminDashboardCatalogsProductsComponent implements OnInit {

  data: any[] = [];
  item = {};
  properties = {
    id: 0,
    type: '',
    deletedAt: ''
  };
  typesEnum = TypesEnum;

  addItem = false;
  updateItem = false;
  showItem = false;
  constructor(private productHttp: ProductHttp, private catalogHttp: CatalogHttp,
    private productCatalogsHttp: ProductCatalogsHttp, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const fullPath = this.router.url; // Obten la ruta completa
    const segments = fullPath.split('/'); // Divide la ruta en segmentos
    this.properties.type = segments[segments.length - 3];

    this.activatedRoute.params
      .pipe(
        mergeMap(params => {
          this.properties.id = +params['id'];
          return this.properties.type === TypesEnum.CATALOGS ? this.catalogHttp.getById(this.properties.id) : this.productHttp.getById(this.properties.id);
        }),
        mergeMap(item => {
          this.properties.deletedAt = item.deletedAt;
          return this.properties.type === TypesEnum.CATALOGS ? this.productHttp.getAll() : this.catalogHttp.getAll();
        }),
        mergeMap(data => {
          this.data = data;
          return this.productCatalogsHttp.getAll();
        })
      )
      .subscribe(productcatalogs => {
        const allProductcatalogs = productcatalogs.filter(item => {
          if (this.properties.type === TypesEnum.PRODUCTS) {
            return item.product.productId === this.properties.id;
          } else {
            return item.catalog.catalogId === this.properties.id;
          }
        });
        let ids = [...new Set(allProductcatalogs.map(item => {
          return this.properties.type === TypesEnum.PRODUCTS ? item.catalog.catalogId : item.product.productId;
        }))];

        this.data.forEach(item => {
          if (ids.includes((item.catalogId || item.productId))) {
            const id = allProductcatalogs.find(f=> f.catalog.catalogId === item.catalogId || f.product.productId === item.productId).id;
            item.relationship = true;
            item.productcatalogId = id;
          }
        });
      });
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

  getType() {
    return this.properties.type === TypesEnum.CATALOGS ? 'Lista de Productos' : 'Lista de Cat\u00E1logos';
  }

  back(){
    this.router.navigate([`/admin/dashboard/${(this.properties.type === TypesEnum.CATALOGS)?'catalogs':'products'}`]);
  }
}
