import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { TypesEnum } from 'src/app/shared/config/types.enum';
import { CategoryHttp } from 'src/app/shared/http/categories.http';
import { ProductCategoriesHttp } from 'src/app/shared/http/product-categories.http';
import { ProductHttp } from 'src/app/shared/http/products.http';


@Component({
  selector: 'app-admin-dashboard-categories-products',
  templateUrl: './admin-dashboard-categories-products.component.html',
  styleUrls: ['./admin-dashboard-categories-products.component.css']
})
export class AdminDashboardCategoriesProductsComponent implements OnInit {

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
  constructor(private productHttp: ProductHttp, private categoryHttp: CategoryHttp,
    private productCategoriesHttp: ProductCategoriesHttp, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const fullPath = this.router.url; // Obten la ruta completa
    const segments = fullPath.split('/'); // Divide la ruta en segmentos
    this.properties.type = segments[segments.length - 3];

    this.activatedRoute.params
      .pipe(
        mergeMap(params => {
          this.properties.id = +params['id'];
          return this.properties.type === TypesEnum.CATEGORIES ? this.categoryHttp.getById(this.properties.id) : this.productHttp.getById(this.properties.id);
        }),
        mergeMap(item => {
          this.properties.deletedAt = item.deletedAt;
          return this.properties.type === TypesEnum.CATEGORIES ? this.productHttp.getAll() : this.categoryHttp.getAll();
        }),
        mergeMap(data => {
          this.data = data;
          return this.productCategoriesHttp.getAll();
        })
      )
      .subscribe(productCategorys => {
        const allProductCategorys = productCategorys.filter(item => {
          if (this.properties.type === TypesEnum.PRODUCTS) {
            return item.product.productId === this.properties.id;
          } else {
            return item.category.categoryId === this.properties.id;
          }
        });
        let ids = [...new Set(allProductCategorys.map(item => {
          return this.properties.type === TypesEnum.PRODUCTS ? item.category.categoryId : item.product.productId;
        }))];

        this.data.forEach(item => {
          if (ids.includes((item.categoryId || item.productId))) {
            const id = allProductCategorys.find(f=> f.category.categoryId === item.categoryId || f.product.productId === item.productId).id;
            item.relationship = true;
            item.productCategoryId = id;
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
    return this.properties.type === TypesEnum.CATEGORIES ? 'Lista de Productos' : 'Lista de Categor\u00EDas';
  }

  back(){
    this.router.navigate([`/admin/dashboard/${(this.properties.type === TypesEnum.CATEGORIES)?'categories':'products'}`]);
  }
}
