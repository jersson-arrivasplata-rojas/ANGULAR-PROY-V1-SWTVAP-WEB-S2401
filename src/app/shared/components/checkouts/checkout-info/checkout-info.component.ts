import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LangChangeEvent } from '@ngx-translate/core';
import { tap } from 'rxjs';
import { LangEnum } from 'src/app/shared/config/lang.enum';
import { PatternEnum } from 'src/app/shared/constants/patterns.const';
import { countriesInitFN } from 'src/app/shared/functions/countries.function';
import { translateFN } from 'src/app/shared/functions/translate.function';
import { WOrderHttp } from 'src/app/shared/http/w-orders.http';
import { CartService } from 'src/app/shared/services/cart.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
import { emailDomainValidator } from 'src/app/shared/validators/email-domain.validators';

@Component({
  selector: 'swtvap-checkout-info',
  templateUrl: './checkout-info.component.html',
  styleUrls: ['./checkout-info.component.scss'],
})
export class CheckoutInfoComponent implements OnInit {
  public errorsInfo: any = {};
  @Input('checkoutFields') __checkout: any = {};
  @Output() onContinue: EventEmitter<any> = new EventEmitter();
  @Output() onBuy: EventEmitter<any> = new EventEmitter();

  arrayCountries = countriesInitFN();
  showEnglishName = false;
  itemForm: FormGroup;

  constructor(
    private router: Router,
    public fb: FormBuilder,
    public storage: StorageService,
    public cartService: CartService,
    private translateService: TranslateService,
    private formBuilder: FormBuilder,
    private wOrderHttp: WOrderHttp
  ) {
    this.itemForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(PatternEnum.NUMBER)]],
      cellphone: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(PatternEnum.NUMBER)]],
      email: ['', [Validators.required, Validators.maxLength(50), emailDomainValidator()]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      whatsapp: [false, Validators.required],
      countryCode: ['', [Validators.required, Validators.maxLength(5), Validators.pattern(PatternEnum.NUMBER_PLUS)]],
      details: [''],
      otherDetails: [''],
      sourceAggregate: ['WEB', Validators.required]
    });

    this.translateService.getOnLangChange().subscribe((event: LangChangeEvent) => {
      this.showEnglishName = event.lang === LangEnum.EN;
    });
  }

  ngOnInit() {
    this.loadForm();
    this.showEnglishName = this.translateService.getCurrentLang() === LangEnum.EN;
  }

  loadForm() {
    let temp = {};
    let checkoutInfo = this.cartService.loadCheckoutInfo('customerInfo');
    if (
      checkoutInfo === undefined ||
      checkoutInfo === '' ||
      checkoutInfo === null
    ) {
      checkoutInfo = {};
    }

    this.itemForm.patchValue({...checkoutInfo})


    /*this.__checkout.forEach(item => {
      temp[item.uid] = [checkoutInfo[item.uid], item.validation];
    });*/

    //this.checkoutForm = this.fb.group(temp);
  }

  continue(){
    this.onContinue.emit();
  }

  add() {
    if (this.itemForm.valid) {
      const success = translateFN()[this.translateService.getCurrentLang()].alert.successOrder;
      const orderCode = Math.floor(1000000000 + Math.random() * 9000000000);
      const item = {
        order: {
          code: 'ORDER-' + orderCode,
          orderDate: CommonUtils.getDayNow()
        },
        cart: this.cartService.cartData,
        client: { ...this.init(), ...this.itemForm.value }
      };
      this.wOrderHttp.addWOrder(item).pipe(
        tap((data) => (window as any).success(success)),
      ).subscribe(response => {
        this.storage.set({
          customerInfo: this.itemForm.value,
          invoiceNo: orderCode
        });
        this.onBuy.emit();
      });
    }
  }

  init() {
    return {
      name: '',
      phone: '',
      cellphone: '',
      email: '',
      address: '',
      whatsapp: '',
      countryCode: '',
      details: '',
      otherDetails: '',
      sourceAggregate: 'WEB'
    };
  }
}