import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OrderHttp } from 'src/app/shared/http/orders.http';

@Component({
  selector: 'app-component-list-orders',
  templateUrl: './component-list-orders.component.html',
  styleUrls: ['./component-list-orders.component.scss'],
})
export class ComponentListOrdersComponent {
  @Input() data: any[] = [];
  @Input() clients: any[] = [];
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() showed: EventEmitter<any> = new EventEmitter();

  item: any;

  showItem = false;

  constructor(private orderHttp: OrderHttp, private router:Router) {}

  show(item: any) {
    if (item.orderId === this.item?.orderId && this.showItem) {
      this.showItem = !this.showItem;
      return;
    }
    this.orderHttp.getById(item.orderId).subscribe((response) => {
      this.item = response;
      if (!this.showItem) this.showItem = !this.showItem;
      this.showed.emit({item: this.item, showItem: this.showItem});
    });
  }

  async delete(item: any) {
    let text = '¡Presiona el bot\xf3n para eliminar!';
    if (await confirm(text) === true) {
      this.orderHttp.delete(item.orderId).subscribe(() => {
        item.deleted = true;
        this.data = this.data.filter((f) => f.orderId !== item.orderId);
        this.deleted.emit(this.data);
        (window as any).success('¡Eliminado!');
      });
    }
  }

  getClientName(clientId: number) {
    return this.clients.find((c) => c.clientId === clientId)?.name;
  }

  update(item: any) {
    this.updated.emit(item);
  }

  addOrderDetails(item: any){
    this.router.navigate(['/admin/dashboard/orders/add-details', item.orderId]);
  }

  addOrderAmounts(item: any){
    this.router.navigate(['/admin/dashboard/orders/add-amounts', item.orderId]);
  }

  addOrderTransactions(item: any){
    this.router.navigate(['/admin/dashboard/orders/add-transactions', item.orderId]);
  }

  addDispatches(item: any){
    this.router.navigate(['/admin/dashboard/orders/add-dispatches', item.orderId]);
  }

  addClient(item: any){
    this.router.navigate(['/admin/dashboard/orders/add-client', item.orderId]);
  }
}
