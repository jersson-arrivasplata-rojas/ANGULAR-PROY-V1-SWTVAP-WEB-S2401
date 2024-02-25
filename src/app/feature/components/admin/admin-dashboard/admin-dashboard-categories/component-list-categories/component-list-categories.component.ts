import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryHttp } from 'src/app/shared/http/categories.http';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'app-component-list-categories',
  templateUrl: './component-list-categories.component.html',
  styleUrls: ['./component-list-categories.component.scss'],
})
export class ComponentListCategoriesComponent {
  @Input() data: any[] = [];
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() showed: EventEmitter<any> = new EventEmitter();

  item: any;

  showItem = false;

  constructor(private categoryHttp: CategoryHttp, private router:Router) {}

  show(item: any) {
    if (item.categoryId === this.item?.categoryId && this.showItem) {
      this.showItem = !this.showItem;
      return;
    }
    this.categoryHttp.getById(item.categoryId).subscribe((response) => {
      this.item = response;
      if (!this.showItem) this.showItem = !this.showItem;
      this.showed.emit({item: this.item, showItem: this.showItem});
    });
  }

  async delete(item: any) {
    let text = '¡Presiona el bot\xf3n para eliminar!';
    if (await confirm(text) === true) {
      this.categoryHttp.delete(item.categoryId).subscribe(() => {
        item.deleted = true;
        this.data = this.data.map((f) => {
          if (f.categoryId === item.categoryId) {
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

  addCategoryCatalogs(item: any){
    this.router.navigate(['/admin/dashboard/categories/add', item.categoryId]);
  }

  addProductCategories(item: any){
    this.router.navigate(['/admin/dashboard/categories/add-products', item.categoryId]);
  }
}
