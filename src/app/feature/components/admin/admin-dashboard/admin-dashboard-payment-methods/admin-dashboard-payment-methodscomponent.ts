import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/interfaces/store';
import { NodeStoreService } from 'src/app/services/node-store.service';
import { environment } from 'src/environments/environment';
import { Metodos } from 'src/Utils/Metodos';
import Swal from 'sweetalert2';

declare var $: any;
let stores_uri = '';
let stores_id = '';
@Component({
  selector: 'app-admin-dashboard-payment-methods',
  templateUrl: './admin-dashboard-payment-methods.component.html',
  styleUrls: ['./admin-dashboard-payment-methods.component.css']
})
export class AdminDashboardPaymentMethodsComponent implements OnInit {
  public APP_URL = environment.appUrl;
  public APP_URL_API = environment.apiUrl;
  public idGeneral = '#STORE-DASHBOARD-FORMASPAGO';

  public $stores_uri: string;
  public $payments_card: any[] = [];

  public $pagoEfectivo=0;
  public $pagoOtroMetodoPago=0;
  public $pagoTransferencia=0;
  public $pagoAppBanco=0;
  store:Store=null;

  preloadDashboard:boolean = false;
  isLoadingPagoEfectivo: boolean = false;
  isLoadingPagoEfectivoUpdate: boolean = false;
  isLoadingPagoEfectivoDelete: boolean = false;
  isLoadingOtroMetodoPago: boolean = false;
  isLoadingOtroMetodoPagoUpdate: boolean = false;
  isLoadingOtroMetodoPagoDelete: boolean = false;
  isLoadingPagoTransferencia: boolean = false;
  isLoadingPagoTransferenciaUpdate: boolean = false;
  isLoadingPagoTransferenciaDelete: boolean = false;
  isLoadingPagoAppBanco: boolean = false;
  isLoadingPagoAppBancoUpdate: boolean = false;
  isLoadingPagoAppBancoDelete: boolean = false;

  constructor( public nodeStoreService:NodeStoreService) {
    nodeStoreService.getStore().subscribe(data=>{
      this.store = data.store;
    }); 
  }
  

  public pagoEfectivo = [
    {
      payment_id: 1,
      description: 'Pago en Efectivo',
      image: 'pagoefectivo.png',
      type: 0
    }
  ];

  public pagoTransferencia = [
    {
      payment_id: 2,
      card_id: 1,
      description: 'BCP',
      image: 'bcp.png',
      type: 'card'
    },
    {
      payment_id: 2,
      card_id: 2,
      description: 'BBVA',
      image: 'bbva.png',
      type: 'card'
    },
    {
      payment_id: 2,
      card_id: 3,
      description: 'SCOTIABANK',
      image: 'nuevo-logo-scotiabank-dos.jpg',
      type: 'card'
    },
    {
      payment_id: 2,
      card_id: 4,
      description: 'INTERBANK',
      image: 'interbank.png',
      type: 'card'
    },
    {
      payment_id: 2,
      card_id: 7,
      description: 'BANCO PICHINCHA',
      image: 'bancopichincha.png',
      type: 'card'
    },
    {
      payment_id: 2,
      card_id: 5,
      description: 'DINERS CLUB INTERNATIONAL',
      image: 'diners-club-international.png',
      type: 'card'
    },
    {
      payment_id: 2,
      card_id: 8,
      description: 'AMERICAN EXPRESS',
      image: 'american-express.png',
      type: 'card'
    }
  ];

  public pagoAppBanco = [
    {
      payment_id: 3,
      description: 'Yape',
      image: 'yape.png'
    },
    {
      payment_id: 4,
      description: 'Tunki',
      image: 'tunki.png'
    },
    {
      payment_id: 8,
      description: 'Lukita',
      image: 'lukita.png'
    },
    {
      payment_id: 7,
      description: 'Plin',
      image: 'plin.png'
    }
  ];
  public pagoOtroMetodoPago = [
    {
      payment_id: 5,
      description: 'Vende Más',
      image: 'vendemas.png'
    },
    {
      payment_id: 6,
      description: 'IziPay',
      image: 'izipay.png'
    }
  ];/**/

  ngOnInit(): void {
    Metodos.menuDashboardActive('formas-pago');
    $.getScript(this.APP_URL+'assets/javascript/tours/dashboard/dashboard-forma-pago-tour.js');
    this.getPayments();
  }

  getBooleanOtroMetodoPago(payment_id){
    let own = this;
    for(let i =0; i<own.$payments_card.length; i++){
      if(i==own.$payments_card.length){ break;}
      for(let j =0; j<own.$payments_card[i].payment.length; j++){
        if(own.$payments_card[i].payment[j].id==payment_id){
          return false;
        }
      }
    }
    return true;
  }
  getBooleanBankMetodoPago(payment_id){
    let own = this;
    for(let i =0; i<own.$payments_card.length; i++){
      if(i==own.$payments_card.length){ break;}
      for(let j =0; j<own.$payments_card[i].payment.length; j++){
        if(own.$payments_card[i].payment[j].id==payment_id){
          return false;
        }

      }
    }
    return true;
  }
  getBooleanTransferenciaMetodoPago(payment_id,card_id){
    let own = this;
    for(let i =0; i<own.$payments_card.length; i++){
      if(i==own.$payments_card.length){ break;}
      for(let j =0; j<own.$payments_card[i].payment.length; j++){
        if(own.$payments_card[i].payment[j].id==payment_id){
          if(own.$payments_card[i].card[0].id==card_id ){
            return false;
          }
        }
      }
    }
    return true;
  }
  addTransferenciaMetododePago(){
    let own = this;
    Swal.fire({
      title: '¿Seguro de agregar?',
      text: "¡Si continuas se agregar el método de pago!",
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

        var data: any = {};
        data.payment_id = own.pagoTransferencia[0].payment_id;

        data.card_id = $(own.idGeneral).find('#pagoTransferenciaModal').find('input[name=transfer_metodo_pago_add]:checked').val()
        data.num_count = $(own.idGeneral).find('#pagoTransferenciaModal').find('.num_count').val()
        data.num_count_cci = $(own.idGeneral).find('#pagoTransferenciaModal').find('.num_count_cci').val()
        data.name = $(own.idGeneral).find('#pagoTransferenciaModal').find('.name').val()
        data.store_id = own.store.stores_id;
        $.ajax({
          // la URL para la petición
          url: own.APP_URL_API + 'dashboard/payments/transfers',//

          data: data,

          dataType: 'json',

          type: 'POST',
          headers: { 
            "Authorization": localStorage.getItem('accessToken')
          },
          // código a ejecutar si la petición es satisfactoria;
          // la respuesta es pasada como argumento a la función
          success: function (data) {

            //$(self).parent('tr').remove()
            Swal.fire(
              '¡Agregado!',
              'Su información ha sido agregada satisfactoriamente.',
              'success'
            )
            own.getPayments();
          },

          error: function (xhr, status) {
            // alert('Disculpe, existió un problema');
            Swal.fire(
              'Cancelado',
              'Disculpe, existió un problema',
              'error'
            )
          },
          complete: function (xhr, status) {
            $(own.idGeneral).find('#pagoTransferenciaModal').modal('hide')
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
  addBankMetododePago(){
    let own = this;
    Swal.fire({
      title: '¿Seguro de agregar?',
      text: "¡Si continuas se agregar el método de pago!",
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

        var data: any = {};
        data.payment_id = $(own.idGeneral).find('#pagoAppBancoModal').find('input[name=bank_metodo_pago_add]:checked').val()
        data.celphone = $(own.idGeneral).find('#pagoAppBancoModal').find('.celphone').val()
        data.name = $(own.idGeneral).find('#pagoAppBancoModal').find('.name').val()

        data.store_id = own.store.stores_id;
        $.ajax({
          // la URL para la petición
          url: own.APP_URL_API + 'dashboard/payments/appbanks',//

          data: data,

          dataType: 'json',

          type: 'POST',
          headers: { 
            "Authorization": localStorage.getItem('accessToken')
          },
          // código a ejecutar si la petición es satisfactoria;
          // la respuesta es pasada como argumento a la función
          success: function (data) {

            //$(self).parent('tr').remove()
            Swal.fire(
              '¡Agregado!',
              'Su información ha sido agregada satisfactoriamente.',
              'success'
            )
            own.getPayments();
          },

          error: function (xhr, status) {
            // alert('Disculpe, existió un problema');
            Swal.fire(
              'Cancelado',
              'Disculpe, existió un problema',
              'error'
            )
          },
          complete: function (xhr, status) {
            $(own.idGeneral).find('#pagoAppBancoModal').modal('hide')
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
  addOtroMetododePago(){
    let own = this;
    Swal.fire({
      title: '¿Seguro de agregar?',
      text: "¡Si continuas se agregar el método de pago!",
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

        var data: any = {};
        data.payment_id = $(own.idGeneral).find('#pagoOtroMetodoPagoModal').find('input[name=otro_metodo_pago_add]:checked').val()
        data.comision = $(own.idGeneral).find('#pagoOtroMetodoPagoModal').find('.comision').val()
        data.store_id = own.store.stores_id;
        $.ajax({
          // la URL para la petición
          url: own.APP_URL_API + 'dashboard/payments/others',//

          data: data,

          dataType: 'json',

          type: 'POST',
          headers: { 
            "Authorization": localStorage.getItem('accessToken')
          },
          // código a ejecutar si la petición es satisfactoria;
          // la respuesta es pasada como argumento a la función
          success: function (data) {

            //$(self).parent('tr').remove()
            Swal.fire(
              '¡Agregado!',
              'Su información ha sido agregada satisfactoriamente.',
              'success'
            )
            own.getPayments();
          },

          error: function (xhr, status) {
            // alert('Disculpe, existió un problema');
            Swal.fire(
              'Cancelado',
              'Disculpe, existió un problema',
              'error'
            )
          },
          complete: function (xhr, status) {
            $(own.idGeneral).find('#pagoOtroMetodoPagoModal').modal('hide')
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
  addPagoEfectivo() {
    let own = this;
    Swal.fire({
      title: '¿Seguro de agregar pago en efectivo?',
      text: "¡Si continuas se agregar el pago en efectivo!",
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

        var data: any = {};
        data.payment_id = own.pagoEfectivo[0].payment_id;
        data.store_id = own.store.stores_id;
        $.ajax({
          // la URL para la petición
          url: own.APP_URL_API + 'dashboard/payments',//

          data: data,

          dataType: 'json',

          type: 'POST',
          headers: { 
            "Authorization": localStorage.getItem('accessToken')
          },
          // código a ejecutar si la petición es satisfactoria;
          // la respuesta es pasada como argumento a la función
          success: function (data) {

            //$(self).parent('tr').remove()
            Swal.fire(
              '¡Agregado!',
              'Su información ha sido agregada satisfactoriamente.',
              'success'
            )
            own.getPayments();
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
        Swal.fire(
          'Cancelado',
          'Su información esta segura ',
          'error'
        )
      }


    })

  }

  editAppBankModal(id){
    let own = this;
    $(own.idGeneral).find('#pagoAppBancoModalEdit').modal('show');
    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/payments/'+id,//ok

      type: 'GET',
      headers: { 
        "Authorization": localStorage.getItem('accessToken')
      },
      //data: { id: own.$stores_id },
      data: { store_id: own.store.stores_id },
      // el tipo de información que se espera de respuesta
      dataType: 'json',
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (data) {

        // data.content;
        if(data.content.length>0){
          $(own.idGeneral).find('#pagoAppBancoModalEdit').find('.payment_card_id').val(data.content[0].id);
          $(own.idGeneral).find('#pagoAppBancoModalEdit').find('.name').val(data.content[0].name);
          $(own.idGeneral).find('#pagoAppBancoModalEdit').find('.celphone').val(data.content[0].celphone);
        }
      },

      error: function (xhr, status) {
        // alert('Disculpe, existió un problema');
      },

      // código a ejecutar sin importar si la petición falló o no
      complete: function (xhr, status) {
        //  alert('Petición realizada');$(own.idGeneral).find('#pagoOtroMetodoPagoModal')
      }
    });
  }
  editOtherModal(id){
    let own = this;
    $(own.idGeneral).find('#pagoOtroMetodoPagoModalEdit').modal('show');
    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/payments/'+id,//ok

      type: 'GET',
      headers: { 
        "Authorization": localStorage.getItem('accessToken')
      },
      //data: { id: own.$stores_id },
      data: { store_id: own.store.stores_id },
      // el tipo de información que se espera de respuesta
      dataType: 'json',
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (data) {

        // data.content;
        if(data.content.length>0){   
     
        $(own.idGeneral).find('#pagoOtroMetodoPagoModalEdit').find('.payment_card_id').val(data.content[0].id);
        $(own.idGeneral).find('#pagoOtroMetodoPagoModalEdit').find('.comision').val(data.content[0].comision);
     
        }
      },

      error: function (xhr, status) {
        // alert('Disculpe, existió un problema');
      },

      // código a ejecutar sin importar si la petición falló o no
      complete: function (xhr, status) {
        //  alert('Petición realizada');$(own.idGeneral).find('#pagoOtroMetodoPagoModal')
      }
    });
  }

  editTransferModal(id){
    let own = this;
    $(own.idGeneral).find('#pagoTransferenciaModalEdit').modal('show');
    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/payments/'+id,//ok

      type: 'GET',
      headers: { 
        "Authorization": localStorage.getItem('accessToken')
      },
      //data: { id: own.$stores_id },
      data: { store_id: own.store.stores_id },
      // el tipo de información que se espera de respuesta
      dataType: 'json',
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (data) {

        // data.content;
        if(data.content.length>0){
          $(own.idGeneral).find('#pagoTransferenciaModalEdit').find('.payment_card_id').val(data.content[0].id);
          $(own.idGeneral).find('#pagoTransferenciaModalEdit').find('.name').val(data.content[0].name);
          $(own.idGeneral).find('#pagoTransferenciaModalEdit').find('.num_count').val(data.content[0].num_count);
          $(own.idGeneral).find('#pagoTransferenciaModalEdit').find('.num_count_cci').val(data.content[0].num_count_cci);

        }
      },

      error: function (xhr, status) {
        // alert('Disculpe, existió un problema');
      },

      // código a ejecutar sin importar si la petición falló o no
      complete: function (xhr, status) {
        //  alert('Petición realizada');$(own.idGeneral).find('#pagoOtroMetodoPagoModal')
      }
    });
  }

  editTransferenciaMetododePago(){
    let own = this;
    Swal.fire({
      title: '¿Seguro de editar?',
      text: "¡Si continuas se editara el método de pago!",
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

        var data: any = {};

        data.id = $(own.idGeneral).find('#pagoTransferenciaModalEdit').find('.payment_card_id').val()
        data.num_count = $(own.idGeneral).find('#pagoTransferenciaModalEdit').find('.num_count').val()
        data.num_count_cci = $(own.idGeneral).find('#pagoTransferenciaModalEdit').find('.num_count_cci').val()
        data.name = $(own.idGeneral).find('#pagoTransferenciaModalEdit').find('.name').val()
        data.store_id = own.store.stores_id;
        $.ajax({
          // la URL para la petición
          url: own.APP_URL_API + 'dashboard/payments/transfers',//

          data: data,

          dataType: 'json',

          type: 'PUT',
          headers: { 
            "Authorization": localStorage.getItem('accessToken')
          },
          // código a ejecutar si la petición es satisfactoria;
          // la respuesta es pasada como argumento a la función
          success: function (data) {

            //$(self).parent('tr').remove()
            Swal.fire(
              '¡Editado!',
              'Su información ha sido editada satisfactoriamente.',
              'success'
            )
            own.getPayments();
            
          },

          error: function (xhr, status) {
            // alert('Disculpe, existió un problema');
            Swal.fire(
              'Cancelado',
              'Disculpe, existió un problema',
              'error'
            )
          },
          complete: function (xhr, status) {
            $(own.idGeneral).find('#pagoTransferenciaModalEdit').modal('hide')
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
  editBankMetododePago(){
    let own = this;
    Swal.fire({
      title: '¿Seguro de editar?',
      text: "¡Si continuas se editara el método de pago!",
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

        var data: any = {};
        data.id = $(own.idGeneral).find('#pagoAppBancoModalEdit').find('.payment_card_id').val()
        data.celphone = $(own.idGeneral).find('#pagoAppBancoModalEdit').find('.celphone').val()
        data.name = $(own.idGeneral).find('#pagoAppBancoModalEdit').find('.name').val()

        data.store_id = own.store.stores_id;
        $.ajax({
          // la URL para la petición
          url: own.APP_URL_API + 'dashboard/payments/appbanks',//

          data: data,

          dataType: 'json',

          type: 'PUT',
          headers: { 
            "Authorization": localStorage.getItem('accessToken')
          },
          // código a ejecutar si la petición es satisfactoria;
          // la respuesta es pasada como argumento a la función
          success: function (data) {

            //$(self).parent('tr').remove()
            Swal.fire(
              '¡Editado!',
              'Su información ha sido editada satisfactoriamente.',
              'success'
            )
            own.getPayments();
          },

          error: function (xhr, status) {
            // alert('Disculpe, existió un problema');
            Swal.fire(
              'Cancelado',
              'Disculpe, existió un problema',
              'error'
            )
          },
          complete: function (xhr, status) {
            $(own.idGeneral).find('#pagoAppBancoModalEdit').modal('hide')
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
  editOtroMetododePago(){
    let own = this;
    Swal.fire({
      title: '¿Seguro de editar?',
      text: "¡Si continuas se editara el método de pago!",
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

        var data: any = {};
        data.id = $(own.idGeneral).find('#pagoOtroMetodoPagoModalEdit').find('.payment_card_id').val()
        data.comision = $(own.idGeneral).find('#pagoOtroMetodoPagoModalEdit').find('.comision').val()
        data.store_id = own.store.stores_id;
        $.ajax({
          // la URL para la petición
          url: own.APP_URL_API + 'dashboard/payments/others',//

          data: data,

          dataType: 'json',

          type: 'PUT',
          headers: { 
            "Authorization": localStorage.getItem('accessToken')
          },
          // código a ejecutar si la petición es satisfactoria;
          // la respuesta es pasada como argumento a la función
          success: function (data) {

            //$(self).parent('tr').remove()
            Swal.fire(
              '¡Editado!',
              'Su información ha sido editada satisfactoriamente.',
              'success'
            )
            own.getPayments();
          },

          error: function (xhr, status) {
            // alert('Disculpe, existió un problema');
            Swal.fire(
              'Cancelado',
              'Disculpe, existió un problema',
              'error'
            )
          },
          complete: function (xhr, status) {
            $(own.idGeneral).find('#pagoOtroMetodoPagoModalEdit').modal('hide')
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
  /*getPaymentId(id) {
    let own = this;
    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/payments/'+id,//ok

      type: 'GET',

      //data: { id: own.$stores_id },
      data: { uri: own.$stores_uri },
      // el tipo de información que se espera de respuesta
      dataType: 'json',
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (data) {

        // data.content;
        if(data.content.length>0){

        }
      },

      error: function (xhr, status) {
        // alert('Disculpe, existió un problema');
      },

      // código a ejecutar sin importar si la petición falló o no
      complete: function (xhr, status) {
        //  alert('Petición realizada');$(own.idGeneral).find('#pagoOtroMetodoPagoModal')
      }
    });
  }*/
  //dashboard/payments/{id}
  public getImagePrincipal() {
    return (this.store?.stores_image == null || this.store?.stores_image == '') ? Metodos.getImageDefault100X100(this.APP_URL) : this.store?.stores_image_url;
}
  getPayments() {
    let own = this;
    //this.preloadDashboard = false;
    //Metodos.insertPreloadStoreRemoveHidden('PRELOAD-DASHBOARD-FORMASPAGO', this.getImagePrincipal(), this.store.stores_name);
 
    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/payments',//ok

      type: 'GET',
      headers: { 
        "Authorization": localStorage.getItem('accessToken')
      },
      //data: { id: own.$stores_id },
      data: { store_id: own.store.stores_id },
      // el tipo de información que se espera de respuesta
      dataType: 'json',
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (data) {

        own.$payments_card = data.content;
        let pagoOtroMetodoPagoCount=0;
        let pagoEfectivoCount=0;
        let pagoTransferenciaCount = 0;
        let pagoAppBancoCount = 0;

        
        for(let i =0; i<own.$payments_card.length; i++){
          if(i==own.$payments_card.length){ break;}
          for(let j =0; j<own.$payments_card[i].payment.length; j++){
            if(j==own.$payments_card[i].payment.length){ break;}
            //pago efectivo inicio
            if(own.$payments_card[i].payment[j].id==1){
           
              pagoEfectivoCount++;
            }
            //pago efectivo fin
            //Inicio  pagoOtroMetodoPago
            if(own.$payments_card[i].payment[j].id==5 || own.$payments_card[i].payment[j].id==6){
              pagoOtroMetodoPagoCount++;
            }
            //fin  pagoOtroMetodoPago 
            //inicio pago app banco pagoAppBanco
            if(own.$payments_card[i].payment[j].id==3 ||own.$payments_card[i].payment[j].id==4 || 
              own.$payments_card[i].payment[j].id==8|| own.$payments_card[i].payment[j].id==7){
              pagoAppBancoCount++;
            }

            if(own.$payments_card[i].payment[j].id==2){

              if(own.$payments_card[i].card[0].id==1 || own.$payments_card[i].card[0].id==2|| 
                own.$payments_card[i].card[0].id==3|| own.$payments_card[i].card[0].id==4 ||
                own.$payments_card[i].card[0].id==5|| own.$payments_card[i].card[0].id==7|| 
                own.$payments_card[i].card[0].id==8){
                pagoTransferenciaCount++;
              }

            }
            //fin pago app banco
          }
          //inicio pagoTransferenciaCount
         /* for(let j =0; j<own.$payments_card[i].card.length; j++){
            if(j==own.$payments_card[i].card.length){ break;}
            if(own.$payments_card[i].card[0].id==1 || own.$payments_card[i].card[j].id==2|| 
              own.$payments_card[i].card[0].id==3|| own.$payments_card[i].card[j].id==4 ||
              own.$payments_card[i].card[0].id==5|| own.$payments_card[i].card[j].id==7|| 
              own.$payments_card[i].card[0].id==8){
              pagoTransferenciaCount++;
            }

          }*/
          //fin pagoTransferenciaCount
        }

        if(pagoEfectivoCount==1){
          own.$pagoEfectivo=1;
        }else{
          own.$pagoEfectivo=0;
        }


        if(pagoOtroMetodoPagoCount==2){
          own.$pagoOtroMetodoPago=1;
        }else{
          own.$pagoOtroMetodoPago=0;
        }

      
        if(pagoTransferenciaCount==7){
          own.$pagoTransferencia=1;
        }else{
          own.$pagoTransferencia=0;
        }

        if(pagoAppBancoCount==4){
          own.$pagoAppBanco=1;
        }else{
          own.$pagoAppBanco=0;
        }
        
      },

      error: function (xhr, status) {
        // alert('Disculpe, existió un problema');
      },

      // código a ejecutar sin importar si la petición falló o no
      complete: function (xhr, status) {
        //  alert('Petición realizada');$(own.idGeneral).find('#pagoOtroMetodoPagoModal')

        own.preloadDashboard = true;
        Metodos.removeNodoPreloadHidden('PRELOAD-DASHBOARD-FORMASPAGO');
      }
    });
  }

  editModal() {

  }
  deleteModal(id) {
    let own = this;
    Swal.fire({
      title: '¿Seguro de eliminar?',
      text: "¡Si continuas se eliminara correctamente!",
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
          url: own.APP_URL_API + 'dashboard/payments/' + id,//ok

          type: 'DELETE',
          headers: { 
            "Authorization": localStorage.getItem('accessToken')
          },
          // el tipo de información que se espera de respuesta
          dataType: 'json',
          // código a ejecutar si la petición es satisfactoria;
          // la respuesta es pasada como argumento a la función
          success: function (data) {

            //$(self).parent('tr').remove()
            Swal.fire(
              '¡Eliminado!',
              'Su información ha sido eliminada satisfactoriamente.',
              'success'
            )
              own.getPayments();
          },
          error: function (xhr, status) {
            // alert('Disculpe, existió un problema');
          },

          // código a ejecutar sin importar si la petición falló o no
          complete: function (xhr, status) {
            //  alert('Petición realizada');
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
}
/*public formToPay=[
    {
      payment_id: 1,
      description: 'Pago en Efectivo',
      image: 'pagoefectivo.png'
    },
    {
      payment_id: 2,
      description: 'Pago con Transferencia',
      image: 'transferencia-bancaria.png'
    }
  ];*/

  /*public $payments = [
    {
      payment_id: 1,
      description: 'Pago en Efectivo',
      image: 'pagoefectivo.png',
      cards:[]
    },
    {
      payment_id: 2,
      description: 'Pago con Transferencia',
      image: 'transferencia-bancaria.png',
      cards:[
        {
          id: 1,
          description: 'BCP',
          image: 'bcp.png',
          type: 'card'
        },
        {
          id: 2,
          description: 'BBVA',
          image: 'bbva.png',
          type: 'card'
        },
        {
          id: 3,
          description: 'SCOTIABANK',
          image: 'nuevo-logo-scotiabank-dos.jpg',
          type: 'card'
        },
        {
          id: 4,
          description: 'INTERBANK',
          image: 'interbank.png',
          type: 'card'
        },
        {
          id: 5,
          description: 'DINERS CLUB INTERNATIONAL',
          image: 'diners-club-international.png',
          type: 'card'
        },
        {
          id: 7,
          description: 'BANCO PICHINCHA',
          image: 'bancopichincha.png',
          type: 'card'
        },
        {
          id: 8,
          description: 'AMERICAN EXPRESS',
          image: 'american-express.png',
          type: 'card'
        }
      ]
    },
    {
      payment_id: 9,
      description: 'Pago con Aplicaciones de Banco',
      image: null,
      cards:[
        {
          id: 9,
          description: 'YAPE',
          image: 'yape.png'
        },
        {
          id: 10,
          description: 'TUNKI',
          image: 'tunki.png'
        },
        {
          id: 11,
          description: 'PLIN',
          image: 'plin.png'
        },
        {
          id: 12,
          description: 'LUKITA',
          image: 'lukita.png'
        }
      ]
    },
    {
      payment_id: 10,
      description: 'Otros Metodos de Pago',
      image: null,
      cards:[
        {
          id: 13,
          description: 'VENDE MÁS',
          image: 'vendemas.png'
        },
        {
          id: 14,
          description: 'IziPay',
          image: 'izipay.png'
        }
      ]
    }

  ];*/
