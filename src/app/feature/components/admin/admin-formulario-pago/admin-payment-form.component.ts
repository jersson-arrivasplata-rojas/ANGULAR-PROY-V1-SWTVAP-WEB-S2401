import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
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

import { NodeUserService } from 'src/app/services/node-user.service';

import { FormularioPago } from 'src/app/interfaces/formulario-pago';
import { Product } from 'src/app/interfaces/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-payment-form',
  templateUrl: './admin-payment-form.component.html',
  styleUrls: ['./admin-payment-form.component.css']
})
export class AdminPaymentFormComponent implements OnInit {
  public APP_URL = environment.appUrl;
  public APP_URL_API_BASE = environment.apiUrlBase;
  public APP_AWS_SNAPSTOREPEPUBLIC=environment.apiAWSsnapstorepepublic;

  public url: string;
  public store:Store=null;

  public provinces:Province[]=[];
  public districts:District[]=[];
  public isBrowser: boolean=false;
  public store_address_google_maps: string='';

  public payments:Payment[] = [];

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
  public user: FormularioPago = {
    store_id: 0,
    name: '',
    email: '',
    celphone: '',
    document: '',//00000000
    document_type: this.documents_type[0],
    country_phone_code: '51',
    country_phone_id: 179,
    country_id: 179,
    deparment_id: 0,
    province_id: 0,
    district_id: 0,
    message: '',
    error: '',
    first_name: '',
    last_name: '',
    comment: '',
    reference: '',
    address: '',
    check_save_to_pay_form: true,
    check_payment_method: 0,
    check_delivery_type: false,
    payment_type_checked:false,
    payment_type:0

  };
  public store_url: string;
  public producto_url: string;
  public successMessage = false;
  public products: Product[] = [];

  constructor(@Inject(PLATFORM_ID) public platformId,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authGuardService:AuthGuardService,
    private localStorageService:LocalStorageService,
    private authorizationService: AuthorizationService,
    public nodeStoreService: NodeStoreService,
    public nodeUserService:NodeUserService ) {
    this.isBrowser = isPlatformBrowser(platformId);
      if(this.isBrowser){
        this.allContries = this.authGuardService.getAllContries();
        nodeUserService.getUser().subscribe(data => {
          console.log(data)
          let user = data.user;
          this.user.document=user.document;
          this.user.document_type=user.document_type;
          this.user.country_phone_code=user.country_phone_code;
          this.user.country_id=user.country_id;
          this.user.celphone=user.celphone;
          this.user.name=user.name;
          this.user.first_name=user.name;
          this.user.email=user.email;

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

          this.getDepartments();
          //payments

          for (let index = 0; index < this.store.payment_card.length; index++) {//

            if(index==this.store.payment_card.length) break;
            let e =  this.store.payment_card[index];


            if(e['type'] == 0){
              this.pagoEfectivo=1;
            }else if(e['type'] == 1){
              this.pagoTransferencia=1;
            }else if(e['type'] == 2){
              this.pagoAppBanco=1;
            }else if(e['type'] == 3){
              this.pagoOtroMetodoPago=1;
            }
          }

          //payments end

          let authorization = this.localStorageService.getItem('accessToken');
          if(Metodos.validationAccessToken(authorization)==false){
            this.router.navigate(['/auth/login'], { queryParams: { store: this.store.stores_id, qim: this.store.stores_image ,qn:this.store.stores_name,uri:this.store.stores_uri } });
          }



          Metodos.insertPreloadStoreRemoveHidden('PRELOAD-STORE', this.getImagePrincipal(), this.store.stores_name);

          setTimeout(function(){
            Metodos.removeNodoPreloadHidden('PRELOAD-STORE');//PRELOAD-GOOGLE-MAPS

          },1000);
          this.carts();
        });
      }
  }


  //#departments@ViewChild('departments') departments:ElementRef;
  async ngOnInit() {

  }

  carts(): void {
    this.authorizationService.storeCarts(this.store.stores_id)
      .subscribe(
        (response: HttpResponse<any>) => {
          if (response.status == 200) {
            this.products = response.body.content;
            this.getPriceTotal();
          }
        },
        (response: HttpErrorResponse) => {
          //console.log(response);
          //var message = (typeof response.error.message == 'undefined') ? '¡Sucedio un error inesperado!' : response.error.message;
        },
        () => {

        });
  }


  getPriceTotal() {

    this.precioTotal = 0;

    for (let index = 0; index < this.products.length; index++) {
      this.precioTotal += this.products[index]['products_cart_price'];
    }
    //document.getElementById('precioTotal').innerHTML=
    console.log(this.precioTotal)
  }

  getPT(){
    this.precioTotal = 0;

    for (let index = 0; index < this.products.length; index++) {
      this.precioTotal += this.products[index]['products_cart_price'];
    }
    return this.precioTotal;
  }

  getDepartments(){
    for (var i = 0; i < this.store.stores_deparments.length; i++) {
      if (i == this.store.stores_deparments.length) { break; }

      this.provinces = this.store.stores_deparments[0].provinces;//districts
      this.districts = this.provinces[0].districts;

      break;
    }
  }


  OnChangeDepartments(value) {
    console.log(value);

    for (var i = 0; i < this.store.stores_deparments.length; i++) {
      if (i == this.store.stores_deparments.length) { break; }
      if (parseInt(value) == this.store.stores_deparments[i].id) {

        this.user.deparment_id = parseInt(value);

        this.provinces = this.store.stores_deparments[i].provinces;//districts
        this.districts = this.provinces[0].districts;
        break;
      }
    }

  }



  OnChangeProvinces(value) {
    console.log(value);

    for (var i = 0; i < this.provinces.length; i++) {
      if (i == this.provinces.length) { break; }

      if (parseInt(value) == this.provinces[i].id) {

        this.districts = this.provinces[i].districts;//districts


        this.user.province_id = parseInt(value);
        this.user.district_id = this.provinces[0].districts[0].id;

        break;
      }
    }

  }

  OnChangeDistricts(value) {
    console.log(value);

    this.user.district_id = parseInt(value);

  }
  //          Metodos.removeNodoPreloadHidden('PRELOAD-STORE');//PRELOAD-GOOGLE-MAPS




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

    this.user.country_phone_id = (country[0].id);

    let classes = document.getElementsByClassName('img-celphone');
    for (var i = 0; 0 < classes.length; i++) {
      var img = classes[i] as HTMLImageElement;

      img.src = `https://flagcdn.com/48x36/${country[0].iso2.toLowerCase()}.png`;
    }
  }


  onSubmit() {

    if (this.user.first_name == '' || this.user.first_name == null || typeof this.user.first_name == 'undefined') return false;
    if (this.user.email == '' || this.user.email == null || typeof this.user.email == 'undefined') return false;
    if (this.user.celphone == '' || this.user.celphone == null || typeof this.user.celphone == 'undefined') return false;
    if (this.user.document_type == '' || this.user.document_type == null || typeof this.user.document_type == 'undefined') return false;
    if (this.user.document == '' || this.user.document == null || typeof this.user.document == 'undefined') return false;
    if (this.user.country_phone_code == '' || this.user.country_phone_code == null || typeof this.user.country_phone_code == 'undefined') return false;
    if (isNaN(this.user.country_id) == true || this.user.country_id == null || typeof this.user.country_id == 'undefined') return false;

    let element_d:any= document.querySelector('input[name="payment_type"]:checked');
    if(element_d==null){
      this.user.payment_type =null;
    }else{
      this.user.payment_type = ((element_d.value)=='on')? parseInt(element_d.getAttribute('data')):null;
    }

    //preloader
    //  Metodos.insertPreload('PRELOAD-SIGNUP');

    this.authorizationService.addOrder(this.user)
    .subscribe(
    ( response:HttpResponse<any> ) => {

      if(response.status == 200){
        //console.log(response);
        let self = this;
        let timerInterval
        Swal.fire({
          title: '¡Su orden se realizó correctamente!',
          html: 'Gracias por contar con '+self.store.stores_name,
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
              /*const content = Swal.getContent()
              if (content) {
                const b = content.querySelector('b')
                if (b) {
                  Swal.getTimerLeft()
                }
              }*/

              Swal.getTimerLeft();
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            self.router.navigate(['/'+this.store.stores_uri]);
            console.log('I was closed by the timer')
          }
        })
      }
    },
    ( response:HttpErrorResponse ) => {
      // console.log(response);
      var message = (typeof response.error.message=='undefined')?'¡Sucedio un error inesperado!':response.error.message;


    },
    () =>{

    });


    /*

    this.authService.addUser(this.user)
    .subscribe(
    ( response:HttpResponse<any> ) => {

      if(response.status == 201){
        //console.log(response);

        Metodos.removeNodoPreload('PRELOAD-SIGNUP','../../../../assets/images/rutas/login/snapstore.png',response.body.message,'success',false);
      }
    },
    ( response:HttpErrorResponse ) => {
    // console.log(response);
      //var message = (typeof response.error.message=='undefined')?'¡Sucedio un error inesperado!':response.error.message;

      Metodos.removeNodoPreload('PRELOAD-SIGNUP','../../../../assets/images/rutas/login/snapstore.png',message,'danger',true);

    },
    () =>{

    });

    */

    //  console.log(this.user);
    return true;
  }

  getType(){
    return this.authGuardService.getType();
  }

  public getImagePrincipal() {
    return  (this.store?.stores_image == null || this.store?.stores_image == '') ? Metodos.getImageDefault100X100(this.APP_URL) : this.APP_AWS_SNAPSTOREPEPUBLIC+ this.store?.stores_image_url;
  }
  public getImageProduct(stores_image_url) {
    return  this.APP_AWS_SNAPSTOREPEPUBLIC+stores_image_url;
  }
  get code(){
    return Metodos.claseAletaria;
  }
}
