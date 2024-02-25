import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map } from 'rxjs';
import { TypesEnum } from 'src/app/shared/config/types.enum';
import { CategoryHttp } from 'src/app/shared/http/categories.http';
import { ProductCategoriesHttp } from 'src/app/shared/http/product-categories.http';
import { ProductHttp } from 'src/app/shared/http/products.http';

@Component({
  selector: 'app-component-list-categories-products',
  templateUrl: './component-list-categories-products.component.html',
  styleUrls: ['./component-list-categories-products.component.scss'],
})
export class ComponentListCategoriesProductsComponent {
  @Input() data: any[] = [];
  @Input() properties = {
    id: 0,
    type: '',
    deletedAt: ''
  };

  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() showed: EventEmitter<any> = new EventEmitter();

  typesEnum = TypesEnum;

  item: any;

  showItem = false;

  constructor(private categoryHttp: CategoryHttp, private productHttp: ProductHttp, private productCategoriesHttp: ProductCategoriesHttp) { }

  show(item: any) {
    if (item.productId === this.item?.productId && this.showItem ||
      item.categoryId === this.item?.categoryId && this.showItem) {
      this.showItem = !this.showItem;
      return;
    }

    const observable$ = item.categoryId ? this.categoryHttp.getById(item.categoryId) :
      this.productHttp.getById(item.productId);

    observable$
      .pipe(
        map((response: any) => {
          this.data.map((f) => {
            if (f.productId === response.productId || f.categoryId === response.categoryId) {
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

  async delete(item: any) {
    let text = '¡Presiona el bot\xf3n para eliminar!';
    if (await confirm(text) === true) {
      this.productCategoriesHttp.delete(item.productCategoryId).subscribe(() => {
        this.data.map((f) => {
          if (f.productCategoryId === item.productCategoryId) {
            f.relationship = false;
          }
        });
        this.deleted.emit(this.data);
        (window as any).success('¡Eliminado!');
      });
    }
  }

  async add(item: any) {
    let text = 'Presiona el bot\xf3n para continuar! ';
    if (await confirm(text) === true) {
      let data = { product:{ productId: 0 }, category: { categoryId: 0 } };

      if(this.properties.type === TypesEnum.PRODUCTS) {
        data.product.productId = this.properties.id;
        data.category.categoryId = item.categoryId;
      }else{
        data.category.categoryId = this.properties.id;
        data.product.productId = item.productId;
      }

      this.productCategoriesHttp.add(data).subscribe((response) => {
        this.data.map((f) => {
          if (f.productId === response.product.productId || f.categoryId === response.category.categoryId) {
            f.relationship = true;
            f.productCategoryId = response.id;
          }
        });
        (window as any).success("¡Guardado!");
      });
    }
  }

  findDeletedAtInData() {
    return this.data.some(item => 'deletedAt' in item);
  }
}
