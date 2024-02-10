import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProviderHttp } from 'src/app/shared/http/providers.http';

@Component({
  selector: 'app-component-list-providers',
  templateUrl: './component-list-providers.component.html',
  styleUrls: ['./component-list-providers.component.scss'],
})
export class ComponentListProvidersComponent {
  @Input() data: any[] = [];
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() showed: EventEmitter<any> = new EventEmitter();

  item: any;

  showItem = false;

  constructor(private providerHttp: ProviderHttp) {}

  show(item: any) {
    if (item.providerId === this.item?.providerId && this.showItem) {
      this.showItem = !this.showItem;
      return;
    }
    this.providerHttp.getById(item.providerId).subscribe((response) => {
      this.item = response;
      if (!this.showItem) this.showItem = !this.showItem;
      this.showed.emit({item: this.item, showItem: this.showItem});
    });
  }

  delete(item: any) {
    let text = 'Presiona el bot\xf3n para eliminar! ';
    if (confirm(text) === true) {
      this.providerHttp.delete(item.providerId).subscribe(() => {
        item.deleted = true;
        this.data = this.data.filter((f) => f.providerId !== item.providerId);
        this.deleted.emit(this.data);
      });
    }
  }

  update(item: any) {
    this.updated.emit(item);
  }
}