import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Metodos } from 'src/Utils/Metodos';
import { Paginate } from 'src/app/interfaces/paginate';
import { Payment } from 'src/app/interfaces/payment';
import { Product } from 'src/app/interfaces/product';
import { Store } from 'src/app/interfaces/store';
import { StoreSearch } from 'src/app/interfaces/store-search';
import { User } from 'src/app/interfaces/user';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { NodeStoreService } from 'src/app/services/node-store.service';
import { NodeUserService } from 'src/app/services/node-user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})

export class AdminHomeComponent implements OnInit {
  public APP_URL = environment.apiUrl;

  public search: StoreSearch = null;
  public filter_badge_count: number = Metodos.filter_badge_count;
  public store: Store = null;
  public price_min = Metodos.price_min;
  public price_max = Metodos.price_max;
  public isBrowser: boolean = false;
  public payments: Payment[] = [];
  public store_address_google_maps: string = null;
  public array_product: Product[] = [];
  public url: string = null;
  public price: string = '0.00';
  public filters: any = [];
  public orderVertical = true;
  public orderHorizontal = false;
  public array_product_first: any[] = [];
  public array_product_second: any[] = [];
  public array_product_three: any[] = [];
  public array_product_four: any[] = [];
  public paginate: Paginate = null;
  public precioTotal = 0;
  public user:User=null;
  public products: Product[] = [];

  constructor(@Inject(PLATFORM_ID) public platformId,
    private authGuardService: AuthGuardService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authorizationService: AuthorizationService,
    public nodeStoreService: NodeStoreService,
    public nodeUserService: NodeUserService) {

    this.cleanPaginate();
    this.cleanSearch();
    this.cleanStore();

    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      if (urlParams.has('current_page') == true) {
        if (urlParams.get('current_page') == "") {
          this.search.current_page = 0;
        } else {
          this.search.current_page = parseInt(urlParams.get('current_page'));
        }
      }

      if (urlParams.has('product') == true) {
        this.search.product = urlParams.get('product');
      }
      if (urlParams.has('filters') == true) {
        this.search.filters = urlParams.get('filters');
      }
      if (urlParams.has('price_min') == true) {
        if (urlParams.get('price_min') == "") {
          this.search.price_min = Metodos.price_min;
        } else {
          this.search.price_min = parseInt(urlParams.get('price_min'));
        }
      } else {
        this.search.price_min = Metodos.price_min;
      }

      if (urlParams.has('price_max') == true) {
        if (urlParams.get('price_max') == "") {
          this.search.price_max = Metodos.price_max;
        } else {
          this.search.price_max = parseInt(urlParams.get('price_max'));
        }
      } else {
        this.search.price_max = Metodos.price_max;
      }

      if (urlParams.has('check_promotions') == true) {
        if (urlParams.get('check_promotions') == "") {
          this.search.check_promotions = '';
        } else {
          this.search.check_promotions = JSON.parse(urlParams.get('check_promotions'));
        }
      }

      nodeStoreService.getStore().subscribe(data=>{
        //console.log(data)
        this.store = data.store;
        this.store_address_google_maps = data.store_address_google_maps;
        this.payments = data.store_payment_cards;
        Metodos.insertPreloadStoreRemoveHidden('PRELOAD-STORE', this.getImagePrincipal(), this.store.stores_name);
        this.carts();
      });

      nodeUserService.getUser().subscribe(data=>{
        //console.log(data)
        this.user = data.user;
      });
    }
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.activatedRoute.params.subscribe(params => {
        this.url = params['url'] || null;
        this.busquedaExplorar();
      });
    }
  }



  applyFilters(event) {
    this.busquedaExplorar();
  }


  changePromocion(event, type) {
    if (type == null) {
      this.search.check_promotions = '';
    } else if (type == 1) {
      this.search.check_promotions = true;

    } else if (type == 0) {
      this.search.check_promotions = false;

    }
  }
  setPrice($event, type_price) {

    if (type_price == 'price_min') {
      this.search.price_min = parseInt($event.target.value);
    } else if (type_price == 'price_max') {
      this.search.price_max = parseInt($event.target.value);
    }
  }


  updateArrays() {
    this.array_product_first = [];
    this.array_product_second = [];
    this.array_product_three = [];
    this.array_product_four = [];
    for (var i = 0; i < this.array_product.length; i++) {
      if (i == this.array_product.length) { break; }

      if (i / 2 == 0 || i / 2 == 2 || i / 2 == 4) {
        this.array_product_first.push(this.array_product[i]);
      } else
        if (i / 2 == 0.5 || i / 2 == 2.5 || i / 2 == 4.5) {
          this.array_product_second.push(this.array_product[i]);

        } else
          if (i / 2 == 1 || i / 2 == 3 || i / 2 == 5) {
            this.array_product_three.push(this.array_product[i]);

          } else
            if (i / 2 == 1.5 || i / 2 == 3.5 || i / 2 == 5.5) {
              this.array_product_four.push(this.array_product[i]);
            }

    }
  }

  busquedaExplorar() {

    document.getElementById('PRELOAD-STORE-PRODUCTS-CARGANDO').removeAttribute('hidden');
    document.getElementById('BUSQUEDA-GRATUITA-PAGINATION').setAttribute('hidden', 'hidden');

    this.search.filters = this.filters.join();
    this.array_product = [];
    this.router.navigateByUrl(`${this.url}?product=${this.search.product}&current_page=${this.search.current_page}&filters=${(this.search.filters != null && this.search.filters != '') ? this.search.filters : ''}&price_min=${(this.search.price_min != null && this.search.price_min != 0) ? this.search.price_min : ''}&price_max=${(this.search.price_max != null && this.search.price_max != 100000000000000) ? this.search.price_max : ''}&check_promotions=${(this.search.check_promotions != null && this.search.check_promotions != '') ? this.search.check_promotions : ''}`);
    this.authorizationService.storeProductSearch(this.url, this.search.product, this.search.current_page, this.search.filters, this.search.price_min, this.search.price_max, this.search.check_promotions)
      .subscribe(
        (response: HttpResponse<any>) => {

          if (response.status == 200) {
            //console.log(response);
            var data = response.body;
            var body = data.content;//Body del Producto
            //Paginate inicio
            this.paginate.total = body.total;
            this.paginate.per_page = body.per_page;
            this.paginate.current_page = body.current_page;
            this.paginate.last_page = body.last_page;
            this.paginate.first_page_url = body.first_page_url;
            this.paginate.last_page_url = body.last_page_url;
            this.paginate.next_page_url = body.next_page_url;
            this.paginate.prev_page_url = body.prev_page_url;
            this.paginate.path = body.path;
            this.paginate.from = body.from;
            this.paginate.to = body.to;

            this.array_product = body.data;
            //console.log(this.array_product)
            //console.log(this.store);




          }
        },
        (response: HttpErrorResponse) => {
          //console.log(response);
          var message = (typeof response.error.message == 'undefined') ? '¡Sucedio un error inesperado!' : response.error.message;


        },
        () => {
          document.getElementById('PRELOAD-STORE-PRODUCTS-CARGANDO').setAttribute('hidden', 'hidden');
          document.getElementById('BUSQUEDA-GRATUITA-PAGINATION').removeAttribute('hidden');
          Metodos.removeNodoPreloadHidden('PRELOAD-STORE');
          this.updateArrays();
        });
  }

  paginationChange(current_page: number) {
    if (current_page <= 1) {
      this.search.current_page = 0;

    } else {
      this.search.current_page = current_page - 1;;

    }

    this.busquedaExplorar();
  }

  addAllCategory(event) {

    var elements: any = document.querySelectorAll('.CHECKBOX_SUBCATEGORY_');

    for (var i = 0; 0 < elements.length; i++) {
      var bool = elements.length == i;
      if (bool == true) break;

      elements[i].checked = false;
    }
    let allCategory: any = document.getElementById('CHECKBOX_SUBCATEGORY_A');
    allCategory.checked = true;
    this.filters = [];
  }

  addSubCategory(event, id: number) {
    let allCategory: any = document.getElementById('CHECKBOX_SUBCATEGORY_A');
    allCategory.checked = false;

    let element: any = document.getElementById('CHECKBOX_SUBCATEGORY_' + id);
    element.checked = true;
    this.filters.push(id);

  }

  public getImagePrincipal() {
    return  (this.store?.stores_image == null || this.store?.stores_image == '') ? Metodos.getImageDefault100X100(this.APP_URL) : this.APP_AWS_SNAPSTOREPEPUBLIC+ this.store?.stores_image_url;
  }
  getType() {
    return this.authGuardService.getType();
  }

  eventEmitCart($event){
   console.log($event);
   this.carts();
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
          //var message = (typeof response.error.message == 'undefined') ? '¡Sucedio un error inesperado!' : response.error.message;


        },
        () => {

        });
  }

  cleanPaginate():void{
    this.paginate = {
      total: 0,
      per_page: 0,
      current_page: 0,
      last_page: 0,
      first_page_url: null,
      last_page_url: null,
      next_page_url: null,
      prev_page_url: null,
      path: null,
      from: 0,
      to: 0
    }
  }
  cleanSearch():void{
    this.search = {
      current_page: 0,
      type: '',
      name: '',
      category: '',
      product: '',
      address: '',
      price_min: Metodos.price_min,
      price_max: Metodos.price_max,
      filters: '',
      check_delivery: null,
      check_pick_store: null,
      check_promotions: null,
      subcategories:  '',
      categories:  ''
    }
  }
  cleanStore():void{
    this.store = {
      stores_address: '',
      stores_celphone:'',
      stores_collect: '',
      stores_country_phone_code: '',
      stores_coverage: '',
      stores_delivery: '',
      stores_description:  '',
      stores_email: '',
      stores_facebook: '',
      stores_id: 0,
      stores_image: '',
      stores_path: '',
      stores_image_url: '',
      stores_instagram:  '',
      stores_latitud: '',
      stores_longitud: '',
      stores_name: '',
      stores_uri:'',
      stores_address_referential:'',
      stores_address_type:'',
      stores_nickname:'',
      stores_whatsapp:'',
      store_customizers:'',
      stores_user_like: 0,
      stores_user_follow: 0,
      store_quantity_followers: 0,
      store_quantity_likes: 0,
      store_quantity_views: 0,
      store_customizer_bootstrap:[
        {
          scss_name: '',
          theme_color_primary: '',
          theme_color_secondary: '',
          theme_color_success: '',
          theme_color_info: '',
          theme_color_warning: '',
          theme_color_danger: '',
          theme_color_light: '',
          theme_color_light_text: '',
          theme_color_dark: '',
          theme_color_first : '',
          theme_color_first_text : '',
          theme_color_second : '',
          theme_color_second_text: '',
          theme_color_background: '',
          theme_color_background_text: '',
          grid_break_point_xs: '',
          grid_break_point_sm: '',
          grid_break_point_md: '',
          grid_break_point_lg: '',
          grid_break_point_xl: '',
          body_bg: '',
          body_color: '',
          font_size_base: '',
          line_height_base: '',
          font_url: '',
          font_family_san_serif: '',
        }
      ],
      hours:null,
      payment_card:[],
      today:null,
      broadcasting:null,
      stores_facebook_button:null,
      categories:[],
      products:[],
      stores_deparments:[]
    }
  }
}

/*
  stores(): void {
    this.authorizationService.storeByUrl(this.url)
      .subscribe(
        (response: HttpResponse<any>) => {

          if (response.status == 200) {
            this.store = response.body.content;
          }
        },
        (response: HttpErrorResponse) => {
          var message = (typeof response.error.message == 'undefined') ? '¡Sucedio un error inesperado!' : response.error.message;
        },
        () => {
          Metodos.insertPreloadStoreRemoveHidden('PRELOAD-STORE', this.getImagePrincipal(), this.store.stores_name);
        });
  }*/
