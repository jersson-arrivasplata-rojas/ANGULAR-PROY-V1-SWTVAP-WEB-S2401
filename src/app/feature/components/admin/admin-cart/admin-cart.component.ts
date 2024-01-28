import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Metodos } from 'src/Utils/Metodos';
import { Card } from 'src/app/interfaces/card';
import { Payment } from 'src/app/interfaces/payment';
import { Product } from 'src/app/interfaces/product';
import { Store } from 'src/app/interfaces/store';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NodeStoreService } from 'src/app/services/node-store.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-cart',
  templateUrl: './admin-cart.component.html',
  styleUrls: ['./admin-cart.component.css']
})
export class AdminCartComponent implements OnInit {
  public APP_URL = environment.appUrl;
  public APP_URL_API_BASE = environment.apiUrlBase;
  public APP_AWS_SNAPSTOREPEPUBLIC=environment.apiAWSsnapstorepepublic;

  public url: string;
  public price: string = '0.00';
  public textArea_style: any = {
    'height': '115px',
    'borderRadius': '15px'
  };
  public store: Store = null;
  public products: Product[] = [];


  public isBrowser: boolean;
  public store_address_google_maps: string;

  public payments: Payment[] = [];

  public cards: Card[] = [];
  public i: number = 0;
  public pagoEfectivo = 0;
  public pagoTransferencia = 0;
  public pagoAppBanco = 0;
  public pagoOtroMetodoPago = 0;
  public precioTotal = 0;
  public successMessage = false;
  public alerProduct:boolean = false;
  constructor(@Inject(PLATFORM_ID) public platformId,
    private authGuardService: AuthGuardService,
    private router: Router,
    private authorizationService: AuthorizationService,
    private localStorageService:LocalStorageService,
    public nodeStoreService: NodeStoreService) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      nodeStoreService.getStore().subscribe(data => {
        this.store = data.store;
        this.store_address_google_maps = data.store_address_google_maps;
        this.payments = data.store_payment_cards;
        this.cards = data.store_cards;
        this.pagoEfectivo = data.store_pago_efectivo;
        this.pagoTransferencia = data.store_pago_transferencia;
        this.pagoAppBanco = data.store_pago_app_banco;
        this.pagoOtroMetodoPago = data.store_pago_otro_metodo_pago;

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


  async ngOnInit() {
  }

  getPriceTotal() {
    this.precioTotal = 0;
    for (let index = 0; index < this.products.length; index++) {
      this.precioTotal += this.products[index]['products_cart_price'];
    }
    console.log(this.precioTotal)
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





  remove(products_cart_id) {
    let own = this;
    Swal.fire({
        title: '¿Seguro de Eliminar?',
        text: "¡Si continuas no podras revertir los cambios!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0CC27E',
        cancelButtonColor: '#FF586B',
        confirmButtonText: '¡Si, eliminar!',
        cancelButtonText: '¡No, cancelar!',
        customClass: {
          confirmButton: 'btn btn-first border-radius-15 mr-5',
          cancelButton: 'btn btn-danger-2  border-radius-15 '
        },
        buttonsStyling: false,
      }).then(function (result) {

        if (result.isConfirmed) {
          own.products = [];
          own.authorizationService.removeCart(products_cart_id, own.store.stores_id)//arreglar
            .subscribe(
              (response: HttpResponse<any>) => {
                if (response.status == 200) {

                  own.products = response.body.content;
                  own.getPriceTotal();

                }
              },
              (response: HttpErrorResponse) => {
                var message = (typeof response.error.message == 'undefined') ? '¡Sucedio un error inesperado!' : response.error.message;
              },
              () => {

              });

        } else if (result.isDenied) {
        }
    });



  }


  getCartInicioEmit($event: any[]) {

    if ($event.length > 0) {
      console.log($event)
      this.products = $event;
      this.getPriceTotal();
    }

  }

  goToFormularioPago() {
    this.router.navigate([this.store.stores_uri, 'carrito', 'formulario-pago']);
  }

  public getImagePrincipal() {
    return  (this.store?.stores_image == null || this.store?.stores_image == '') ? Metodos.getImageDefault100X100(this.APP_URL) : this.APP_AWS_SNAPSTOREPEPUBLIC+ this.store?.stores_image_url;
  }
  public getImageProduct(stores_image_url) {
    return  this.APP_AWS_SNAPSTOREPEPUBLIC+stores_image_url;
  }
  getType() {
    return this.authGuardService.getType();
  }

  getSplitTags(tags){
    if(tags==null||tags==''){
      return [];
    }
     return tags.split(',');
  }

  addCart($event,content,products_cart_id,products_id,products_images_tag_visible,product_images,splitTags,products_tag_name,type){
    //console.log(this.alert);
    let alertProductId=document.getElementById(`alert-product-${content}-${products_cart_id}`);
    let inputProductId:any=document.getElementById(`input-product-${content}-${products_cart_id}`);
    let spinnerProductId:any = document.getElementById(`spinner-product-${content}-${products_cart_id}-i`);
    let spinnerCartId:any = document.getElementById(`spinner-cart-${content}-${products_cart_id}-i`);



    if(inputProductId.value=='') inputProductId.value=1;
    spinnerCartId.classList.add('d-none');
    spinnerProductId.classList.remove('d-none');


    let product_tags_image_description = '';//[name='bla[]']:checked
    let product_tags_image_type = 0;//[name='bla[]']:checked

    if(products_images_tag_visible==1&&product_images.length >= 2){
      let element_itv:any= document.querySelector('input[name="tag'+products_cart_id+'b"]:checked');
      product_tags_image_description = element_itv.value;
      for (let index = 0; index < product_images.length; index++) {
        const element = product_images[index];
        if(element.description=='product_tags_image_description'){
          product_tags_image_type=element.type;
        }
      }
    }

    let tag_description = '';//[name='bla[]']:checked
    //let tag_description_title = '';//[name='bla[]']:checked

    if(splitTags.length>0){
      let element_d:any= document.querySelector('input[name="tag'+products_cart_id+'"]:checked');
      tag_description = element_d.value;

      /*if(products_tag_name!=''&&products_tag_name!=null){
        tag_description_title=products_tag_name;
      }*/

    }

    console.log(product_tags_image_type);
    console.log(product_tags_image_description);
    console.log(tag_description);
    //console.log(tag_description_title);

    this.authorizationService.addCart(products_cart_id,products_id, ((inputProductId.value == '') ? 1 : parseInt(inputProductId.value)), this.store.stores_id, 0,product_tags_image_type,product_tags_image_description,tag_description)

    //this.authorizationService.addCart(this.products_id,((inputProductId.value=='')?1:inputProductId.value),this.store,this.type)
    .subscribe(
    ( response:HttpResponse<any> ) => {

      if(response.status == 200){
        //console.log(response);
        this.alerProduct=false;
        this.products=[];
        let tr:any = document.getElementById('tbody-admin-carrito').querySelectorAll('tr');
        for (let index = 0; index < tr.length; index++) {
          const element = tr[index];
          element.remove();
        }
     // if (response.body.content.length > 0) {

        console.log(response.body.content)
        this.products = response.body.content;
        this.getPriceTotal();
     // }

        //this.alert.nativeElement.classList.remove('d-none');
        //alertProductId.classList.remove('d-none');
        /*this.emitEvent.emit(response.body.content);


        this.emitAlertEvent.emit({
          response: true,
          id: this.id,
          data:this.alert.nativeElement
        });*/

      }
    },
    ( response:HttpErrorResponse ) => {
      //console.log(response);
      //var message = (typeof response.error.message=='undefined')?'¡Sucedio un error inesperado!':response.error.message;


    },
    () =>{
        spinnerCartId.classList.remove('d-none');
        spinnerProductId.classList.add('d-none');
        setTimeout(function(){
          if(type==0){
            inputProductId.value='';
          }
        },3000);

        setTimeout(function(){
          if(alertProductId.classList.contains('d-none')==true){//.remove('d-none');
            //self.alert.nativeElement.classList.remove('d-none');
            alertProductId.classList.remove('d-none');
          }
        },2000);
    });
  }


  getProductsTagName(index,letter){
    return `tag${this.products[index].products_cart_id}${letter}`;
  }

  validationCheckedColor(description,products_cart_tags_image_description){
    if(products_cart_tags_image_description==(description).split("#")[1]){
      return true;
    }
    return false;
  }
}
