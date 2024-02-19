import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DispatcheHttp } from 'src/app/shared/http/dispatches.http';
import { ShareDataService } from 'src/app/shared/services/share-data.service';

@Component({
  selector: 'app-component-list-orders-dispatches',
  templateUrl: './component-list-orders-dispatches.component.html',
  styleUrls: ['./component-list-orders-dispatches.component.scss'],
})
export class ComponentListOrdersDispatchesComponent {
  @Input() data: any[] = [];
  @Input() orderId;
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() showed: EventEmitter<any> = new EventEmitter();

  item: any;

  showItem = false;

  constructor(private orderDispatchesHttp: DispatcheHttp, private router: Router,
    private shareDataService: ShareDataService) { }

  show(item: any) {
    if (item.id === this.item?.id && this.showItem) {
      this.showItem = !this.showItem;
      return;
    }
    this.orderDispatchesHttp.getById(item.id).subscribe((response) => {
      this.item = response;
      if (!this.showItem) this.showItem = !this.showItem;
      this.showed.emit({ item: this.item, showItem: this.showItem });
    });
  }

  async delete(item: any) {
    let text = '¡Presiona el bot\xf3n para eliminar!';
    if (await confirm(text) === true) {
      this.orderDispatchesHttp.delete(item.id).subscribe(() => {
        item.deleted = true;
        this.data = this.data.filter((f) => f.id !== item.id);
        this.deleted.emit(this.data);
        (window as any).success('¡Eliminado!');
      });
    }
  }

  update(item: any) {
    this.updated.emit(item);
  }

  addProvider(item: any) {
    this.shareDataService.add(null);
    this.router.navigate(['/admin/dashboard/orders/add-dispatches', this.orderId, 'add-providers', item.id]);
  }
}
