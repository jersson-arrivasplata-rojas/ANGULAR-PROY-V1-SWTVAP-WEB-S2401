import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map } from 'rxjs';
import { TypesEnum } from 'src/app/shared/config/types.enum';
import { ProductProvidersHttp } from 'src/app/shared/http/product-providers.http';
import { ProductHttp } from 'src/app/shared/http/products.http';
import { ProviderHttp } from 'src/app/shared/http/providers.http';

@Component({
  selector: 'app-component-list-providers-products',
  templateUrl: './component-list-providers-products.component.html',
  styleUrls: ['./component-list-providers-products.component.scss'],
})
export class ComponentListProvidersProductsComponent {
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

  constructor(private providerHttp: ProviderHttp, private productHttp: ProductHttp, private productProvidersHttp: ProductProvidersHttp) { }

  show(item: any) {
    if (item.productId === this.item?.productId && this.showItem ||
      item.providerId === this.item?.providerId && this.showItem) {
      this.showItem = !this.showItem;
      return;
    }

    const observable$ = item.providerId ? this.providerHttp.getById(item.providerId) :
      this.productHttp.getById(item.productId);

    observable$
      .pipe(
        map((response: any) => {
          this.data.map((f) => {
            if (f.productId === response.productId || f.providerId === response.providerId) {
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
      this.productProvidersHttp.delete(item.productProviderId).subscribe(() => {
        this.data.map((f) => {
          if (f.productProviderId === item.productProviderId) {
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
      let data = { product:{ productId: 0 }, provider: { providerId: 0 } };

      if(this.properties.type === TypesEnum.PRODUCTS) {
        data.product.productId = this.properties.id;
        data.provider.providerId = item.providerId;
      }else{
        data.provider.providerId = this.properties.id;
        data.product.productId = item.productId;
      }

      this.productProvidersHttp.add(data).subscribe((response) => {
        this.data.map((f) => {
          if (f.productId === response.product.productId || f.providerId === response.provider.providerId) {
            f.relationship = true;
            f.productProviderId = response.id;
          }
        });
        (window as any).success("¡Guardado!");
      });
    }
  }
}
