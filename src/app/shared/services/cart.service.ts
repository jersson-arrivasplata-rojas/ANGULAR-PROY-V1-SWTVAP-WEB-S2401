import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AnimationType } from '../components/carousels/carousel/carousel.animations';
import { CartEnum } from '../config/cart.enum';
import { CurrencySymbolEnum } from '../config/currency-symbol.enum';
import { ProductImageInInterface } from '../interfaces/product-in.interface';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy {
  public index = 0;
  public allItems: any = [];
  public cartData: any = [];
  public cartItemsList: any = [];
  public cartTotal: any = 0;
  public cartItemsStorageName = '';

  private subscription: Subscription;
  private product$ = new Subject<any>();

  constructor(public storage: StorageService) {
    this.cartItemsStorageName = this.getCartItemsStorageName();
    this.subscription = this.getProducts().subscribe(data => {//.pipe(skip(1))
      console.log(data);
      this.allItems = this.getAllProducts(data);
      if (this.index === 0) {
        this.loadCart();
        this.listCartItems();
        this.index++;
      }
    });
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
      [name]: this.cartData
    });

    this.listCartItems();
  }

  listCartItems() {
    if (this.allItems.length > 0) {
      let tempCart = [];
      let getActualItems = Object.keys(this.cartData);
      let cartDataItems = this.cartData;
      let tempTotal = 0;

      var onlyChoosenItems = (this.allItems).filter(function (item) {
        if (getActualItems.indexOf(item.productId) !== -1) {
          tempCart.push({
            pid: item.productId,
            name: item.name,
            qty: cartDataItems[item.productId],
            price: item.price * cartDataItems[item.productId],
            product: { ...item }
          });
          tempTotal += item.price * cartDataItems[item.productId];
        }
      });

      this.cartItemsList = tempCart;
      this.cartTotal = tempTotal;
    }
  }

  loadCheckoutInfo(storageKey: string) {
    return this.storage.get(storageKey)
  }

  emptyCart() {
    const name = this.getCartItemsStorageName();
    this.storage.set({
      [name]: {}
    });
  }

  loadBillingInfo(name: string) {
    let userBillingInfo = {};
    if (this.storage.data && this.storage.data.customerInfo) {
      userBillingInfo = this.storage.data.customerInfo;
    }
    // Devuelve la información de facturación del usuario
    return userBillingInfo;
  }

  getStorageCart() {
    const name = this.getCartItemsStorageName();
    return this.storage.get(name);
  }

  getCartItemsStorageName() {
    if (localStorage.getItem('currency') === CurrencySymbolEnum.PEN) {
      return CartEnum.PEN;
    }
    return CartEnum.USD;
  }

  getAllProducts(products: any[]) {
    const array = [
      "https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1557800634-7bf3c7305596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2001&q=80",
      "https://images.unsplash.com/photo-1551410224-699683e15636?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80"
    ];

    for (let index = 0; index < products.length; index++) {
      const element = products[index];
      let sliders = [];
      element.currentSlide = 0;
      element.animationType = AnimationType.Scale;
      element.productImages.forEach((data: ProductImageInInterface) => {
        sliders.push({
          currentSlide: 0,
          name: "Scale",
          value: AnimationType.Scale,
          headline: element.name,
          src: array[Math.floor(Math.random() * array.length)]
        });
      });
      element.sliders = sliders;
    }

    return products;
  }

  findAllProductsByCatalogs(catalogs: any[]) {
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
            products = [...item.products];
            productFlag = true;
            break;
          }

        }
      }

      if (element.products.length > 0) {
        products = [...element.products];
        productFlag = true;
        break;
      }
    }

    return products;
  }
}
