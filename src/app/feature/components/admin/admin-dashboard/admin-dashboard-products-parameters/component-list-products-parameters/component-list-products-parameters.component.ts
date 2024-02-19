import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductParametersHttp } from 'src/app/shared/http/product-parameters.http';

@Component({
  selector: 'app-component-list-products-parameters',
  templateUrl: './component-list-products-parameters.component.html',
  styleUrls: ['./component-list-products-parameters.component.scss'],
})
export class ComponentListProductsParametersComponent {
  @Input() data: any[] = [];
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() showed: EventEmitter<any> = new EventEmitter();

  item: any;

  showItem = false;

  constructor(private productParametersHttp: ProductParametersHttp, private router:Router) {}

  show(item: any) {
    if (item.productParameterId === this.item?.productParameterId && this.showItem) {
      this.showItem = !this.showItem;
      return;
    }
    this.productParametersHttp.getById(item.productParameterId).subscribe((response) => {
      this.item = this.data.find((p) => p.productParameterId === response.productParameterId)

      if (!this.showItem) this.showItem = !this.showItem;
      this.showed.emit({item: this.item, showItem: this.showItem});
    });
  }

  async delete(item: any) {
    let text = '¡Presiona el bot\xf3n para eliminar!';
    if (await confirm(text) === true) {
      this.productParametersHttp.delete(item.productParameterId).subscribe(() => {
        item.deleted = true;
        this.data = this.data.filter((f) => f.productParameterId !== item.productParameterId);
        this.deleted.emit(this.data);
        (window as any).success('¡Eliminado!');
      });
    }
  }

  update(item: any) {
    this.updated.emit(item);
  }
}
