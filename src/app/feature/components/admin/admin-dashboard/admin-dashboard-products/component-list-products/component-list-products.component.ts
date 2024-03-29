import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductHttp } from 'src/app/shared/http/products.http';
import { ShareDataService } from 'src/app/shared/services/share-data.service';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'swtvap-component-list-products',
  templateUrl: './component-list-products.component.html',
  styleUrls: ['./component-list-products.component.scss'],
})
export class ComponentListProductsComponent {
  @Input() data: any[] = [];
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() showed: EventEmitter<any> = new EventEmitter();

  item: any;

  showItem = false;
  searchTerm = '';

  constructor(private productHttp: ProductHttp, private router:Router, private shareDataService: ShareDataService) {}

  show(item: any) {
    if (item.productId === this.item?.productId && this.showItem) {
      this.showItem = !this.showItem;
      return;
    }
    this.productHttp.getById(item.productId).subscribe((response) => {
      this.item = response;
      if (!this.showItem) this.showItem = !this.showItem;
      this.showed.emit({item: this.item, showItem: this.showItem});
    });
  }

  async delete(item: any) {
    let text = '¡Presiona el bot\xf3n para eliminar!';
    if (await confirm(text) === true) {
      this.productHttp.delete(item.productId).subscribe(() => {
        item.deleted = true;
        this.data = this.data.map((f) => {
          if (f.productId === item.productId) {
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

  addProductCategories(item: any){
    this.router.navigate(['/admin/dashboard/products/add-categories', item.productId]);
  }

  addProductsCatalogs(item: any){
    this.router.navigate(['/admin/dashboard/products/add-catalogs', item.productId]);
  }

  addProductUnits(item: any){
    this.router.navigate(['/admin/dashboard/products/add-units', item.productId]);
  }

  addProductProviders(item: any){
    this.router.navigate(['/admin/dashboard/products/add-providers', item.productId]);
  }
  addProductDiscounts(item: any){
    this.router.navigate(['/admin/dashboard/products/add-discounts', item.productId]);
  }
  addProductImages(item: any){
    this.router.navigate(['/admin/dashboard/products/add-images', item.productId]);
  }
  addProductParameters(item: any){
    this.router.navigate(['/admin/dashboard/products/add-parameters', item.productId]);
  }
  addProductComments(item: any){
    this.shareDataService.add(null);
    this.router.navigate(['/admin/dashboard/products/add-comments', item.productId]);
  }
}
