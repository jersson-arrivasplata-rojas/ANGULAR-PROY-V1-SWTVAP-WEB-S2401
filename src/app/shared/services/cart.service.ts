import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AnimationType } from '../components/carousels/carousel/carousel.animations';
import { CartEnum } from '../config/cart.enum';
import { CurrencySymbolEnum } from '../config/currency-symbol.enum';
import { LangEnum } from '../config/lang.enum';
import { ProductImageInInterface } from '../interfaces/product-in.interface';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnDestroy {
  public index = 0;
  public allProducts: any = [];
  public allItems: any = [];
  public cartData: any = [];
  public cartItemsList: any = [];
  public cartTotal: any = 0;
  public cartItemsStorageName = '';

  private subscription: Subscription = new Subscription();
  private product$ = new Subject<any>();
  private additionalData$ = new Subject<any>();
  private allProduct$ = new Subject<any>();

  constructor(public storage: StorageService) {
    this.cartItemsStorageName = this.getCartItemsStorageName();
    this.subscription.add(
      this.getProducts().subscribe((data) => {
        //.pipe(skip(1))
        this.allItems = this.getAllProducts(data);
      })
    );

    this.subscription.add(
      this.getAllProduct().subscribe((data) => {
        this.allProducts = data;
        this.loadCart();
        this.listCartItems();
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addProducts(value: any) {
    this.product$.next(value);
  }

  getProducts() {
    return this.product$.asObservable();
  }

  addAdditionalData(data: any) {
    this.additionalData$.next(data);
  }

  getAdditionalData() {
    return this.additionalData$.asObservable();
  }

  addAllProduct(value: any) {
    this.allProduct$.next(value);
  }

  getAllProduct() {
    return this.allProduct$.asObservable();
  }

  loadCart() {
    let temp = this.getStorageCart();
    if (temp === undefined || temp === '' || temp === null) {
      this.cartData = {};
    } else {
      this.cartData = temp;
    }
  }

  removeItem(pid) {
    if (this.cartData[pid]) {
      this.cartData[pid] = 0;
    }
    if (this.cartData[pid] == 0) {
      delete this.cartData[pid];
    }
    this.storeItems();
  }

  addToCart(pid, qty, replace) {
    if (this.cartData[pid] == undefined) {
      this.cartData[pid] = 0;
    }
    if (replace === '') {
      this.cartData[pid] = this.cartData[pid] + qty;
    } else {
      this.cartData[pid] = parseInt(qty);
    }

    if (this.cartData[pid] == 0) {
      delete this.cartData[pid];
    }
    this.storeItems();
  }

  storeItems() {
    const name = this.getCartItemsStorageName();
    this.storage.set({
      [name]: this.cartData,
    });

    this.listCartItems();
  }

  listCartItems() {
    if (this.allProducts.length > 0) {
      let tempCart = [];
      let getActualItems = Object.keys(this.cartData).map(Number);
      let cartDataItems = this.cartData;
      let tempTotal = 0;

      var onlyChoosenItems = this.allProducts.filter(function (item) {
        const name =
          localStorage.getItem('lang') === LangEnum.EN
            ? item.nameEn
            : item.name;
        const price =
          localStorage.getItem('currency') === CurrencySymbolEnum.PEN
            ? item.price
            : item.priceUSD;
        if (getActualItems.indexOf(item.productId) !== -1) {
          tempCart.push({
            pid: item.productId,
            name: name,
            qty: cartDataItems[item.productId],
            price: price, //* cartDataItems[item.productId]
            product: { ...item },
          });
          tempTotal += price * cartDataItems[item.productId];
        }
      });

      this.cartItemsList = tempCart;
      this.cartTotal = tempTotal;
    }
  }

  loadCheckoutInfo(storageKey: string) {
    return this.storage.get(storageKey);
  }

  emptyCart() {
    const name = this.getCartItemsStorageName();
    this.storage.set({
      [name]: {},
    });
    this.cartItemsList = [];
  }

  loadBillingInfo(name: string) {
    let userBillingInfo = {};
    if (this.storage.data && this.storage.data.customerInfo) {
      userBillingInfo = this.storage.data.customerInfo;
    }
    // Devuelve la información de facturación del usuario
    return userBillingInfo;
  }

  loadInvoiceNumber(name: string) {
    let invoiceNo = {};
    if (this.storage.data && this.storage.data.invoiceNo) {
      invoiceNo = this.storage.data.invoiceNo;
    }
    // Devuelve la información de facturación del usuario
    return invoiceNo;
  }

  getStorageCart() {
    const name = this.getCartItemsStorageName();
    return this.storage.get(name);
  }

  getCartItemsStorageName() {
    /*if (localStorage.getItem('currency') === CurrencySymbolEnum.PEN) {
      return CartEnum.PEN;
    }else if (localStorage.getItem('currency') === CurrencySymbolEnum.USD) {
      return CartEnum.USD;
    }*/
    return CartEnum.DEFAULT;
  }

  getAllProducts(products: any[]) {
    const array = [
      'https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1557800634-7bf3c7305596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2001&q=80',
      'https://images.unsplash.com/photo-1551410224-699683e15636?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80',
    ];

    for (let index = 0; index < products.length; index++) {
      const element = products[index];
      let sliders = [];
      element.currentSlide = 0;
      element.animationType = AnimationType.Scale;
      element.productImages.forEach((data: ProductImageInInterface) => {
        sliders.push({
          currentSlide: 0,
          name: 'Scale',
          value: AnimationType.Scale,
          headline: element.name,
          src: array[Math.floor(Math.random() * array.length)],
        });
      });
      element.sliders = sliders;
    }

    return products;
  }

  findOneArrayOfproducts(catalogs: any[]) {
    let catalog: any = null;
    let category: any = null;
    let products = [];
    let productFlag = false;
    for (let index = 0; index < catalogs.length; index++) {
      const element = catalogs[index];

      if (productFlag) break;

      if (element.categories.length > 0) {
        for (let indexj = 0; index < element.categories.length; indexj++) {
          const item = element.categories[indexj];

          if (productFlag) break;

          if (item.products.length > 0) {
            category = item;
            products = [...item.products];
            productFlag = true;
            break;
          }
        }
      }

      if (element.products.length > 0) {
        catalog = element;
        products = [...element.products];
        productFlag = true;
        break;
      }
    }

    return {
      products: products,
      category: category,
      catalog: catalog,
    };
  }

  extractProducts(data) {
    let allProducts = [];

    // Iterate through each catalog
    data.forEach((catalog) => {
      // Check if catalog has products directly
      if (catalog.products && catalog.products.length > 0) {
        allProducts = allProducts.concat(catalog.products);
      }

      // Check if catalog has categories with products
      if (catalog.categories && catalog.categories.length > 0) {
        catalog.categories.forEach((category) => {
          if (category.products && category.products.length > 0) {
            allProducts = allProducts.concat(category.products);
          }
        });
      }
    });

    // Convert allProducts to a Set to remove duplicates, then convert it back to an array
    allProducts = Array.from(new Set(allProducts));
    allProducts = allProducts.filter(
      (product, index, self) =>
        index === self.findIndex((t) => t.productId === product.productId)
    );
    return allProducts;
  }
}
