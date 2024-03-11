import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { checkoutFormFN } from 'src/app/shared/functions/checkout.form.function';
import { TranslateService } from 'src/app/shared/services/translate.service';

@Component({
  selector: 'swtvap-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public cartflag: boolean = false;
  public checkout = checkoutFormFN();
  @Output() onContinue: EventEmitter<any> = new EventEmitter();
  @Output() onBuy: EventEmitter<any> = new EventEmitter();

  private translationsSubscription: Subscription;
  private languageSubscription: Subscription;

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
    this.ref();
    this.subscribeToLanguageChange();
    this.fetchTranslations();
  }

  ngOnDestroy(): void {
    // Asegúrate de desuscribirte de todas las suscripciones
    this.translationsSubscription?.unsubscribe();
    this.languageSubscription?.unsubscribe();
  }

  subscribeToLanguageChange(): void {


    this.languageSubscription = this.translateService.getOnLangChange()
    .pipe(tap(() => this.fetchTranslations()))
    .subscribe();
  }

  fetchTranslations(): void {
    // Cancela la suscripción anterior para evitar fugas de memoria
    this.translationsSubscription?.unsubscribe();

    this.translationsSubscription = this.translateService.getTranslate('ecommerce.pages.checkout')
      .subscribe((data: any) => {
        this.checkout.forEach((item: any) => {
          switch (item.uid) {
            case 'firstName':
                item.label = data.form.name;
                item.placeholder = data.form.name;
                item.errorMsg = data.form.required;
              break;
            case 'lastName':
                item.label = data.form.lastName;
                item.placeholder = data.form.lastName;
                item.errorMsg = data.form.required;
              break;
            case 'email':
                item.label = data.form.email;
                item.placeholder = data.form.email;
                item.errorMsg = data.form.required;
              break;
            case 'mobile':
                item.label = data.form.phone;
                item.placeholder = data.form.phone;
                item.errorMsg = data.form.required;
              break;
            case 'addressOne':
                item.label = data.form.address;
                item.placeholder = data.form.address;
                item.errorMsg = data.form.required;
              break;
            case 'addressTwo':
                item.label = data.form.address2;
                item.placeholder = data.form.address2;
                item.errorMsg = data.form.required;
              break;
            case 'zip':
                item.label = data.form.postalCode;
                item.placeholder = data.form.postalCode;
                item.errorMsg = data.form.required;
              break;
            case 'paymentmode':
                item.label = data.form.paymentMethod;
                item.placeholder = data.form.paymentMethod;
                item.errorMsg = data.form.required;
              break;
          }
        });
      });
  }


  ref() {
    this.cartflag = false;
    setTimeout(() => {
      this.cartflag = true;
    }, 10);
  }

  buy($event){
    this.onBuy.emit($event);
  }

  continue($event){
    this.onContinue.emit($event);
  }
}
