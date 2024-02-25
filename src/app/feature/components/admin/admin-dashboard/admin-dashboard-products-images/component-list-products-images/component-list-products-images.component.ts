import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductImagesHttp } from 'src/app/shared/http/product-images.http';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'app-component-list-products-images',
  templateUrl: './component-list-products-images.component.html',
  styleUrls: ['./component-list-products-images.component.scss'],
})
export class ComponentListProductsImagesComponent {
  @Input() data: any[] = [];
  @Input() product;
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() showed: EventEmitter<any> = new EventEmitter();

  item: any;

  showItem = false;

  constructor(private productImagesHttp: ProductImagesHttp, private router:Router) {}

  show(item: any) {
    if (item.productImageId === this.item?.productImageId && this.showItem) {
      this.showItem = !this.showItem;
      return;
    }
    this.productImagesHttp.getById(item.productImageId).subscribe((response) => {
      this.item = response;
      if (!this.showItem) this.showItem = !this.showItem;
      this.showed.emit({item: this.item, showItem: this.showItem});
    });
  }

  async delete(item: any) {
    let text = '¡Presiona el bot\xf3n para eliminar!';
    if (await confirm(text) === true) {
      this.productImagesHttp.delete(item.productImageId).subscribe(() => {
        item.deleted = true;
        this.data = this.data.map((f) => {
          if (f.productImageId === item.productImageId) {
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
