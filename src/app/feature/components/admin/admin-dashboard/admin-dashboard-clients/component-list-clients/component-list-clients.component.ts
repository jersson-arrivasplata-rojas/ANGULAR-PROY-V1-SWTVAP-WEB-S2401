import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientHttp } from 'src/app/shared/http/clients.http';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'swtvap-component-list-clients',
  templateUrl: './component-list-clients.component.html',
  styleUrls: ['./component-list-clients.component.scss'],
})
export class ComponentListClientsComponent {
  @Input() data: any[] = [];
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() showed: EventEmitter<any> = new EventEmitter();

  item: any;

  showItem = false;
  searchTerm = '';

  constructor(private clientHttp: ClientHttp) {}

  show(item: any) {
    if (item.clientId === this.item?.clientId && this.showItem) {
      this.showItem = !this.showItem;
      return;
    }
    this.clientHttp.getById(item.clientId).subscribe((response) => {
      this.item = response;
      if (!this.showItem) this.showItem = !this.showItem;
      this.showed.emit({item: this.item, showItem: this.showItem});
    });
  }

  async delete(item: any) {
    let text = '¡Presiona el bot\xf3n para eliminar!';
    if (await confirm(text) === true) {
      this.clientHttp.delete(item.clientId).subscribe(() => {
        item.deleted = true;
        this.data = this.data.map((f) => {
          if (f.clientId === item.clientId) {
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
