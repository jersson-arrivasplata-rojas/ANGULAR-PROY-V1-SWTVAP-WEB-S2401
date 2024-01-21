import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { CardInterface as Card } from 'src/app/shared/interfaces/card.interface.interface';
import { PaymentInterface as Payment } from 'src/app/shared/interfaces/payment.interface';
import { StoreInterface as Store } from 'src/app/shared/interfaces/store.interface';

@Injectable({
  providedIn: 'root'
})
export class NodeStoreService {

  private storeSubject = new ReplaySubject<any>();

  constructor() { }

  setStore(data:Store) {
    this.storeSubject.next({
      store: data,
      store_address_google_maps: this.getStoreAddressGoogleMaps(data.stores_address),
      store_payment_cards: this.getPayments(data['payment_card']),
      store_cards: this.getCards(data['payment_card']),
      store_pago_efectivo: this.getPagoEfectivo(data['payment_card']),
      store_pago_transferencia: this.getPagoTransferencia(data['payment_card']),
      store_pago_app_banco: this.getPagoAppBanco(data['payment_card']),
      store_pago_otro_metodo_pago: this.getPagoOtroMetodoPago(data['payment_card'])

    });
  }

  getStore(): Observable<any> {
    return this.storeSubject.asObservable();
  }
// if(typeof e['card']!= 'undefined'){

  getStoreAddressGoogleMaps(stores_address):string{
    return 'https://www.google.com/maps/dir/?api=1&destination=' + (stores_address).replace(/blue/g, "+") + '&travelmode=walking';
  }
  getPayments(payment_card): Payment[]{
    let payments: Payment[]=[];
    for (let index = 0; index < payment_card.length; index++) {
      if (index == payment_card.length) break;
      let e = payment_card[index];
      if (typeof e['payment'] != 'undefined') {
        for (let j = 0; j < e['payment'].length; j++) {
          if (j == e['payment'].length) break;
          let element = e['payment'][j];
          payments.push({
            image_url: element.image_url,
            description: element.description
          });
        }
      }
    }
    return payments;
  }

  getCards(payment_card): Card[]{
    let cards: Card[]=[];
    for (let index = 0; index < payment_card.length; index++) {
      if (index == payment_card.length) break;
      let e = payment_card[index];
      if(typeof e['card']!= 'undefined'){
        for (let j = 0; j < e['card'].length; j++){
            if(j== e['card'].length) break;
            let element = e['card'][j];
            cards.push({
              image_url:element.image_url,
              description: element.description
            });
        }
      }
    }
    return cards;
  }

  getPagoEfectivo(payment_card){
    let pagoEfectivo = 0;
    for (let index = 0; index < payment_card.length; index++) {
      if (index == payment_card.length) break;
      let e = payment_card[index];
      if (e['type'] == 0) {
        pagoEfectivo = 1;
      }
    }
    return pagoEfectivo;
  }
  getPagoTransferencia(payment_card){
    let pagoTransferencia = 0;
    for (let index = 0; index < payment_card.length; index++) {
      if (index == payment_card.length) break;
      let e = payment_card[index];
      if (e['type'] == 1) {
        pagoTransferencia = 1;
      }
    }
    return pagoTransferencia;
  }
  getPagoAppBanco(payment_card){
    let pagoAppBanco = 0;
    for (let index = 0; index < payment_card.length; index++) {
      if (index == payment_card.length) break;
      let e = payment_card[index];
      if (e['type'] == 2) {
        pagoAppBanco = 1;
      }
    }
    return pagoAppBanco;
  }
  getPagoOtroMetodoPago(payment_card){
    let pagoOtroMetodoPago = 0;
    for (let index = 0; index < payment_card.length; index++) {
      if (index == payment_card.length) break;
      let e = payment_card[index];
      if (e['type'] == 3) {
        pagoOtroMetodoPago = 1;
      }
    }
    return pagoOtroMetodoPago;
  }
}
