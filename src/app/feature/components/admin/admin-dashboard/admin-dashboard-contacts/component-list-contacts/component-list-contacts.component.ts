import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContactHttp } from 'src/app/shared/http/contacts.http';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'swtvap-component-list-contacts',
  templateUrl: './component-list-contacts.component.html',
  styleUrls: ['./component-list-contacts.component.scss'],
})
export class ComponentListContactsComponent {
  @Input() data: any[] = [];
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() showed: EventEmitter<any> = new EventEmitter();

  item: any;

  showItem = false;
  searchTerm = '';

  constructor(private contactHttp: ContactHttp) {}

  show(item: any) {
    if (item.contactId === this.item?.contactId && this.showItem) {
      this.showItem = !this.showItem;
      return;
    }
    this.contactHttp.getById(item.contactId).subscribe((response) => {
      this.item = response;
      if (!this.showItem) this.showItem = !this.showItem;
      this.showed.emit({item: this.item, showItem: this.showItem});
    });
  }

  async delete(item: any) {
    let text = '¡Presiona el bot\xf3n para eliminar!';
    if (await confirm(text) === true) {
      this.contactHttp.delete(item.contactId).subscribe(() => {
        item.deleted = true;
        this.data = this.data.map((f) => {
          if (f.contactId === item.contactId) {
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
