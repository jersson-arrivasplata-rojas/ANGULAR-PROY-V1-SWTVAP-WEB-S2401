import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderAmountsHttp } from 'src/app/shared/http/order-amounts.http';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'swtvap-component-list-orders-amounts',
  templateUrl: './component-list-orders-amounts.component.html',
  styleUrls: ['./component-list-orders-amounts.component.scss'],
})
export class ComponentListOrdersAmountsComponent {
  @Input() data: any[] = [];
  @Input() order;
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() showed: EventEmitter<any> = new EventEmitter();

  item: any;

  showItem = false;
  searchTerm = '';

  constructor(private orderAmountsHttp: OrderAmountsHttp) {}

  show(item: any) {
    if (item.orderAmountId === this.item?.orderAmountId && this.showItem) {
      this.showItem = !this.showItem;
      return;
    }
    this.orderAmountsHttp.getById(item.orderAmountId).subscribe((response) => {
      this.item = response;
      if (!this.showItem) this.showItem = !this.showItem;
      this.showed.emit({item: this.item, showItem: this.showItem});
    });
  }

  async delete(item: any) {
    let text = '¡Presiona el bot\xf3n para eliminar!';
    if (await confirm(text) === true) {
      this.orderAmountsHttp.delete(item.orderAmountId).subscribe(() => {
        item.deleted = true;
        this.data = this.data.map((f) => {
          if (f.orderAmountId === item.orderAmountId) {
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
}
