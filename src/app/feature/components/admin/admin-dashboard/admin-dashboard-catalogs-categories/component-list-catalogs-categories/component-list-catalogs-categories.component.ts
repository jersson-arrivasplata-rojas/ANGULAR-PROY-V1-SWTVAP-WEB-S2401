import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map } from 'rxjs';
import { TypesEnum } from 'src/app/shared/config/types.enum';
import { CatalogHttp } from 'src/app/shared/http/catalogs.http';
import { CategoryHttp } from 'src/app/shared/http/categories.http';
import { CategoryCatalogsHttp } from 'src/app/shared/http/category-catalogs.http';

@Component({
  selector: 'app-component-list-catalogs-categories',
  templateUrl: './component-list-catalogs-categories.component.html',
  styleUrls: ['./component-list-catalogs-categories.component.scss'],
})
export class ComponentListCatalogsCategoriesComponent {
  @Input() data: any[] = [];
  @Input() properties = {
    id: 0,
    type: ''
  };

  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() showed: EventEmitter<any> = new EventEmitter();

  typesEnum = TypesEnum;

  item: any;

  showItem = false;

  constructor(private catalogHttp: CatalogHttp, private categoryHttp: CategoryHttp, private categoryCatalogsHttp: CategoryCatalogsHttp) { }

  show(item: any) {
    if (item.catalogId === this.item?.catalogId && this.showItem ||
      item.categoryId === this.item?.categoryId && this.showItem) {
      this.showItem = !this.showItem;
      return;
    }

    const observable$ = item.categoryId ? this.categoryHttp.getById(item.categoryId) :
      this.catalogHttp.getById(item.catalogId);

    observable$
      .pipe(
        map((response: any) => {
          this.data.map((f) => {
            if (f.catalogId === response.catalogId || f.categoryId === response.categoryId) {
              response.relationship = f.relationship;
            }
          });
          return response;
        })
      )
      .subscribe((response) => {
        this.item = response;
        if (!this.showItem) this.showItem = !this.showItem;
        this.showed.emit({ item: this.item, showItem: this.showItem });
      });
  }

  delete(item: any) {
    let text = 'Presiona el bot\xf3n para eliminar! ';
    if (confirm(text) === true) {
      this.categoryCatalogsHttp.delete(item.categoryCatalogId).subscribe(() => {
        this.data.map((f) => {
          if (f.categoryCatalogId === item.categoryCatalogId) {
            f.relationship = false;
          }
        });
        this.deleted.emit(this.data);
      });
    }
  }

  add(item: any) {
    let text = 'Presiona el bot\xf3n para continuar! ';
    if (confirm(text) === true) {
      let data = { catalog:{ catalogId: 0 }, category: { categoryId: 0 } };

      if(this.properties.type === TypesEnum.CATALOGS) {
        data.catalog.catalogId = this.properties.id;
        data.category.categoryId = item.categoryId;
      }else{
        data.category.categoryId = this.properties.id;
        data.catalog.catalogId = item.catalogId;
      }

      this.categoryCatalogsHttp.add(data).subscribe((response) => {
        this.data.map((f) => {
          if (f.catalogId === response.catalog.catalogId || f.categoryId === response.category.categoryId) {
            f.relationship = true;
            f.categoryCatalogId = response.id;
          }
        });
      });
    }
  }
}
