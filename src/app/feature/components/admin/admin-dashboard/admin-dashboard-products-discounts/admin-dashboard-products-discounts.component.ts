import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, mergeMap, of } from 'rxjs';
import { ProductDiscountsHttp } from 'src/app/shared/http/product-discounts.http';


@Component({
  selector: 'app-admin-dashboard-products-discounts',
  templateUrl: './admin-dashboard-products-discounts.component.html',
  styleUrls: ['./admin-dashboard-products-discounts.component.css']
})
export class AdminDashboardProductsDiscountsComponent implements OnInit {

  data: any[] = [];
  item = {};
  productId = 0;
  addItem = false;
  updateItem = false;
  showItem = false;
  constructor(private productDiscountsHttp: ProductDiscountsHttp, private activatedRoute: ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    this.activatedRoute.params
    .pipe(
      mergeMap(params => {
        this.productId = +params['id'];
        return this.productDiscountsHttp.getAll();
      }),
    ).pipe(
      catchError(error => {
        console.error('Error al consultar datos:', error);
        return of([]); // Devuelve un observable vacío para que la cadena de observables pueda continuar
      })
    ).subscribe((productDiscountsData) => {
      this.data = productDiscountsData.filter((productDiscount) => productDiscount.productId === this.productId);
    });
  }

  handleAdded(data: any) {
    this.productDiscountsHttp.add(data).subscribe((data) => {
      this.data.push(data);
      this.updateItem = false;
      this.showItem = false;
      this.addItem = false;
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

  back(){
    this.router.navigate([`/admin/dashboard/products`]);
  }
}
