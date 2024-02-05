import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map } from 'rxjs';
import { TypesEnum } from 'src/app/shared/config/types.enum';
import { ProductUnitsHttp } from 'src/app/shared/http/product-units.http';
import { ProductHttp } from 'src/app/shared/http/products.http';
import { UnitHttp } from 'src/app/shared/http/units.http';

@Component({
  selector: 'app-component-list-units-products',
  templateUrl: './component-list-units-products.component.html',
  styleUrls: ['./component-list-units-products.component.scss'],
})
export class ComponentListUnitsProductsComponent {
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

  constructor(private unitHttp: UnitHttp, private productHttp: ProductHttp, private productUnitsHttp: ProductUnitsHttp) { }

  show(item: any) {
    if (item.productId === this.item?.productId && this.showItem ||
      item.unitId === this.item?.unitId && this.showItem) {
      this.showItem = !this.showItem;
      return;
    }

    const observable$ = item.unitId ? this.unitHttp.getById(item.unitId) :
      this.productHttp.getById(item.productId);

    observable$
      .pipe(
        map((response: any) => {
          this.data.map((f) => {
            if (f.productId === response.productId || f.unitId === response.unitId) {
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
      this.productUnitsHttp.delete(item.productUnitId).subscribe(() => {
        this.data.map((f) => {
          if (f.productUnitId === item.productUnitId) {
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
      let data = { product:{ productId: 0 }, unit: { unitId: 0 } };

      if(this.properties.type === TypesEnum.PRODUCTS) {
        data.product.productId = this.properties.id;
        data.unit.unitId = item.unitId;
      }else{
        data.unit.unitId = this.properties.id;
        data.product.productId = item.productId;
      }

      this.productUnitsHttp.add(data).subscribe((response) => {
        this.data.map((f) => {
          if (f.productId === response.product.productId || f.unitId === response.unit.unitId) {
            f.relationship = true;
            f.productUnitId = response.id;
          }
        });
      });
    }
  }
}
