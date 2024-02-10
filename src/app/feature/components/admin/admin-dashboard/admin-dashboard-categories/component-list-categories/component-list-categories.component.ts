import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryHttp } from 'src/app/shared/http/categories.http';

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

  delete(item: any) {
    let text = 'Presiona el bot\xf3n para eliminar! ';
    if (confirm(text) === true) {
      this.categoryHttp.delete(item.categoryId).subscribe(() => {
        item.deleted = true;
        this.data = this.data.filter((f) => f.categoryId !== item.categoryId);
        this.deleted.emit(this.data);
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