import { Injectable } from '@angular/core';
import { CartEnum } from '../config/cart.enum';
import { CurrencySymbolEnum } from '../config/currency-symbol.enum';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public allItems: any = {};
  public cartData: any = [];
  public cartItemsList: any = [];
  public cartTotal: any = 0;
  public cartItemsStorageName = '';

  constructor(public storage: StorageService) {
    this.cartItemsStorageName = this.getCartItemsStorageName();
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
    let tempCart = [];
    let getActualItems = Object.keys(this.cartData);
    let cartDataItems = this.cartData;
    let tempTotal = 0;

    var onlyChoosenItems = (this.allItems).filter(function (item) {
      if (getActualItems.indexOf(item.p_id) !== -1) {
        tempCart.push({
          pid: item.p_id,
          name: item.product_name,
          qty: cartDataItems[item.p_id],
          price: item.product_price * cartDataItems[item.p_id],
          product: {
            productId: item.p_id,
            productName: item.product_name,
            productImage: item.product_image
          }
        });
        tempTotal += item.product_price * cartDataItems[item.p_id];
      }
    });

    this.cartItemsList = tempCart;
    this.cartTotal = tempTotal;

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

}
