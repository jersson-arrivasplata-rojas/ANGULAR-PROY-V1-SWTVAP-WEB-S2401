import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { TypesEnum } from 'src/app/shared/config/types.enum';
import { ProductProvidersHttp } from 'src/app/shared/http/product-providers.http';
import { ProductHttp } from 'src/app/shared/http/products.http';
import { ProviderHttp } from 'src/app/shared/http/providers.http';


@Component({
  selector: 'app-admin-dashboard-providers-products',
  templateUrl: './admin-dashboard-providers-products.component.html',
  styleUrls: ['./admin-dashboard-providers-products.component.css']
})
export class AdminDashboardProvidersProductsComponent implements OnInit {

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
  constructor(private productHttp: ProductHttp, private providerHttp: ProviderHttp,
    private productProvidersHttp: ProductProvidersHttp, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const fullPath = this.router.url; // Obten la ruta completa
    const segments = fullPath.split('/'); // Divide la ruta en segmentos
    this.properties.type = segments[segments.length - 3];

    this.activatedRoute.params
      .pipe(
        mergeMap(params => {
          this.properties.id = +params['id'];
          return this.properties.type === TypesEnum.PROVIDERS ? this.providerHttp.getById(this.properties.id) : this.productHttp.getById(this.properties.id);
        }),
        mergeMap(item => {
          this.properties.deletedAt = item.deletedAt;
          return this.properties.type === TypesEnum.PROVIDERS ? this.productHttp.getAll() : this.providerHttp.getAll();
        }),
        mergeMap(data => {
          this.data = data;
          return this.productProvidersHttp.getAll();
        })
      )
      .subscribe(productProviders => {
        const allProductProviders = productProviders.filter(item => {
          if (this.properties.type === TypesEnum.PRODUCTS) {
            return item.product.productId === this.properties.id;
          } else {
            return item.provider.providerId === this.properties.id;
          }
        });
        let ids = [...new Set(allProductProviders.map(item => {
          return this.properties.type === TypesEnum.PRODUCTS ? item.provider.providerId : item.product.productId;
        }))];

        this.data.forEach(item => {
          if (ids.includes((item.providerId || item.productId))) {
            const id = allProductProviders.find(f=> f.provider.providerId === item.providerId || f.product.productId === item.productId).id;
            item.relationship = true;
            item.productProviderId = id;
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
    return this.properties.type === TypesEnum.PROVIDERS ? 'Lista de Productos' : 'Lista de Proveedores';
  }

  back(){
    this.router.navigate([`/admin/dashboard/${(this.properties.type === TypesEnum.PROVIDERS)?'providers':'products'}`]);
  }
}
