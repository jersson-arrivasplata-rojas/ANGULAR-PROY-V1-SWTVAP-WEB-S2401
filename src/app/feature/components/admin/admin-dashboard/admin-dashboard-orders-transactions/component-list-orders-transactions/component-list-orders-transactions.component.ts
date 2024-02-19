import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderTransactionsHttp } from 'src/app/shared/http/order-transactions.http';

@Component({
  selector: 'app-component-list-orders-transactions',
  templateUrl: './component-list-orders-transactions.component.html',
  styleUrls: ['./component-list-orders-transactions.component.scss'],
})
export class ComponentListOrdersTransactionsComponent {
  @Input() data: any[] = [];
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() showed: EventEmitter<any> = new EventEmitter();

  item: any;

  showItem = false;

  constructor(private orderTransactionsHttp: OrderTransactionsHttp) {}

  show(item: any) {
    if (item.orderTransactionId === this.item?.orderTransactionId && this.showItem) {
      this.showItem = !this.showItem;
      return;
    }
    this.orderTransactionsHttp.getById(item.orderTransactionId).subscribe((response) => {
      this.item = response;
      if (!this.showItem) this.showItem = !this.showItem;
      this.showed.emit({item: this.item, showItem: this.showItem});
    });
  }

  async delete(item: any) {
    let text = '¡Presiona el bot\xf3n para eliminar!';
    if (await confirm(text) === true) {
      this.orderTransactionsHttp.delete(item.orderTransactionId).subscribe(() => {
        item.deleted = true;
        this.data = this.data.filter((f) => f.orderTransactionId !== item.orderTransactionId);
        this.deleted.emit(this.data);
        (window as any).success('¡Eliminado!');
      });
    }
  }

  update(item: any) {
    this.updated.emit(item);
  }
}
