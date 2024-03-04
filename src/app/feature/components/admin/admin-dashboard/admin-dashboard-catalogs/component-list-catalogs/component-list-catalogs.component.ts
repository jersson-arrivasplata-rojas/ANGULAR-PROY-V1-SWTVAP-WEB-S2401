import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CatalogHttp } from 'src/app/shared/http/catalogs.http';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'swtvap-component-list-catalogs',
  templateUrl: './component-list-catalogs.component.html',
  styleUrls: ['./component-list-catalogs.component.scss'],
})
export class ComponentListCatalogsComponent {
  @Input() data: any[] = [];
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() showed: EventEmitter<any> = new EventEmitter();
  @Output() filtered: EventEmitter<any> = new EventEmitter();

  item: any;

  showItem = false;
  searchTerm = '';
  subscription: Subscription;
  constructor(private catalogHttp: CatalogHttp, private router: Router) { }

  show(item: any) {
    if (item.catalogId === this.item?.catalogId && this.showItem) {
      this.showItem = !this.showItem;
      return;
    }
    this.catalogHttp.getById(item.catalogId).subscribe((response) => {
      this.item = response;
      if (!this.showItem) this.showItem = !this.showItem;
      this.showed.emit({ item: this.item, showItem: this.showItem });
    });
  }

  async delete(item: any) {
    let text = '¡Presiona el bot\xf3n para eliminar!';
    if (await confirm(text) === true) {
      this.catalogHttp.delete(item.catalogId).subscribe(() => {
        item.deleted = true;
        this.data = this.data.map((f) => {
          if (f.catalogId === item.catalogId) {
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

  addCategoryCatalogs(item: any) {
    this.router.navigate(['/admin/dashboard/catalogs/add', item.catalogId]);
  }

  addProductsCatalogs(item: any) {
    this.router.navigate(['/admin/dashboard/catalogs/add-products', item.catalogId]);
  }
}
