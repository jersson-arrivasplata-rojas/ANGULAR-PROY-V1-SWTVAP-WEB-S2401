import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CatalogHttp } from 'src/app/shared/http/catalogs.http';

@Component({
  selector: 'app-component-list-catalogs',
  templateUrl: './component-list-catalogs.component.html',
  styleUrls: ['./component-list-catalogs.component.scss'],
})
export class ComponentListCatalogsComponent {
  @Input() data: any[] = [];
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() showed: EventEmitter<any> = new EventEmitter();

  item: any;

  showItem = false;

  constructor(private catalogHttp: CatalogHttp) {}

  show(item: any) {
    if (item.id === this.item?.id && this.showItem) {
      this.showItem = !this.showItem;
      return;
    }
    this.catalogHttp.getById(item.catalogId).subscribe((response) => {
      this.item = response;
      if (!this.showItem) this.showItem = !this.showItem;
      this.showed.emit({item: this.item, showItem: this.showItem});
    });
  }

  delete(item: any) {
    let text = 'Presiona el bot\xf3n para eliminar! ';
    if (confirm(text) === true) {
      this.catalogHttp.delete(item.catalogId).subscribe(() => {
        item.deleted = true;
        this.data = this.data.filter((f) => f.id !== item.id);
        this.deleted.emit(this.data);
      });
    }
  }

  update(user: any) {
    this.updated.emit(user);
  }
}
