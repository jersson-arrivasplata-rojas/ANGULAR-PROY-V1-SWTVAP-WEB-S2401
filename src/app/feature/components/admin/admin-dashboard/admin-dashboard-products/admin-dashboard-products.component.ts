import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs';
import { CommentHttp } from 'src/app/shared/http/comments.http';
import { ProductCatalogsHttp } from 'src/app/shared/http/product-catalogs.http';
import { ProductCategoriesHttp } from 'src/app/shared/http/product-categories.http';
import { ProductDiscountsHttp } from 'src/app/shared/http/product-discounts.http';
import { ProductImagesHttp } from 'src/app/shared/http/product-images.http';
import { ProductParametersHttp } from 'src/app/shared/http/product-parameters.http';
import { ProductProvidersHttp } from 'src/app/shared/http/product-providers.http';
import { ProductUnitsHttp } from 'src/app/shared/http/product-units.http';
import { ProductHttp } from 'src/app/shared/http/products.http';


@Component({
  selector: 'app-admin-dashboard-products',
  templateUrl: './admin-dashboard-products.component.html',
  styleUrls: ['./admin-dashboard-products.component.css']
})
export class AdminDashboardProductsComponent implements OnInit {

  data: any[] = [];
  item = {};
  addItem = false;
  updateItem = false;
  showItem = false;
  constructor(private productHttp: ProductHttp, private productCategoriesHttp: ProductCategoriesHttp,
    private productDiscountsHttp: ProductDiscountsHttp, private productImagesHttp: ProductImagesHttp,
    private productCommentHttp: CommentHttp, private productParameterHttp: ProductParametersHttp,
    private productProvidersHttp: ProductProvidersHttp, private productUnitsHttp: ProductUnitsHttp,
    private productCatalogsHttp: ProductCatalogsHttp) { }

  ngOnInit() {
    this.productHttp.getAll().pipe(
      mergeMap(productData => {
        this.data = productData;
        return this.productDiscountsHttp.getAll();
      }),
      mergeMap(productDiscountData => {
        this.data.map((product: any) => {
          product.discounts = productDiscountData.filter(productDiscount => productDiscount.productId === product.productId && !productDiscount.deletedAt)
        });
        return this.productCommentHttp.getAll();
      }),
      mergeMap(productCommentData => {
        this.data.map((product: any) => {
          product.comments = productCommentData.filter(productComment => productComment.productId === product.productId && !productComment.deletedAt)
        });
        return this.productImagesHttp.getAll();
      }),
      mergeMap(productImageData => {
        this.data.map((product: any) => {
          product.images = productImageData.filter(productImage => productImage.productId === product.productId && !productImage.deletedAt)
        });
        return this.productParameterHttp.getAll();
      }),
      mergeMap(productParameterData => {
        this.data.map((product: any) => {
          product.parameters = productParameterData.filter(productParameter => productParameter.productId === product.productId)
        });
        return this.productCatalogsHttp.getAll();
      }),
      mergeMap(productCatalogs => {
        this.data.map((product: any) => {
          product.catalogs = productCatalogs.filter(productCatalog => productCatalog.product.productId === product.productId);
        });
        return this.productCategoriesHttp.getAll();
      }),
      mergeMap(productCategories => {
        this.data.map((product: any) => {
          product.categories = productCategories.filter(productCategory => productCategory.product.productId === product.productId);
        });
        return this.productProvidersHttp.getAll();
      }),
      mergeMap(productProviders => {
        this.data.map((product: any) => {
          product.providers = productProviders.filter(productProvider => productProvider.product.productId === product.productId);
        });
        return this.productUnitsHttp.getAll();
      })
    ).subscribe((productUnits) => {
      this.data.map((product: any) => {
        product.units = productUnits.filter(productUnit => productUnit.product.productId === product.productId);
      });
    });
  }

  handleAdded(data: any) {
    this.productHttp.add(data).subscribe((data) => {
      this.data.push(data);
      this.updateItem = false;
      this.showItem = false;
      this.addItem = false;
      (window as any).success("¡Guardado!");
    });
  }

  handleUpdated(item: any) {
    this.data = this.data.map((data) => {
      if (data.productId === item.productId) {
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
}
