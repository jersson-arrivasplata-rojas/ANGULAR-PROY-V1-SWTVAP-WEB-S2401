import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { Metodos } from 'src/Utils/Metodos';
import { Card } from 'src/app/interfaces/card';
import { Comment } from 'src/app/interfaces/comment';
import { Payment } from 'src/app/interfaces/payment';
import { Product } from 'src/app/interfaces/product';
import { Store } from 'src/app/interfaces/store';
import { User } from 'src/app/interfaces/user';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { NodeStoreService } from 'src/app/services/node-store.service';
import { NodeUserService } from 'src/app/services/node-user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {
  public APP_URL = environment.apiUrl;

  public url: string = '';
  public store: Store = null;
  public product: Product = null;
  public isBrowser: boolean = false;
  public store_address_google_maps: string = '';
  public payments: Payment[] = [];
  public cards: Card[] = [];
  public comments: Comment[]= [];

  public i: number = 0;
  public pagoEfectivo = 0;
  public pagoTransferencia = 0;
  public pagoAppBanco = 0;
  public pagoOtroMetodoPago = 0;
  public store_url: string;
  public producto_url: string;
  public successMessage = false;
  public precioTotal = 0;
  public products: Product[] = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay:false,
    pullDrag: false,
    dots: true,
    items:1,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      },
      1200: {
        items: 1
      },
      1450:{
        items:1
      }
    },
    //navText: ["<i class='fas fa-angle-left' style='font-size: 30px;'></i>","<i style='font-size: 30px;' class='fas fa-angle-right'></i>"],
    nav: false
  }
   public user:User=null;
  @ViewChild('nameComment') nameComment: ElementRef;
  @ViewChild('emailComment') emailComment: ElementRef;
  @ViewChild('celphoneComment') celphoneComment: ElementRef;
  @ViewChild('textComment') textComment: ElementRef;
  owl:any;//CarouselComponent
  activeSlides: SlidesOutputData;

  constructor(@Inject(PLATFORM_ID) public platformId, private authGuardService: AuthGuardService,
    private activatedRoute: ActivatedRoute, private router: Router,
    private authorizationService: AuthorizationService,
    public nodeStoreService: NodeStoreService,
    public nodeUserService: NodeUserService) {
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
        Metodos.insertPreloadStoreRemoveHidden('PRELOAD-STORE', this.getImagePrincipal(), this.store.stores_name);
        this.carts();
      });
      nodeUserService.getUser().subscribe(data=>{
        //console.log(data)
        this.user = data.user;
      });
      this.activatedRoute.params.subscribe(params => {
        this.producto_url = params['producto'] || null;
        console.log(params);
        this.storeByUrlProduct();

      });

    }
  }


  async ngOnInit() {
  }

  get splitTags(){
    if(this.product?.products_tags==null||this.product?.products_tags==''){
      return [];
    }
     return this.product?.products_tags.split(',');
  }
  goSlide(k,event){
    console.log(this.owl)
    console.log(k)
    event.stopPropagation();
    this.owl.to('owl-slide-'+this.product?.products_id+'-'+k);
    //this.owl.to('slide-'+k)
  }
  getPassedData(data: SlidesOutputData,owl:any) {
    this.activeSlides = data;
    this.owl = owl;

   // console.log(this.activeSlides);
   // console.log(owl);
  }
  getData(data: SlidesOutputData) {
    this.activeSlides = data;
    let position = data.startPosition;
    let element:any = document.getElementById('tag'+this.product?.products_id+position+'t');
    if(element!=null){
      element.checked = true;
      console.log(this.activeSlides);
    }

  }
  storeByUrlProduct(): void {
    this.authorizationService.storeByUrlProduct(this.store.stores_uri, this.producto_url)
      .subscribe(
        (response: HttpResponse<any>) => {
          if (response.status == 200) {
            var data = response.body;
            if (data.content.length > 0) {
              this.product = data.content[0];
              this.comments = data.content[0]['products_comments'];

            }
          }
        },
        (response: HttpErrorResponse) => {
          var message = (typeof response.error.message == 'undefined') ? '¡Sucedio un error inesperado!' : response.error.message;
        },
        () => {
          Metodos.removeNodoPreloadHidden('PRELOAD-STORE');
          //this.showComments();
        });

  }

/*
  mouseenterImage(event: any) {
    let elements: any = document.querySelectorAll('.img-magnifier-glass');
    for (var i = 0; 0 < elements.length; i++) {
      if (i == elements.length) break;
      elements[i].remove();
    }

    this.magnify(event.target, 2);
  }
  mouseleaveImage(event: any) {
    let elements: any = document.getElementsByClassName('img-magnifier-glass');
    for (var i = 0; 0 < elements.length; i++) {
      elements[i].remove();
    }

  }*/
  addCart() {
    let alertProductId = document.getElementById(`alert-product-${this.product.products_id}`);
    let inputProductId: any = document.getElementById(`input-product-${this.product.products_id}`);
    let spinnerProductId: any = document.getElementById(`spinner-product-${this.product.products_id}-i`);

    if (inputProductId.value == '') inputProductId.value = 1;
    spinnerProductId.classList.remove('d-none');

    let product_tags_image_description = '';//[name='bla[]']:checked
    let product_tags_image_type = 0;//[name='bla[]']:checked

    if(this.product?.products_images_tag_visible==1&&this.product?.product_images.length >= 2){
      let element_itv:any= document.querySelector('input[name="tag'+this.product?.products_id+'b"]:checked');
      product_tags_image_description = element_itv.value;
      for (let index = 0; index < this.product?.product_images.length; index++) {
        const element = this.product?.product_images[index];
        if(element.description=='product_tags_image_description'){
          product_tags_image_type=element.type;
        }
      }
    }

    let tag_description = '';//[name='bla[]']:checked
    //let tag_description_title = '';//[name='bla[]']:checked

    if(this.splitTags.length>0){
      let element_d:any= document.querySelector('input[name="tag'+this.product?.products_id+'"]:checked');
      tag_description = element_d.value;

      /*if(this.product?.products_tag_name!=''&&this.product?.products_tag_name!=null){
        tag_description_title=this.product?.products_tag_name;
      }*/

    }

    console.log(product_tags_image_type);
    console.log(product_tags_image_description);
    console.log(tag_description);
    //console.log(tag_description_title);

    //let tags:any = document.getElementById('tag'+this.product?.products_id+position+'t');
    //tags.checked = true;
    /*
    products.images_tag_visible as products_images_tag_visible,
    products.tags as products_tags,
    products.image as products_image,
    */
    let type = 1;
    this.authorizationService.addCart(0,this.product.products_id, ((inputProductId.value == '') ? 1 : parseInt(inputProductId.value)), this.store.stores_id, type,product_tags_image_type,product_tags_image_description,tag_description)
      .subscribe(
        (response: HttpResponse<any>) => {

          if (response.status == 200) {
            //console.log(response);
            alertProductId.classList.remove('d-none');
            setTimeout(function () {
              inputProductId.value = '';
              alertProductId.classList.add('d-none');
            }, 2000);
            this.carts();
          }
        },
        (response: HttpErrorResponse) => {
          //console.log(response);
         // var message = (typeof response.error.message == 'undefined') ? '¡Sucedio un error inesperado!' : response.error.message;


        },
        () => {
          spinnerProductId.classList.add('d-none');

        });

  }


  getType() {
    return this.authGuardService.getType();
  }

  showComments() {
    this.comments = [];
    this.authorizationService.storeProductComments(this.product.products_id)
      .subscribe(
        (response: HttpResponse<any>) => {

          if (response.status == 200) {
            //console.log(response);
            var data = response.body;
            var body = data.content;//Body del Producto
            this.comments = body;

          }
        },
        (response: HttpErrorResponse) => {
          //console.log(response);
          var message = (typeof response.error.message == 'undefined') ? '¡Sucedio un error inesperado!' : response.error.message;


        },
        () => {
        });
  }
  addComment() {
    let name = this.nameComment.nativeElement.value;
    let email = this.emailComment.nativeElement.value;
    let text = this.textComment.nativeElement.value;
    let celphone = this.celphoneComment.nativeElement.value;

    if (name == '') return null;
    if (email == '') return null;
    if (text == '') return null;
    console.log(name)
    this.authorizationService.storeProductAddComments(this.product.products_id, name, email, celphone, text, this.store.stores_uri)
      .subscribe(
        (response: HttpResponse<any>) => {

          if (response.status == 200) {
            name = '';
            email = '';
            celphone = '';
            text = '';
            //console.log(response);
            var data = response.body;
            var body = data.content;//Body del Producto
            this.comments = body;

          }
        },
        (response: HttpErrorResponse) => {
          //console.log(response);
          var message = (typeof response.error.message == 'undefined') ? '¡Sucedio un error inesperado!' : response.error.message;


        },
        () => {
          Swal.fire(
            '¡Agregado!',
            'Su comentario ha sido agregado satisfactoriamente.',
            'success'
          )

        });
  }

  getPriceTotal() {
    this.precioTotal = 0;
    for (let index = 0; index < this.products.length; index++) {
      this.precioTotal += this.products[index]['products_cart_price'];
    }
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
          ////////////var message = (typeof response.error.message == 'undefined') ? '¡Sucedio un error inesperado!' : response.error.message;


        },
        () => {

        });
  }


  public getImagePrincipal() {
    return  (this.store?.stores_image == null || this.store?.stores_image == '') ? Metodos.getImageDefault100X100(this.APP_URL) : this.APP_AWS_SNAPSTOREPEPUBLIC+ this.store?.stores_image_url;
  }
  public getImageProduct(stores_image_url) {
    return  this.APP_AWS_SNAPSTOREPEPUBLIC+stores_image_url;
  }
}
