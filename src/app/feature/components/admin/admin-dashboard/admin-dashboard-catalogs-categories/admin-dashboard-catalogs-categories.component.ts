import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { TypesEnum } from 'src/app/shared/config/types.enum';
import { CatalogHttp } from 'src/app/shared/http/catalogs.http';
import { CategoryHttp } from 'src/app/shared/http/categories.http';
import { CategoryCatalogsHttp } from 'src/app/shared/http/category-catalogs.http';


@Component({
  selector: 'app-admin-dashboard-catalogs-categories',
  templateUrl: './admin-dashboard-catalogs-categories.component.html',
  styleUrls: ['./admin-dashboard-catalogs-categories.component.css']
})
export class AdminDashboardCatalogsCategoriesComponent implements OnInit {

  data: any[] = [];
  item = {};
  properties = {
    id: 0,
    type: ''
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
          return this.properties.type === TypesEnum.CATALOGS ? this.categoryHttp.getAll() : this.catalogHttp.getAll();
        }),
        mergeMap(data => {
          this.data = data;
          return this.categoryCatalagHttp.getAll();
        })
      )
      .subscribe(categoryCatalogs => {
        for (let item of this.data) {
          if (item.categoryId === this.properties.id || item.catalogId === this.properties.id) {
            for (let categoryCatalog of categoryCatalogs) {
              const idToCompare = this.properties.type === TypesEnum.CATALOGS
                ? categoryCatalog.category.categoryId
                : categoryCatalog.catalog.catalogId;

              if (this.properties.id === idToCompare) {
                item.relationship = true;
                break;
              }
              item.categoryCatalogId = categoryCatalog.id;
            }
          }
        }
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
    return this.properties.type === TypesEnum.CATALOGS ? 'Lista de Categorías' : 'Lista de Catálogos';
  }
}
