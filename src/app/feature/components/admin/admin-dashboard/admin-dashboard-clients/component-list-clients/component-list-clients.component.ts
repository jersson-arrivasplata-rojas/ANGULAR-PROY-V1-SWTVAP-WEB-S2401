import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientHttp } from 'src/app/shared/http/clients.http';

@Component({
  selector: 'app-component-list-clients',
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

  delete(item: any) {
    let text = 'Presiona el bot\xf3n para eliminar! ';
    if (confirm(text) === true) {
      this.clientHttp.delete(item.clientId).subscribe(() => {
        item.deleted = true;
        this.data = this.data.filter((f) => f.clientId !== item.clientId);
        this.deleted.emit(this.data);
      });
    }
  }

  update(item: any) {
    this.updated.emit(item);
  }
}
