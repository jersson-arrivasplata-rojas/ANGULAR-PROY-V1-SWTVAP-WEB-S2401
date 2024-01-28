import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Metodos } from 'src/Utils/Metodos';
import { Comment } from 'src/app/interfaces/comment';
import { Store } from 'src/app/interfaces/store';
import { StoreComment } from 'src/app/interfaces/store-comment';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { NodeStoreService } from 'src/app/services/node-store.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

let stores_uri = '';
declare var $: any;

@Component({
  selector: 'app-admin-dashboard-comments',
  templateUrl: './admin-dashboard-comments.component.html',
  styleUrls: ['./admin-dashboard-comments.component.css']
})
export class AdminDashboardCommentsComponent implements OnInit {

  public APP_URL = environment.appUrl;
  public APP_URL_API = environment.apiUrl;
  public APP_URL_API_BASE = environment.apiUrlBase;

  public productArray: {
    id:any,
    name:any,
    product_images:any[]
  }[]=[];
  public storeComments:StoreComment[]=[];
  public commentArray:Comment[] = [];
  public $stores_uri:string;
  public store:Store=null;

  public idGeneral='#STORE-DASHBOARD-COMMENTS';

  isLoading: boolean = false;
  isLoadingSecundary: boolean = false;

  preloadDashboard:boolean = false;

  constructor(private router: Router,
     private authorizationService: AuthorizationService,
       public nodeStoreService:NodeStoreService) {
      nodeStoreService.getStore().subscribe(data=>{
        this.store = data.store;
      });
    }

  ngOnInit(): void {
    Metodos.menuDashboardActive('comentarios');
   // stores_uri = location.pathname.split('/')[1];
   // this.$stores_uri = stores_uri;
    this.getComments();
  }



  getComments() {
    this.preloadDashboard=false;
    Metodos.insertPreloadStoreRemoveHidden('PRELOAD-DASHBOARD-COMMENTS', this.getImagePrincipal(), this.store.stores_name);

    this.productArray = [];
    this.authorizationService.dashboardStoreAllProductComments(this.store.stores_id)
      .subscribe(
        (response: HttpResponse<any>) => {

          if (response.status == 200) {
            //console.log(response);
            var data = response.body;
            //var body = data.content;//Body del Producto
            this.productArray = data.content;
            this.storeComments = data.storeComments;
          }
        },
        (response: HttpErrorResponse) => {
          //console.log(response);
          var message = (typeof response.error.message == 'undefined') ? '¡Sucedio un error inesperado!' : response.error.message;


        },
        () => {
          this.preloadDashboard=true;
          Metodos.removeNodoPreloadHidden('PRELOAD-DASHBOARD-COMMENTS');
        });
  }

  showComments(id) {
    this.commentArray = [];
    this.isLoading=true;
    this.authorizationService.dashboardStoreProductComments(id)
      .subscribe(
        (response: HttpResponse<any>) => {

          if (response.status == 200) {
            //console.log(response);
            var data = response.body;
            var body = data.content;//Body del Producto
            this.commentArray = body;

          }
        },
        (response: HttpErrorResponse) => {
          //console.log(response);
          var message = (typeof response.error.message == 'undefined') ? '¡Sucedio un error inesperado!' : response.error.message;
        },
        () => {
          this.isLoading=false;
        });
  }
  addResponse(id,i,product_id) {
    let texto:any = document.getElementById('response'+i);
    //console.log(texto)
    if (texto.value == '') return null;
    this.isLoading=true;
    this.authorizationService.dashboardStoreProductAddResponse(id, texto.value,product_id)
      .subscribe(
        (response: HttpResponse<any>) => {

          if (response.status == 200) {
            texto.value = '';
            //console.log(response);
            var data = response.body;
            var body = data.content;//Body del Producto
            this.commentArray = body;

          }
        },
        (response: HttpErrorResponse) => {
          //console.log(response);
          var message = (typeof response.error.message == 'undefined') ? '¡Sucedio un error inesperado!' : response.error.message;

          $(this.idGeneral).find('.alerts').append(Metodos.noInsertAlert())

        },
        () => {
          $(this.idGeneral).find('.alerts').append(Metodos.insertAlert());
          this.isLoading=false;
        });
  }

  deleteComment(id){
    let own = this;
    Swal.fire({
      title: '¿Seguro de eliminar?',
      text: "¡Si elimina no prodra recuperarlo.!",
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
          url: own.APP_URL_API + 'dashboard/store/'+own.store.stores_id+'/comments/' + id,//

          type: 'DELETE',
          headers: {
            "Authorization": localStorage.getItem('accessToken')
          },
          // el tipo de información que se espera de respuesta
          dataType: 'json',
          // código a ejecutar si la petición es satisfactoria;
          // la respuesta es pasada como argumento a la función
          success: function (data) {
            own.storeComments = data.storeComments;
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
              'Disculpe, no se pudo eliminar',
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
  public getImagePrincipal() {
    return (this.store?.stores_image == null || this.store?.stores_image == '') ? Metodos.getImageDefault100X100(this.APP_URL) : this.store?.stores_image_url;
  }

  getImageProduct(image_url) {
    return  this.APP_URL_API_BASE+'storage/'+ (image_url);//.replace('lg/', 'xs/');

  }
}
