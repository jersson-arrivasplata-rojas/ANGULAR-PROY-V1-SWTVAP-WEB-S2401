import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDiscountsHttp } from 'src/app/shared/http/product-discounts.http';

@Component({
  selector: 'app-component-list-products-discounts',
  templateUrl: './component-list-products-discounts.component.html',
  styleUrls: ['./component-list-products-discounts.component.scss'],
})
export class ComponentListProductsDiscountsComponent {
  @Input() data: any[] = [];
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() showed: EventEmitter<any> = new EventEmitter();

  item: any;

  showItem = false;

  constructor(private productDiscountsHttp: ProductDiscountsHttp, private router:Router) {}

  show(item: any) {
    if (item.productDiscountId === this.item?.productDiscountId && this.showItem) {
      this.showItem = !this.showItem;
      return;
    }
    this.productDiscountsHttp.getById(item.productDiscountId).subscribe((response) => {
      this.item = response;
      if (!this.showItem) this.showItem = !this.showItem;
      this.showed.emit({item: this.item, showItem: this.showItem});
    });
  }

  async delete(item: any) {
    let text = '¡Presiona el bot\xf3n para eliminar!';
    if (await confirm(text) === true) {
      this.productDiscountsHttp.delete(item.productDiscountId).subscribe(() => {
        item.deleted = true;
        this.data = this.data.filter((f) => f.productDiscountId !== item.productDiscountId);
        this.deleted.emit(this.data);
        (window as any).success('¡Eliminado!');
      });
    }
  }

  update(item: any) {
    this.updated.emit(item);
  }
}
