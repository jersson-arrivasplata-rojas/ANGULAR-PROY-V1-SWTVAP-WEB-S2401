import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Metodos } from 'src/Utils/Metodos';
import { Order } from 'src/app/interfaces/order';
import { OrderDetail } from 'src/app/interfaces/order-detail';
import { Paginate } from 'src/app/interfaces/paginate';
import { Product } from 'src/app/interfaces/product';
import { Store } from 'src/app/interfaces/store';
import { StoreSearch } from 'src/app/interfaces/store-search';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { NodeStoreService } from 'src/app/services/node-store.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-admin-dashboard-orden-edit',
  templateUrl: './admin-dashboard-orden-edit.component.html',
  styleUrls: ['./admin-dashboard-orden-edit.component.css']
})
export class AdminDashboardOrdenEditComponent implements OnInit {
  public APP_URL = environment.appUrl;
  public APP_URL_API = environment.apiUrl;
  public APP_URL_API_BASE = environment.apiUrlBase;
  public APP_AWS_SNAPSTOREPEPUBLIC=environment.apiAWSsnapstorepepublic;

  preloadDashboard:boolean = false;
  public products: OrderDetail[] = [];
  public precioTotal = 0;
  public order_id=0;
  public filters: any = [];

  public order: Order = null;
  idGeneral='#STORE-DASHBOARD-ORDEN-EDIT';

  store:Store=null;
  public alerProduct:boolean = false;
  public search: StoreSearch = null;
  public paginate: Paginate = null;
  public array_product: Product[] = [];
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

  constructor(public authorizationService:AuthorizationService,
    private router: Router,
    public authGuardService:AuthGuardService,
    private route: ActivatedRoute,
    public nodeStoreService:NodeStoreService) {
    nodeStoreService.getStore().subscribe(data=>{
      this.store = data.store;
    });

    this.cleanPaginate();
    this.cleanSearch();
  }

  ngOnInit(): void {
    Metodos.insertPreloadStoreRemoveHidden('PRELOAD-DASHBOARD-ORDEN-EDIT', this.getImagePrincipal(), this.store.stores_name);

    //const id = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.order_id = params['id'];
      this.carts();
    });

  }

  getPriceTotal() {
    this.precioTotal = 0;
    for (let index = 0; index < this.products.length; index++) {
      this.precioTotal += this.products[index]['products_cart_price'];
    }
  }

  carts(): void {
    this.authorizationService.dashboardStoreCarts(this.order_id)
      .subscribe(
        (response: HttpResponse<any>) => {
          if (response.status == 200) {
            this.products = response.body.content;
            this.order = response.body.order;
            this.getPriceTotal();
          }
        },
        (response: HttpErrorResponse) => {
          //console.log(response);
          var message = (typeof response.error.message == 'undefined') ? '¡Sucedio un error inesperado!' : response.error.message;


        },
        () => {
          this.preloadDashboard=true;
          Metodos.removeNodoPreloadHidden('PRELOAD-DASHBOARD-ORDEN-EDIT');

        });
  }



/*

  remove(product_id) {
    this.products = [];
    this.authorizationService.dashboardRemoveCart(product_id, this.store.stores_uri)
      .subscribe(
        (response: HttpResponse<any>) => {
          if (response.status == 200) {
            this.store = response.body.content;
            this.getPriceTotal();
          }
        },
        (response: HttpErrorResponse) => {
          var message = (typeof response.error.message == 'undefined') ? '¡Sucedio un error inesperado!' : response.error.message;
        },
        () => {

        });

  }
*/
  remove(products_id,order_details_id){
    let own = this;
    Swal.fire({
      title: '¿Seguro de eliminar?',
      text: "¡Si eliminas no podras revertir los cambios!",
      icon: 'warning',
      //showDenyButton: false,
      showCancelButton: true,
      //confirmButtonText: `Save`,
      confirmButtonColor: '#0CC27E',
      cancelButtonColor: '#FF586B',
      confirmButtonText: '¡Si, eliminar!',
      cancelButtonText: '¡No, cancelar!',
      customClass: {
        confirmButton: 'btn btn-first mr-5',
        cancelButton: 'btn btn-danger-2'
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.isConfirmed) {
        $.ajax({
          // la URL para la petición
          url: own.APP_URL_API +  `dashboard/store/product/remove/cart?products_id=${products_id}&order_id=${own.order_id}&order_details_id=${order_details_id}`,//

          type: 'GET',
          headers: {
            "Authorization": localStorage.getItem('accessToken')
          },
          // el tipo de información que se espera de respuesta
          dataType: 'json',
          // código a ejecutar si la petición es satisfactoria;
          // la respuesta es pasada como argumento a la función
          success: function (response) {
            own.products = response.content;
            own.getPriceTotal();

            //$(self).parent('tr').remove()
            Swal.fire(
              '¡Eliminado!',
              'Su información ha sido eliminada satisfactoriamente.',
              'success'
            )

          },
          error: function (xhr, status) {
            // alert('Disculpe, existió un problema');
            Swal.fire(
              'Cancelado',
              'Disculpe, existió un problema',
              'error'
            )
          }
        });

      } else if (result.isDenied) {
       /* Swal.fire(
          'Cancelado',
          'Su información esta segura ',
          'error'
        )*/
      }


    })

  }

  saveProfile(){
    let own = this;

    let user_first_name = $(this.idGeneral).find('#Nombre').val();
    let user_last_name = $(this.idGeneral).find('#Apellido').val();
    let user_celphone = $(this.idGeneral).find('#Celular').val();
    let user_email = $(this.idGeneral).find('#Correo').val();
    let address = $(this.idGeneral).find('#Direccion').val();
    let optional_address = $(this.idGeneral).find('#Referencia').val();
    let address_google_maps = $(this.idGeneral).find('#maps').val();

    if(user_first_name==''){
      Swal.fire(
        '¡Falta agregar nombre!',
        'Disculpe, debe ingresar el nombre',
        'warning'
      )

      return false;}
    //if(user_celphone=='') return false;
    //if(user_email=='') return false;
    //if(user_first_name=='') return false;
    //if(user_first_name=='') return false;

    Swal.fire({
      title: '¿Seguro de editar?',
      text: "¡Si editar no podras desahacer los cambios. !",
      icon: 'warning',
      //showDenyButton: false,
      showCancelButton: true,
      //confirmButtonText: `Save`,
      confirmButtonColor: '#0CC27E',
      cancelButtonColor: '#FF586B',
      confirmButtonText: '¡Si, editar!',
      cancelButtonText: '¡No, cancelar!',
      customClass: {
        confirmButton: 'btn btn-first mr-5',
        cancelButton: 'btn btn-danger-2'
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.isConfirmed) {
        var data = {
           user_first_name :user_first_name,
           user_last_name :user_last_name,
           user_celphone :user_celphone,
           user_email :user_email,
           address :address,
           optional_address :optional_address,
           address_google_maps :address_google_maps
        }
        $.ajax({
          // la URL para la petición
          url: own.APP_URL_API + 'dashboard/order/'+own.order_id+'/profile/edit' ,//ok

          data: data,

          type: 'POST',
          headers: {
            "Authorization": localStorage.getItem('accessToken')
          },
          // el tipo de información que se espera de respuesta
          dataType: 'json',




          // código a ejecutar si la petición es satisfactoria;
          // la respuesta es pasada como argumento a la función
          success: function(response) {

            //own.products = response.content;

              Swal.fire(
                  'Agregado!',
                  'Ha sido agregado satisfactoriamente.',
                  'success'
              )
          },

          error: function(xhr, status) {
            Swal.fire(
              'Cancelado',
              'Su información esta segura ',
              'error'
            )
          }
      });

      } else if (result.isDenied) {
      }

    })
    return true;

  }
 editCart(product_id,order_details_id,content){
    //console.log(this.alert);
    let own = this;

    let quantity = $('#input-product-quantity-'+product_id).val();
    let price_with_discount = $('#input-product-with-discount-'+product_id).val()
    let subtotal=this.financial(quantity*price_with_discount);


    Swal.fire({
      title: '¿Seguro de editar?',
      text: "¡Si editar no podras desahacer los cambios. !",
      icon: 'warning',
      //showDenyButton: false,
      showCancelButton: true,
      //confirmButtonText: `Save`,
      confirmButtonColor: '#0CC27E',
      cancelButtonColor: '#FF586B',
      confirmButtonText: '¡Si, editar!',
      cancelButtonText: '¡No, cancelar!',
      customClass: {
        confirmButton: 'btn btn-first mr-5',
        cancelButton: 'btn btn-danger-2'
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.isConfirmed) {
        var data = {
          quantity :quantity,
          price_with_discount :price_with_discount,
          subtotal:subtotal
        }
        $.ajax({
          // la URL para la petición
          url: own.APP_URL_API + 'dashboard/order/'+own.order_id+'/detail/'+order_details_id+'/edit' ,//ok

          data: data,

          type: 'POST',
          headers: {
            "Authorization": localStorage.getItem('accessToken')
          },
          // el tipo de información que se espera de respuesta
          dataType: 'json',
          // código a ejecutar si la petición es satisfactoria;
          // la respuesta es pasada como argumento a la función
          success: function(response) {
            own.products = response.content;
            own.getPriceTotal();
              Swal.fire(
                  'Editado!',
                  'Ha sido editado satisfactoriamente.',
                  'success'
              )
          },

          error: function(xhr, status) {
            Swal.fire(
              'Cancelado',
              'Su información esta segura ',
              'error'
            )
          }
      });

      } else if (result.isDenied) {
      }

    })
    return true;
  }

  addCart(product_id,content){
    //console.log(this.alert);
    let own = this;

    let quantity = $('#input-product-cart1-'+product_id).val();
    if(quantity==''||quantity==null||isNaN(quantity)==true){
      quantity=1;
    }else{
      quantity=parseFloat(quantity);
    }


    Swal.fire({
      title: '¿Seguro de agregar?',
      text: "¡Si agregar no podras deshacer los cambios. !",
      icon: 'warning',
      //showDenyButton: false,
      showCancelButton: true,
      //confirmButtonText: `Save`,
      confirmButtonColor: '#0CC27E',
      cancelButtonColor: '#FF586B',
      confirmButtonText: '¡Si, agregar!',
      cancelButtonText: '¡No, cancelar!',
      customClass: {
        confirmButton: 'btn btn-first mr-5',
        cancelButton: 'btn btn-danger-2'
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.isConfirmed) {
        var data = {
          quantity :quantity,
          product_id:product_id
        }
        $.ajax({
          // la URL para la petición
          url: own.APP_URL_API + 'dashboard/order/'+own.order_id+'/detail/add' ,//ok

          data: data,

          type: 'POST',
          headers: {
            "Authorization": localStorage.getItem('accessToken')
          },
          // el tipo de información que se espera de respuesta
          dataType: 'json',
          // código a ejecutar si la petición es satisfactoria;
          // la respuesta es pasada como argumento a la función
          success: function(response) {
            if(response.response==true){
              own.products = response.content;
              own.getPriceTotal();
              Swal.fire(
                  'Agregado!',
                  'Ha sido agregado satisfactoriamente.',
                  'success'
              )
            }else if(response.response==false){
              Swal.fire(
                'No Agregado!',
                'Revise si su producto ya ha sido agregado y editelo',
                'warning'
              )
            }

          },

          error: function(xhr, status) {
            Swal.fire(
              'Cancelado',
              'Su información esta segura ',
              'error'
            )
          }
      });

      } else if (result.isDenied) {
      }

    })
    return true;
  }


  busquedaExplorar() {

    document.getElementById('PRELOAD-STORE-PRODUCTS-CARGANDO').removeAttribute('hidden');
    document.getElementById('BUSQUEDA-GRATUITA-PAGINATION').setAttribute('hidden', 'hidden');

    this.search.filters = this.filters.join();
    this.array_product = [];
    this.authorizationService.storeProductSearch(this.store.stores_uri, this.search.product, this.search.current_page, this.search.filters, this.search.price_min, this.search.price_max, this.search.check_promotions)
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
  public getImagePrincipal() {
    return (this.store?.stores_image == null || this.store?.stores_image == '') ? Metodos.getImageDefault100X100(this.APP_URL) : this.store?.stores_image_url;
  }
  getType() {
    return this.authGuardService.getType();
  }
  public getImageProduct(image_url) {
    return  this.APP_AWS_SNAPSTOREPEPUBLIC+(image_url).replace('lg/', 'xs/');
  }

  updatequantity(value,product_id){
    console.log(value)
    let product_with_discount = $('#input-product-with-discount-'+product_id).val();
    if(product_with_discount==''||product_with_discount==null||isNaN(product_with_discount)==true){
      product_with_discount=1;
    }else{
      product_with_discount=parseFloat(product_with_discount);
    }
    let quantity = value;
    if(quantity==''||quantity==null||isNaN(quantity)==true){
      quantity=1;
    }else{
      quantity=parseFloat(quantity);
    }

    $('#input-price-subtotal-'+product_id).text(this.financial(quantity*product_with_discount));

    $('#input-product-quantity-'+product_id).val(quantity);
    $('#input-product-with-discount-'+product_id).val(product_with_discount)

    this.reloadPrice(product_id,(quantity*product_with_discount));
  }
  financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }


  reloadPrice(product_id,price){
    this.precioTotal = 0;
    for (let index = 0; index < this.products.length; index++) {
      if(this.products[index].products_id!=product_id){
        this.precioTotal += this.products[index]['products_cart_price'];
      }
    }
    this.precioTotal += price;

  }



  updateprice(value,product_id){
    console.log(value)
    let quantity = $('#input-product-quantity-'+product_id).val();
    if(quantity==''||quantity==null||isNaN(quantity)==true){
      quantity=1;
    }else{
      quantity=parseFloat(quantity);
    }
    let product_with_discount = value;
    if(product_with_discount==''||product_with_discount==null||isNaN(product_with_discount)==true){
      product_with_discount=1;
    }else{
      product_with_discount=parseFloat(product_with_discount);
    }

    $('#input-price-subtotal-'+product_id).text(this.financial(quantity*product_with_discount));

    $('#input-product-quantity-'+product_id).val(quantity);
    $('#input-product-with-discount-'+product_id).val(product_with_discount)
    this.reloadPrice(product_id,(quantity*product_with_discount));

  }
  //price-total-span-general
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
}
