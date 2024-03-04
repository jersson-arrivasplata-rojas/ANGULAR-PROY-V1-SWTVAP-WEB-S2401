import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map } from 'rxjs';
import { TypesEnum } from 'src/app/shared/config/types.enum';
import { CatalogHttp } from 'src/app/shared/http/catalogs.http';
import { ProductCatalogsHttp } from 'src/app/shared/http/product-catalogs.http';
import { ProductHttp } from 'src/app/shared/http/products.http';

@Component({
  selector: 'swtvap-component-list-catalogs-products',
  templateUrl: './component-list-catalogs-products.component.html',
  styleUrls: ['./component-list-catalogs-products.component.scss'],
})
export class ComponentListCatalogsProductsComponent {
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

  constructor(private catalogHttp: CatalogHttp, private productHttp: ProductHttp, private productCatalogsHttp: ProductCatalogsHttp) { }

  show(item: any) {
    if (item.productId === this.item?.productId && this.showItem ||
      item.catalogId === this.item?.catalogId && this.showItem) {
      this.showItem = !this.showItem;
      return;
    }

    const observable$ = item.catalogId ? this.catalogHttp.getById(item.catalogId) :
      this.productHttp.getById(item.productId);

    observable$
      .pipe(
        map((response: any) => {
          this.data.map((f) => {
            if (f.productId === response.productId || f.catalogId === response.catalogId) {
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
      this.productCatalogsHttp.delete(item.productcatalogId).subscribe(() => {
        this.data.map((f) => {
          if (f.productcatalogId === item.productcatalogId) {
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
      let data = { product:{ productId: 0 }, catalog: { catalogId: 0 } };

      if(this.properties.type === TypesEnum.PRODUCTS) {
        data.product.productId = this.properties.id;
        data.catalog.catalogId = item.catalogId;
      }else{
        data.catalog.catalogId = this.properties.id;
        data.product.productId = item.productId;
      }

      this.productCatalogsHttp.add(data).subscribe((response) => {
        this.data.map((f) => {
          if (f.productId === response.product.productId || f.catalogId === response.catalog.catalogId) {
            f.relationship = true;
            f.productcatalogId = response.id;
          }
        });
        (window as any).success("¡Guardado!");
      });
    }
  }
}
