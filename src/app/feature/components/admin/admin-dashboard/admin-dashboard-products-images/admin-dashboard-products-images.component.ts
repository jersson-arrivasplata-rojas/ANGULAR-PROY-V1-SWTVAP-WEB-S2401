import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { ProductImagesHttp } from 'src/app/shared/http/product-images.http';
import { ProductHttp } from 'src/app/shared/http/products.http';


@Component({
  selector: 'app-admin-dashboard-products-images',
  templateUrl: './admin-dashboard-products-images.component.html',
  styleUrls: ['./admin-dashboard-products-images.component.css']
})
export class AdminDashboardProductsImagesComponent implements OnInit {

  data: any[] = [];
  item = {};
  productId = 0;
  product;
  addItem = false;
  updateItem = false;
  showItem = false;
  constructor(private productImagesHttp: ProductImagesHttp, private productHttp: ProductHttp,
    private activatedRoute: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.activatedRoute.params
    .pipe(
      mergeMap(params => {
        this.productId = +params['id'];
        return this.productHttp.getById(this.productId);
      }),
      mergeMap(item => {
        this.product = item;
        return this.productImagesHttp.getAll();
      }),
    ).subscribe((productImagesData) => {
      this.data = productImagesData.filter((productImage) => productImage.productId === this.productId);
    });
  }

  handleAdded(data: any) {
    this.productImagesHttp.add(data).subscribe((data) => {
      this.data.push(data);
      this.updateItem = false;
      this.showItem = false;
      this.addItem = false;
      (window as any).success("¡Guardado!");
    });
  }

  handleUpdated(item: any) {
    this.data = this.data.map((data) => {
      if (data.productParameterId === item.productParameterId) {
        return {
          ...data,
          ...item
        };
      }
      return data;
    });
    this.addItem = false;
    this.updateItem = false;
    this.showItem = false;
  }

  handleTableUpdated(item: any) {
    this.item = item;
    this.updateItem = true;
    this.addItem = false;
    this.showItem = false;
  }

  handleTableDeleted(data: any[]) {
    this.data = data;
  }


  handleTableShowed(data: any) {
    this.item = data.item;
    this.showItem = data.showItem;
    this.addItem = false;
    this.updateItem = false;
  }

  findDeletedAtInData() {
    return this.data.filter(item => !(item.deletedAt)).length;
  }

  back(){
    this.router.navigate([`/admin/dashboard/products`]);
  }
}
