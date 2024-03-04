import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { TypesEnum } from 'src/app/shared/config/types.enum';
import { CatalogHttp } from 'src/app/shared/http/catalogs.http';
import { CategoryHttp } from 'src/app/shared/http/categories.http';
import { CategoryCatalogsHttp } from 'src/app/shared/http/category-catalogs.http';


@Component({
  selector: 'swtvap-admin-dashboard-catalogs-categories',
  templateUrl: './admin-dashboard-catalogs-categories.component.html',
  styleUrls: ['./admin-dashboard-catalogs-categories.component.css']
})
export class AdminDashboardCatalogsCategoriesComponent implements OnInit {

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
  constructor(private catalogHttp: CatalogHttp, private categoryHttp: CategoryHttp,
    private categoryCatalagHttp: CategoryCatalogsHttp, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const fullPath = this.router.url; // Obten la ruta completa
    const segments = fullPath.split('/'); // Divide la ruta en segmentos
    this.properties.type = segments[segments.length - 3];

    this.activatedRoute.params
      .pipe(
        mergeMap(params => {
          this.properties.id = +params['id'];
          return this.properties.type === TypesEnum.CATALOGS ? this.catalogHttp.getById(this.properties.id) : this.categoryHttp.getById(this.properties.id);
        }),
        mergeMap(item => {
          this.properties.deletedAt = item.deletedAt;
          return this.properties.type === TypesEnum.CATALOGS ? this.categoryHttp.getAll() : this.catalogHttp.getAll();
        }),
        mergeMap(data => {
          this.data = data;
          return this.categoryCatalagHttp.getAll();
        })
      )
      .subscribe(categoryCatalogs => {
        const allCatalogCategorys = categoryCatalogs.filter(item => {
          if (this.properties.type === TypesEnum.CATALOGS) {
            return item.catalog.catalogId === this.properties.id;
          } else {
            return item.category.categoryId === this.properties.id;
          }
        });
        let ids = [...new Set(allCatalogCategorys.map(item => {
          return this.properties.type === TypesEnum.CATALOGS ? item.category.categoryId : item.catalog.catalogId;
        }))];

        this.data.forEach(item => {
          if (ids.includes((item.categoryId || item.catalogId))) {
            const id = allCatalogCategorys.find(f=> f.category.categoryId === item.categoryId || f.catalog.catalogId === item.catalogId).id;
            item.relationship = true;
            item.catalogCategoryId = id;
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
    return this.properties.type === TypesEnum.CATALOGS ? 'Lista de Categor\u00EDas' : 'Lista de Cat\u00E1logos';
  }

  back(){
    this.router.navigate([`/admin/dashboard/${(this.properties.type === TypesEnum.CATALOGS)?'catalogs':'categories'}`]);
  }
}
