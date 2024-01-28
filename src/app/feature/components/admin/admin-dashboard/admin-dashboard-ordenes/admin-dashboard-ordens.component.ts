import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from 'src/app/interfaces/store';
import { NodeStoreService } from 'src/app/services/node-store.service';
import { environment } from 'src/environments/environment';
import { Metodos } from 'src/Utils/Metodos';
import Swal from 'sweetalert2';

declare var $: any;


@Component({
  selector: 'app-admin-dashboard-ordens',
  templateUrl: './admin-dashboard-ordens.component.html',
  styleUrls: ['./admin-dashboard-ordens.component.css']
})
export class AdminDashboardOrdensComponent implements OnInit {
  public APP_URL = environment.appUrl;
  public APP_URL_API = environment.apiUrl;
  public APP_URL_API_BASE = environment.apiUrlBase;
  public APP_AWS_SNAPSTOREPEPUBLIC=environment.apiAWSsnapstorepepublic;

  public idGeneral = '#STORE-DASHBOARD-ORDENES';
  @ViewChild('searchInput') searchInput: ElementRef;

  isLoadingUpdate:boolean=false;

  public $orders:any[]=[];

  public paginate = {
    current_page: 0,
    category_id: 0,
    subcategory_id: 0,
    total: 0,
    per_page: 0,
    last_page: 0,
    first_page_url: null,
    last_page_url: null,
    next_page_url: null,
    prev_page_url: null,
    path: null,
    from: 0,
    to: 0,
    search: ''

  };
  store:Store=null;
  $stores_uri='';

  public pagoEfectivo = 0;
  public pagoTransferencia = 0;
  public pagoAppBanco = 0;
  public pagoOtroMetodoPago = 0;
  constructor( public nodeStoreService:NodeStoreService) { 
    nodeStoreService.getStore().subscribe(data=>{
      this.store = data.store;
      this.$stores_uri=this.store.stores_uri;

      for (let index = 0; index < this.store.payment_card.length; index++) {

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
    });
  }

  ngOnInit(): void {
 
    Metodos.menuDashboardActive('ordenes');
    $.getScript(this.APP_URL+'assets/javascript/tours/dashboard/dashboard-orden-tour.js');

    this.getOrders();
  }
  /*getPriceTotal(data) {
    let precioTotal = 0;
    for (let index = 0; index < data.length; index++) {
      precioTotal += data[index]['products_cart_price'];
    }
    return precioTotal;
  }*/
  getOrders() {
    let own = this;
    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/orders',//ok

      type: 'GET',
      headers: { 
        "Authorization": localStorage.getItem('accessToken')
      },
      //data: { id: own.$stores_id },
      data: {store_id:own.store.stores_id, current_page: own.paginate.current_page, search: own.paginate.search},
      // el tipo de información que se espera de respuesta
      dataType: 'json',
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (data) {

        //if(data.content.length>0){
          own.$orders = data.content.data;
          own.paginate.current_page = data.content.current_page;
          own.paginate.total = data.content.total;
          own.paginate.per_page = data.content.per_page;
       // }

      },

      error: function (xhr, status) {
        // alert('Disculpe, existió un problema');
      },

      // código a ejecutar sin importar si la petición falló o no
      complete: function (xhr, status) {
        //  alert('Petición realizada');
      }
    });
  }

  updateFormToPay(){
    let own=this;
    let id = $(own.idGeneral).find('#formToPayModal').find('input[name="id"]').val();
    let payment_card_id;

    let arrayInputs= $(own.idGeneral).find('#formToPayModal').find('input:radio[name=payment_type]');
    for (let i = 0; i < arrayInputs.length; i++) {
      const element = arrayInputs[i];
      if(element.checked==true) payment_card_id=element.getAttribute('data');
    }
    console.log(payment_card_id)
   
 
    Swal.fire({
      title: '¿Seguro de realizar el cambio?',
      text: "¡Si esta seguro puede continuar!",
      icon: 'warning',
      //showDenyButton: false,
      showCancelButton: true,
      //confirmButtonText: `Save`,
      confirmButtonColor: '#0CC27E',
      cancelButtonColor: '#FF586B',
      confirmButtonText: '¡Si, continuar!',
      cancelButtonText: '¡No, cancelar!',
      customClass: {
        confirmButton: 'btn btn-first mr-5',
        cancelButton: 'btn btn-danger-2'
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.isConfirmed) {

           own.isLoadingUpdate=true;
            $.ajax({
              // la URL para la petición
              url: own.APP_URL_API + 'dashboard/orders/'+id+'/payment/update/'+payment_card_id,//ok
              
            // data: data,

              type: 'POST',
              headers: { 
                "Authorization": localStorage.getItem('accessToken')
              },
              // el tipo de información que se espera de respuesta
              dataType: 'json',
              // código a ejecutar si la petición es satisfactoria;
              // la respuesta es pasada como argumento a la función
              success: function(data) {

                for (let index = 0; index < own.$orders.length; index++) {
                  const element = own.$orders[index];
                  if(element.id==id){
                    element.payment_card_id=parseInt(payment_card_id);
                  } 
                }

                Swal.fire(
                  '¡Actualizado!',
                  'Su información ha sido actualizada satisfactoriamente.',
                  'success'
                )
              },

              error: function(xhr, status) {
                  // alert('Disculpe, existió un problema');
                  Swal.fire(
                    'Cancelado',
                    'Disculpe, existió un problema',
                    'error'
                  )

              },

              complete: function (xhr, status) {
                own.isLoadingUpdate=false;
              }

          });
       

      } else if (result.isDenied) {
        Swal.fire(
          'Cancelado',
          'Su información esta segura ',
          'error'
        )
      }
    });
  
  }
  paginationChange(current_page: number) {
    // console.log(current_page);
    let own = this;

    if (current_page <= 0) {
      own.paginate.current_page = 0;
      this.getOrders();
    } else {
      own.paginate.current_page = (current_page - 1);

      this.getOrders();
    }

  }

  updateOrdenes(element){
    let own = this;

    own.paginate.current_page = 0;
    own.paginate.search = '';
    element.value = '';

    this.getOrders();
  }


  cleanTableOrders(element) {
    let own = this;
    own.paginate.search = '';
    own.paginate.current_page = 0;
    element.value = '';

    this.getOrders();
  }

  
  searchTableOrders(element) {
    let own = this;
    console.log(element.value)
    own.paginate.search = element.value;
    own.paginate.current_page = 0;

    this.getOrders();

  }

  numOrdenOpenModal(id){
    let own = this;
    $(own.idGeneral).find('#numOrdenModal').find('input[name="id"]').val(id);

  }
  public $order_details:any[]=[];

  viewOpenModal(id){
    let own = this;

    $(own.idGeneral).find('#viewOrdenModal').find('input[name="id"]').val(id);
    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/orders/details/'+id+'/getAll' ,//

      type: 'GET',
      headers: { 
        "Authorization": localStorage.getItem('accessToken')
      },
      data: {store_id: own.store.stores_id, current_page: own.paginate.current_page, search: own.paginate.search},

      // el tipo de información que se espera de respuesta
      dataType: 'json',
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (data) {
      own.$order_details=data;


      },
      error: function (xhr, status) {
        // alert('Disculpe, existió un problema');
       
      },

      // código a ejecutar sin importar si la petición falló o no
      complete: function (xhr, status) {
        //  alert('Petición realizada');
       /* if(own.paginate.current_page==1){
          own.paginate.current_page=0;
          own.getOrders();
        }else{
          own.getOrders();
        }*/
      
      }
    });
  }

  debtOpenModal(id){
    let own = this;
    $(own.idGeneral).find('#debtModal').find('input[name="id"]').val(id);

  }

  programmerOpenModal(id){
    let own = this;
    $(own.idGeneral).find('#ProgrammerModal').find('input[name="id"]').val(id);

  }
  formToPayOpenModal(id,payment_card_id){
    let own = this;
    $(own.idGeneral).find('#formToPayModal').find('input[name="id"]').val(id);
    document.getElementById('payment_type'+payment_card_id).click();

    //payment_type{{item.id}}
  }

  descriptionOpenModal(id){
    let own = this;
    $(own.idGeneral).find('#descriptionModal').find('input[name="id"]').val(id);

    for(var i =0; i<own.$orders.length;i++){
      if(own.$orders.length==i){break;}
      
      if(own.$orders[i].id==id){
        $(own.idGeneral).find('#descriptionModal').find('textarea[name="description"]').val(own.$orders[i].description);
        $(own.idGeneral).find('#descriptionModal').find('textarea[name="comment"]').val(own.$orders[i].comment);
      }
    }
  }

  collectOnChange(id){
    let own = this;
    Swal.fire({
      title: '¿Seguro de realizar el cambio?',
      text: "¡Si esta seguro puede continuar!",
      icon: 'warning',
      //showDenyButton: false,
      showCancelButton: true,
      //confirmButtonText: `Save`,
      confirmButtonColor: '#0CC27E',
      cancelButtonColor: '#FF586B',
      confirmButtonText: '¡Si, continuar!',
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
          url: own.APP_URL_API + 'dashboard/orders/collect/' + id,//

          type: 'POST',
          headers: { 
            "Authorization": localStorage.getItem('accessToken')
          },
          // el tipo de información que se espera de respuesta
          dataType: 'json',
          // código a ejecutar si la petición es satisfactoria;
          // la respuesta es pasada como argumento a la función
          success: function (data) {
           

            Swal.fire(
              '¡Actualizado!',
              'Su información ha sido actualizada satisfactoriamente.',
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
          },

          // código a ejecutar sin importar si la petición falló o no
          complete: function (xhr, status) {
            //  alert('Petición realizada');
           /* if(own.paginate.current_page==1){
              own.paginate.current_page=0;
              own.getOrders();
            }else{
              own.getOrders();
            }*/
          
          }
        });

      } else if (result.isDenied) {
        Swal.fire(
          'Cancelado',
          'Su información esta segura ',
          'error'
        )
      }


    })
  }
  statusPayOnChange(id,status){
    let own = this;
    Swal.fire({
      title: '¿Seguro de realizar el cambio?',
      text: "¡Si esta seguro puede continuar!",
      icon: 'warning',
      //showDenyButton: false,
      showCancelButton: true,
      //confirmButtonText: `Save`,
      confirmButtonColor: '#0CC27E',
      cancelButtonColor: '#FF586B',
      confirmButtonText: '¡Si, continuar!',
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
          url: own.APP_URL_API + 'dashboard/orders/status/pay/' + id,//

          type: 'POST',
          headers: { 
            "Authorization": localStorage.getItem('accessToken')
          },
          data: {status:status},

          // el tipo de información que se espera de respuesta
          dataType: 'json',
          // código a ejecutar si la petición es satisfactoria;
          // la respuesta es pasada como argumento a la función
          success: function (data) {
           

            Swal.fire(
              '¡Actualizado!',
              'Su información ha sido actualizada satisfactoriamente.',
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
          },

          // código a ejecutar sin importar si la petición falló o no
          complete: function (xhr, status) {
            //  alert('Petición realizada');
           /* if(own.paginate.current_page==1){
              own.paginate.current_page=0;
              own.getOrders();
            }else{
              own.getOrders();
            }*/
          
          }
        });

      } else if (result.isDenied) {
        Swal.fire(
          'Cancelado',
          'Su información esta segura ',
          'error'
        )
      }


    })
  }
  /*
  
Recibida

Revisada

Asignada

En Camino

Finalizada

Anulada
  */
  statusOrderOnChange(id,status){
    let own = this;
    Swal.fire({
      title: '¿Seguro de realizar el cambio?',
      text: "¡Si esta seguro puede continuar!",
      icon: 'warning',
      //showDenyButton: false,
      showCancelButton: true,
      //confirmButtonText: `Save`,
      confirmButtonColor: '#0CC27E',
      cancelButtonColor: '#FF586B',
      confirmButtonText: '¡Si, continuar!',
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
          url: own.APP_URL_API + 'dashboard/orders/status/' + id,//

          type: 'POST',
          headers: { 
            "Authorization": localStorage.getItem('accessToken')
          },
          data: {status:status},

          // el tipo de información que se espera de respuesta
          dataType: 'json',
          // código a ejecutar si la petición es satisfactoria;
          // la respuesta es pasada como argumento a la función
          success: function (data) {
           

            Swal.fire(
              '¡Actualizado!',
              'Su información ha sido actualizada satisfactoriamente.',
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
          },

          // código a ejecutar sin importar si la petición falló o no
          complete: function (xhr, status) {
            //  alert('Petición realizada');
           /* if(own.paginate.current_page==1){
              own.paginate.current_page=0;
              own.getOrders();
            }else{
              own.getOrders();
            }*/
          
          }
        });

      } else if (result.isDenied) {
        Swal.fire(
          'Cancelado',
          'Su información esta segura ',
          'error'
        )
      }


    })
  }
  addComment(){
    let own = this;
    let id = $(own.idGeneral).find('#descriptionModal').find('input[name="id"]').val();
    let description = $(own.idGeneral).find('#descriptionModal').find('textarea[name="description"]').val();
    let comment = $(own.idGeneral).find('#descriptionModal').find('textarea[name="comment"]').val();

    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/orders/descriptions/'+id,//ok

      type: 'POST',
      headers: { 
        "Authorization": localStorage.getItem('accessToken')
      },
      //data: { id: own.$stores_id },
      data: {store_id:own.store.stores_id, description: description, comment:comment, search: own.paginate.search},
      // el tipo de información que se espera de respuesta
      dataType: 'json',
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (data) {

        Swal.fire(
          'Agregado!',
          'Ha sido agregado satisfactoriamente.',
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
      },

      // código a ejecutar sin importar si la petición falló o no
      complete: function (xhr, status) {
        //  alert('Petición realizada');
        $(own.idGeneral).find('#ProgrammerModal').modal('hide');
        if(own.paginate.current_page==1){
          own.paginate.current_page=0;
          own.getOrders();
        }else{
          own.getOrders();
        }
      
      }
    });

  }
  addProgrammer(){
    let own = this;
    let id = $(own.idGeneral).find('#ProgrammerModal').find('input[name="id"]').val();
    let num_programmer = $(own.idGeneral).find('#ProgrammerModal').find('input[name="num_programmer"]').val();
    let num_time = $(own.idGeneral).find('#ProgrammerModal').find('input[name="num_time"]').val();

    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/orders/programmer/'+id,//ok

      type: 'POST',
      headers: { 
        "Authorization": localStorage.getItem('accessToken')
      },
      //data: { id: own.$stores_id },
      data: {store_id:own.store.stores_id, num_programmer: num_programmer,num_time:num_time, search: own.paginate.search},
      // el tipo de información que se espera de respuesta
      dataType: 'json',
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (data) {

        Swal.fire(
          'Agregado!',
          'Ha sido agregado satisfactoriamente.',
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
      },

      // código a ejecutar sin importar si la petición falló o no
      complete: function (xhr, status) {
        //  alert('Petición realizada');
        $(own.idGeneral).find('#ProgrammerModal').modal('hide');
        if(own.paginate.current_page==1){
          own.paginate.current_page=0;
          own.getOrders();
        }else{
          own.getOrders();
        }
      
      }
    });

  }
  addDebt(){
    let own = this;
    let id = $(own.idGeneral).find('#debtModal').find('input[name="id"]').val();
    let num_debt = $(own.idGeneral).find('#debtModal').find('input[name="num_debt"]').val();

    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/orders/debt/'+id,//ok

      type: 'POST',
      headers: { 
        "Authorization": localStorage.getItem('accessToken')
      },
      //data: { id: own.$stores_id },
      data: {store_id:own.store.stores_id, debt: num_debt, search: own.paginate.search},
      // el tipo de información que se espera de respuesta
      dataType: 'json',
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (data) {

        Swal.fire(
          'Agregado!',
          'Ha sido agregado satisfactoriamente.',
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
      },

      // código a ejecutar sin importar si la petición falló o no
      complete: function (xhr, status) {
        //  alert('Petición realizada');
        $(own.idGeneral).find('#debtModal').modal('hide');
        if(own.paginate.current_page==1){
          own.paginate.current_page=0;
          own.getOrders();
        }else{
          own.getOrders();
        }
      
      }
    });

  }

  /*addFormToPay(){
    let own = this;
    let id = $(own.idGeneral).find('#numOrdenModal').find('input[name="id"]').val();

    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/orders/formtopay/'+id,//ok

      type: 'POST',

      //data: { id: own.$stores_id },
      data: {uri:own.$stores_uri, search: own.paginate.search},
      // el tipo de información que se espera de respuesta
      dataType: 'json',
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (data) {

        Swal.fire(
          'Agregado!',
          'Ha sido agregado satisfactoriamente.',
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
      },

      // código a ejecutar sin importar si la petición falló o no
      complete: function (xhr, status) {
        //  alert('Petición realizada');
        $(own.idGeneral).find('#numOrdenModal').modal('hide');
        if(own.paginate.current_page==1){
          own.paginate.current_page=0;
          own.getOrders();
        }else{
          own.getOrders();
        }
      
      }
    });

  }*/
  addNumOrden(){
    let own = this;
    let id = $(own.idGeneral).find('#numOrdenModal').find('input[name="id"]').val();
    let num_orden = $(own.idGeneral).find('#numOrdenModal').find('input[name="num_orden"]').val();

    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/orders/code/'+id,//ok

      type: 'POST',
      headers: { 
        "Authorization": localStorage.getItem('accessToken')
      },
      //data: { id: own.$stores_id },
      data: {store_id:own.store.stores_id, code: num_orden, search: own.paginate.search},
      // el tipo de información que se espera de respuesta
      dataType: 'json',
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (data) {

        Swal.fire(
          'Agregado!',
          'Ha sido agregado satisfactoriamente.',
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
      },

      // código a ejecutar sin importar si la petición falló o no
      complete: function (xhr, status) {
        //  alert('Petición realizada');
        $(own.idGeneral).find('#numOrdenModal').modal('hide');
        if(own.paginate.current_page==1){
          own.paginate.current_page=0;
          own.getOrders();
        }else{
          own.getOrders();
        }
      
      }
    });

  }

  priceTotal(element){
    let priceTotal=0.0;

    for(var i=0;i<element.length;i++){
      if(i==element.length){break;}
      let $value=element[i];

      if($value.order_detail_discounted!= null){
        priceTotal+=(($value.order_detail_price - ($value.order_detail_price * $value.order_detail_discounted/100 ))*$value.order_detail_quantity);
      }
      if($value.order_detail_discounted== null){
        priceTotal+=(($value.order_detail_price )*$value.order_detail_quantity);
      }
    }
    return priceTotal;
  }

  public getImageProduct(stores_image_url) {
    return  this.APP_AWS_SNAPSTOREPEPUBLIC+ stores_image_url;
  }
}
