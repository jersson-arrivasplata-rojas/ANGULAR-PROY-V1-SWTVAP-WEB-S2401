import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Metodos } from 'src/Utils/Metodos';
import { Card } from 'src/app/interfaces/card';
import { Country } from 'src/app/interfaces/country';
import { District } from 'src/app/interfaces/district';
import { Payment } from 'src/app/interfaces/payment';
import { Province } from 'src/app/interfaces/province';
import { Store } from 'src/app/interfaces/store';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NodeStoreService } from 'src/app/services/node-store.service';
import { environment } from 'src/environments/environment';

import { CustomService } from 'src/app/services/custom.service';
import { NodeUserService } from 'src/app/services/node-user.service';

import { ValidateCard } from 'src/Utils/ValidateCard';
import { AuthUser } from 'src/app/interfaces/auth-user';
import { Department } from 'src/app/interfaces/department';
import { Product } from 'src/app/interfaces/product';


@Component({
  selector: 'app-admin-dashboard-invoice',
  templateUrl: './admin-dashboard-invoice.component.html',
  styleUrls: ['./admin-dashboard-invoice.component.css']
})
export class AdminDashboardInvoiceComponent implements OnInit {
  public APP_URL = environment.appUrl;
  public APP_URL_API_BASE = environment.apiUrlBase;
  public APP_AWS_SNAPSTOREPEPUBLIC = environment.apiAWSsnapstorepepublic;
  public store_url: string;
  public url: string;
  public store: Store = null;
  public paymentFormCredentials: {
    acq: number,
    idcomer: number,
    purcha: number,
    purchaamou: {
      basic: {
        amount: number,
        description: string
      }
    },
    purchaver: string,
    purchacode: number,
    sha: string,
    //sha: (purcha:number)=>any
  } = Metodos.paymentFormCredentials();

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  producto = {
    descripcion: 'Pago de plan básico por un mes',
    precio: 19.90,
    img: 'imagen de tu producto'
  }
  public $stores_deparments: Department[] = [];

  public provinces: Province[] = [];
  public districts: District[] = [];
  public isBrowser: boolean = false;
  public store_address_google_maps: string = '';

  public payments: Payment[] = [];

  public cards: Card[] = [];
  public i: number = 0;
  public pagoEfectivo = 0;
  public pagoTransferencia = 0;
  public pagoAppBanco = 0;
  public pagoOtroMetodoPago = 0;
  public precioTotal = 0;
  public textPassword: string = 'Ver';
  public textWhatsapp: string = 'Hola Snap Store, me gustaría consultar lo siguiente ';
  public phoneWhatsapp: string = '51900288628';

  public typeRegister: string = 'Usuario';
  public typePatternDocument: string = '[0-9]{8}';

  public documents_type = ['DNI', 'RUC', 'C-EXTRANJERIA'];
  public allContries: Country[] = null;
  public user: AuthUser = {
    store_id:0,
    type_user: 'user',
    name: '',
    email: '',
    password: '',
    celphone: '',
    document: '00000000',
    document_type: this.documents_type[0],
    country_phone_code: '51',
    country_phone_id: 0,
    country_id: 179,
    message: '',
    error: '',
    check_terms_conditions: true,
    check_politics_privacy: true,
    check_emails_snap_store: true,
    token: '',
    password_confirmation: '',
    provider: '',
    image: '',
    first_name: '',
    last_name: '',
    operation_number:''
  };
  public shippingFirstName: string = '';
  public shippingLastName: string = '';
  public shippingEmail: string = '';
  public shippingAddress: string = '';
  public shippingCity: string = '';
  public shippingState: string = '';
  public cardNumber: string = '';
  public yy: string = '';
  public mm: string = '';
  public cvv: string = '';
  public plan: string = '';
  public cardNumberPattern:any;
  public cvvPattern:any;
  public typecard: string = '';
  public producto_url: string;
  public successMessage = false;
  public products: Product[] = [];
  constructor(@Inject(PLATFORM_ID) public platformId,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private customService: CustomService,
    private authGuardService: AuthGuardService,
    private localStorageService: LocalStorageService,
    private authorizationService: AuthorizationService,
    public nodeStoreService: NodeStoreService,
    public nodeUserService: NodeUserService) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {

      let dolarPrice = 3.5;
      this.getAllDepartments()
      this.allContries = this.authGuardService.getAllContries();
      nodeUserService.getUser().subscribe(data => {
        console.log(data)
        let user = data.user;
        this.user.document = user.document;
        this.user.document_type = user.document_type;
        this.user.country_phone_code = user.country_phone_code;
        this.user.country_id = user.country_id;
        this.user.celphone = user.celphone;
        this.user.name = user.name;
        this.user.first_name = user.name;
        this.user.email = user.email;

      });
      nodeStoreService.getStore().subscribe(data => {
        this.store = data.store;
        this.store_address_google_maps = data.store_address_google_maps;
        this.payments = data.store_payment_cards;
        this.cards = data.store_cards;
        this.pagoEfectivo = data.store_pago_efectivo;
        this.pagoTransferencia = data.store_pago_transferencia;
        this.pagoAppBanco = data.store_pago_app_banco;
        this.pagoOtroMetodoPago = data.store_pago_otro_metodo_pago;
        this.user.store_id = this.store.stores_id;//agregar el store id

        //payments


      });
      //facturacion
    }
  }



  ngOnInit() {
  }
  onSubmit() {

  }

  goToFinalizarFormularioPago() {

  }
  selectTypeDocument(event: any) {
    event.preventDefault();
    var data: string = event.target.value;
    if (data == 'DNI') this.typePatternDocument = '[0-9]{8}';
    else this.typePatternDocument = '[0-9]{11}';

    this.user.document = '';
  }

  countryPhone(event: any) {
    event.preventDefault();
    var data: string = event.target.value;

    let country: Country[] = this.allContries.filter(resp => resp.phone_code == data.toString());

    this.user.country_id = (country[0].id);

    let classes = document.getElementsByClassName('img-celphone');
    for (var i = 0; 0 < classes.length; i++) {
      var img = classes[i] as HTMLImageElement;

      img.src = `https://flagcdn.com/48x36/${country[0].iso2.toLowerCase()}.png`;
      //img.removeAttribute('img');
      //img.setAttribute('img',`https://flagcdn.com/48x36/${country[0].iso2.toLowerCase()}.png`)
    }
  }
  OnChangeDepartments(value) {
    // console.log(value);
    if (value != 0) {
      for (var i = 0; i < this.$stores_deparments.length; i++) {
        if (i == this.$stores_deparments.length) { break; }
        if (parseInt(value) == this.$stores_deparments[i].id) {

          //this.user.deparment_id = parseInt(value);
          this.shippingCity = this.$stores_deparments[i].name;
          this.shippingState = this.$stores_deparments[i].provinces[0].name;
          this.provinces = this.$stores_deparments[i].provinces;//districts
          break;
        }
      }
    } else {
      let deparments: any = document.querySelector('select[name="deparments"]');
      deparments.value = 0;
      let provinces: any = document.querySelector('select[name="provinces"]');
      provinces.value = 0;
      /*let districts:any = document.querySelector('select[name="districts"]');
      districts.value=0;*/
    }

  }
  OnChangeProvinces(value) {
    let deparments: any = document.querySelector('select[name="deparments"]');
    if (value != 0 && deparments.value != 0) {
      for (var i = 0; i < this.provinces.length; i++) {
        if (i == this.provinces.length) { break; }

        if (parseInt(value) == this.provinces[i].id) {

          this.shippingState = this.provinces[i].name;

          break;
        }
      }
    } else {
      let provinces: any = document.querySelector('select[name="provinces"]');
      provinces.value = 0;
      let districts: any = document.querySelector('select[name="districts"]');
      districts.value = 0;
    }


  }
  getAllDepartments() {
    //this.APP_URL_API+'user/departments'
    this.customService.getAllDepartments()
      .subscribe(data => {
        this.$stores_deparments = data;//.stores_deparments

        for (var i = 0; i < this.$stores_deparments.length; i++) {
          if (i == this.$stores_deparments.length) { break; }
          this.provinces = this.$stores_deparments[14].provinces;
          break;
        }
      }, error => {
        this.$stores_deparments = [{
          id: 15,
          name: "Lima",
          provinces: [{
            id: 1501,
            name: "Lima",
            districts: [{
              id: 150101,
              name: "Lima"
            }]
          }]
        }]
      }, () => {
        this.shippingCity = 'LIMA';
        this.shippingState = 'LIMA';
      });
  }
  patternEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]/;
  validatorPayme() {
    if (this.shippingFirstName == null || this.shippingFirstName == '') {
      return true;
    }
    if (this.shippingLastName == null || this.shippingLastName == '') {
      return true;
    }
    if (this.shippingEmail == null || this.shippingEmail == '') {
      return true;
    }//^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$
    ///^\w+([\.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|es)+$/
    if (!this.shippingEmail.match(this.patternEmail)) {
      return true;
    }
    if (this.shippingAddress == null || this.shippingAddress == '') {
      return true;
    }
    if (this.shippingCity == null || this.shippingCity == '') {
      return true;
    }
    if (this.shippingState == null || this.shippingState == '') {
      return true;
    }

    if (ValidateCard.validCard(this.cardNumber, this.cvv) == false) {
      return true;
    }

    return false;
  }
  openPayment() {
    var tokenRequest = {
      "card": [{
        "pan": this.cardNumber,
        "expiry_date": this.mm + this.yy,
        "security_code": this.cvv
      }],
      "card_holder": [{
        "first_name": this.shippingFirstName,
        "last_name": this.shippingLastName,
        "email_address": this.shippingEmail,
        "identity_document_country": "PER",
        "identity_document_type": this.user.document_type,
        "identity_document_identifier": this.user.document
      }],
      "address": {
        "billing": {
          "first_name": this.shippingFirstName,
          "last_name": this.shippingLastName,
          "email": this.shippingEmail,
          "phone": {
            "country_code": this.user.country_phone_code,
            "subscriber": this.user.celphone
          },
          "location": {
            "line_1": this.shippingAddress,
            "line_2": this.shippingAddress,
            "city": this.shippingCity,
            "state": this.shippingState,
            "country": "PE",
            "zip_code": "18"
          }
        }
      },
      "additional_fields": {
        "email": this.shippingEmail
      }
    };

    this.authGuardService.addPayment(tokenRequest)
      .subscribe(
        (response: HttpResponse<any>) => {
          if (response.status == 200) {
            console.log(response);
            var data = response.body;
            if (data['response'] == true) {
              this.user.operation_number = data['operation_number'];
              this.user.plan = this.plan;

              //this.createStore()
            }

          }
        },
        (response: HttpErrorResponse) => {
          Metodos.removeNodoPreloadHidden('PRELOAD-SIGNUP');
        },
        () => {

        });

  }
  changeMethod(event, type) {
    if (type == 'paypal-signup') {
      let e = document.getElementsByClassName('payme-signup');
      for (let index = 0; index < e.length; index++) {
        let element: any = e[index];
        if (element.classList.contains("d-none") == false) {
          element.classList.add('d-none')
        }
      }

    } else if (type == 'payme-signup') {
      let e = document.getElementsByClassName('paypal-signup');
      for (let index = 0; index < e.length; index++) {
        const element: any = e[index];
        if (element.classList.contains("d-none") == false) {
          element.classList.add('d-none')
        }
      }
    }

    let all = document.getElementsByClassName(type);
    for (let index = 0; index < all.length; index++) {
      let element: any = all[index];
      if (element.classList.contains("d-none") == true) {
        element.classList.remove('d-none')
      }
    }
  }
  changeTypePlan(event) {

    if (event.target.value == "basico") {
      this.router.navigate(['factura'], { queryParams: { plan: 'basico' } });

    } else if (event.target.value == "gratuito") {
      this.router.navigate(['factura'], { queryParams: { plan: 'gratuito' } });
    }
  }
  changeCardType(event) {

    let id =event.target.value;
    let data = ValidateCard.getCardById(parseInt(id));
    if(data!=false){
      this.cardNumberPattern=data.pattern.toString().replaceAll('/','');
      this.cvvPattern=data.cvv.toString().replaceAll('/','');
    }

  }
}
