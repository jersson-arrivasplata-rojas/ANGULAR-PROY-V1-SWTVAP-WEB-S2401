import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderDetailsHttp } from 'src/app/shared/http/order-details.http';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'swtvap-component-list-orders-details',
  templateUrl: './component-list-orders-details.component.html',
  styleUrls: ['./component-list-orders-details.component.scss'],
})
export class ComponentListOrdersDetailsComponent {
  @Input() data: any[] = [];
  @Input() products: any[] = [];
  @Input() order;
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() showed: EventEmitter<any> = new EventEmitter();

  item: any;

  showItem = false;
  searchTerm = '';

  constructor(private orderDetailsHttp: OrderDetailsHttp) {}

  show(item: any) {
    if (item.orderDetailId === this.item?.orderDetailId && this.showItem) {
      this.showItem = !this.showItem;
      return;
    }
    this.orderDetailsHttp.getById(item.orderDetailId).subscribe((response) => {
      this.item = response;
      if (!this.showItem) this.showItem = !this.showItem;
      this.showed.emit({item: this.item, showItem: this.showItem});
    });
  }

  async delete(item: any) {
    let text = '¡Presiona el bot\xf3n para eliminar!';
    if (await confirm(text) === true) {
      this.orderDetailsHttp.delete(item.orderDetailId).subscribe(() => {
        item.deleted = true;
        this.data = this.data.map((f) => {
          if (f.orderDetailId === item.orderDetailId) {
            item.deletedAt = CommonUtils.getDayNow();
            return item;
          }
          return f;
        });
        this.deleted.emit(this.data);
        (window as any).success('¡Eliminado!');
      });
    }
  }

  update(item: any) {
    this.updated.emit(item);
  }

  getProductName(id: number) {
    return this.products.find((f) => f.productId === id)?.name;
  }
}
