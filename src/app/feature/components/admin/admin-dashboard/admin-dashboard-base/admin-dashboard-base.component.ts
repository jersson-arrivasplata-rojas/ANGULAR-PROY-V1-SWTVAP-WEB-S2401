import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Dimensions, ImageCroppedEvent, ImageTransform, base64ToFile } from 'ngx-image-cropper';
import { Metodos } from 'src/Utils/Metodos';
import { Image } from 'src/app/interfaces/image';
import { Store } from 'src/app/interfaces/store';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { NodeStoreService } from 'src/app/services/node-store.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { LocalStorageService } from 'src/app/services/local-storage.service';

declare var $: any;

@Component({
  selector: 'app-admin-dashboard-base',
  templateUrl: './admin-dashboard-base.component.html',
  styleUrls: ['./admin-dashboard-base.component.css']
})
export class AdminDashboardBaseComponent implements OnInit {
  public APP_URL = environment.appUrl;
  public APP_URL_API = environment.apiUrl;

  public APP_URL_API_BASE = environment.apiUrlBase;

  public APP_AWS_SNAPSTOREPEPUBLIC = environment.apiAWSsnapstorepepublic;
  isLoadingUpdate: boolean = false;

  // public idGeneral = '#STORE-DASHBOARD-PRODUCTOS';

  public store: Store = null;
  public isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) public platformId,
    private localStorageService: LocalStorageService,
    private authGuardService: AuthGuardService,
    private router: Router,
    public nodeStoreService: NodeStoreService) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {

      nodeStoreService.getStore().subscribe(data => {
        this.store = data.store;
      });
    }
  }
  public textWhatsapp = ''
  public phoneWhatsapp = ''
  public url: string;
  public dropdown_active = false;
  public images: Image[] = [];

  transform: ImageTransform = {};
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  fileNameProduct: string;
  fileName: string;

  croppedImageProduct: any = this.APP_URL + 'assets/images/snapstore/placeholder-200X200-2.png';
  croppedImage: any = this.APP_URL + 'assets/images/snapstore/placeholder-200X200-2.png';
  imageChangedProductEvent: any = '';

  imageChangedEvent: any = '';
  containWithinAspectRatio = false;

  showCropper = false;
  showCropperProduct = false;



  isLoadingProduct: boolean = false;
  isLoading: boolean = false;
  ngOnInit(): void {
    if (this.isBrowser) {

      Metodos.addCssJsonFilesToEndHead([{
        href: this.APP_URL + 'assets/css/hopscotch.css',
        id: 'hopscotch'
      },
      {
        href: this.APP_URL + 'assets/css/getemoji.css',
        id: 'getemoji'
      },
      {
        href: this.APP_URL + 'assets/css/vendor/ladda.min.css',
        id: 'ladda'
      }]);
      $.getScript(this.APP_URL + 'assets/js/plugins/hopscotch.min.js');
      $.getScript('https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js');

      this.textWhatsapp = Metodos.textWhatsapp
      this.phoneWhatsapp = Metodos.phoneWhatsapp

    }
  }
  selectCategory(description){
    $('#FastProductModal [name="category"]').val(description);
    $('#FastProductModal [name="subcategory"]').val(description);
 
  }
  menuToggle(e) {
    e.preventDefault();
    let element = document.querySelector("#wrapper");
    let bdSidenavAdminDashboardPrincipal = document.querySelector("#bd-sidenav-admin-dashboard-principal");


    element.classList.toggle('toggled');
    bdSidenavAdminDashboardPrincipal.classList.remove('d-none');
    bdSidenavAdminDashboardPrincipal.classList.remove('d-block');

    if (element.classList.contains('toggled') == true) {
      // bdSidenavAdminDashboardPrincipal.classList.add('d-none');
    } else {
      bdSidenavAdminDashboardPrincipal.classList.add('d-block');
    }

  }


  public getImagePrincipal() {
    if (this.store.stores_path == '' || this.store.stores_path == null) {
      //return this.store.stores_image_url;
      return (this.store?.stores_image == null || this.store?.stores_image == '') ? Metodos.getImageDefault100X100(this.APP_URL) : this.APP_AWS_SNAPSTOREPEPUBLIC + this.store?.stores_image_url;
    }
    return this.APP_AWS_SNAPSTOREPEPUBLIC + this.store?.stores_image_url;
  }

  dropdown(element) {
    this.dropdown_active = !this.dropdown_active;//'drop-down--active'
  }
  logout() {
    this.authGuardService.signOut();
    this.router.navigate(['/']);
  }


  getType() {
    return this.authGuardService.getType();
  }

  validateNext(){
    var category = $('#FastProductModal [name="category"]').val();
   // var subcategory = $('#FastProductModal [name="subcategory"]').val();

    if(category==''||category==null){//subcategory==''||subcategory==null||
      return true;
    }
    return false
  }
  createProduct() {
    let own = this;

    Swal.fire({
      title: '¿Seguro de agregar?',
      text: "¡Si continuas no podras revertir los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0CC27E',
      cancelButtonColor: '#FF586B',
      confirmButtonText: '¡Si, agregar!',
      cancelButtonText: '¡No, cancelar!',
      customClass: {
        confirmButton: 'btn btn-first border-radius-15 mr-5',
        cancelButton: 'btn btn-danger-2  border-radius-15 '
      },
      buttonsStyling: false,
    }).then(function (result) {
      own.isLoadingUpdate = true;


      var image = {
        src: (own.croppedImage).split(',')[1]
      };

      own.fileName = new Date().getTime() + '.jpeg';
      //console.log(this.fileName)
      let blob = own.base64ToBlob(image.src, 'image/jpeg');
      //console.log(blob)    
      var myFile = own.blobToFile(blob, "my-image.jpeg");
      //console.log(myFile)
      //let product_id= $(own.idGeneral).find('#addModal').find('input[name="id"]').val();
      //console.log(product_id);

      console.log((own.croppedImage).split(',')[1])



      let formData = new FormData()

      formData.append("store_id", (own.store.stores_id).toString());
      formData.append("file", myFile);
      own.images = [];

      let authorization = own.localStorageService.getItem('accessToken');

      fetch(own.APP_URL_API + 'dashboard/product/add/image', {
        method: 'POST',
        body: formData,
        mode: 'cors',
        headers: new Headers({
          'Authorization': authorization
        })
      })
        .then(response => {
          return response.json()
        }).then(data => {
          console.log(data)
          if (data.response == true) {
            //own.images=data.product_images;
            own.images.push({
              id: 0,
              product_id: 0,
              image: data.image,
              path: data.path,
              type: 0,
              description: '',
              visible: 0
            });
          }
         // own.isLoadingUpdate = false;

          // $(own.idGeneral).find('.alerts').append(Metodos.insertAlert());
        })
        .then(data => {
          var category = $('#FastProductModal [name="category"]').val();
          var subcategory = $('#FastProductModal [name="subcategory"]').val();
          var producto = $('#FastProductModal [name="name"]').val();
          var product_sale_status = $('#FastProductModal [name="product_sale_status"]').val();
          var price = $('#FastProductModal [name="price"]').val();
          var product_sale_weigth_min = $('#FastProductModal [name="product_sale_weigth_min"]').val();
          var flag = false;
          if (product_sale_status == "unit") {

            if (price != "") {
              flag = true;
            } else {
              flag = false;
            }
          } else {
            if (price != "" && product_sale_weigth_min != "") {
              flag = true;
            } else {
              flag = false;
            }
          }
          if (category != "" && producto != "" && price != ""  && flag == true) {
            let data = {
              category: category,
              subcategory: subcategory,
              producto: producto,
              product_sale_status: product_sale_status,
              price: price,
              product_sale_weigth_min: product_sale_weigth_min,
              path: own.images[0].path,
              image: own.images[0].image,
              store_id:own.store.stores_id
              //image: own.images
            };
            data.category = category;
            data.subcategory = subcategory;
            data.producto = producto;
            data.product_sale_status = product_sale_status;
            data.price = price;
            data.product_sale_weigth_min = product_sale_weigth_min;


            $.ajax({
              // la URL para la petición
              url: own.APP_URL_API + 'dashboard/crear-producto-first',//
              data: data,

              type: 'POST',

              // el tipo de información que se espera de respuesta
              dataType: 'json',
              headers: {
                "Authorization": localStorage.getItem('accessToken')
              },
              // código a ejecutar si la petición es satisfactoria;
              // la respuesta es pasada como argumento a la función
              success: function (response) {
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
                own.isLoadingUpdate = false;
                $('#FastProductModal').modal('hide');
              }

            });

          }
        })
        .catch(error => {
          own.isLoadingUpdate = false;

        });
    })

  }
  /*getProfileImage(){
    if(this.store.stores_path==''||this.store.stores_path==null){
      return this.store.stores_image_url;
    }
    return this.APP_URL_API_BASE+'storage/assets/images/stores/'+this.store.stores_id+'/profile/'+this.store.stores_image;
  }*/
  selectChange() {
    if ($('#FastProductModal select[name="product_sale_status"]').val() != 'unit') {
        $('#FastProductModal input[name="product_sale_weigth_min"]').parents('.form-group').removeClass('d-none')
        $('#FastProductModal input[name="price"]').parents('.form-group').find('label').html('Precio del producto (soles): <span class="color-coral"><strong>(*)</strong></span>')
        $('#FastProductModal input[name="price"]').parents('.form-group').find('input').attr('placeholder','Ingresa el precio del producto (soles)');

        $('#FastProductModal input[name="product_sale_weigth_min"]').parents('.form-group').find('input').attr('placeholder','Ingresa el precio minimo del producto en (kg)');
        $('#FastProductModal input[name="product_sale_weigth_min"]').parents('.form-group').find('input').attr('required',"");

    } else {
        $('#FastProductModal input[name="product_sale_weigth_min"]').parents('.form-group').addClass('d-none')
        $('#FastProductModal input[name="price"]').parents('.form-group').find('label').html('Precio de la unidad (soles): <span class="color-coral"><strong>(*)</strong></span>')
        $('#FastProductModal input[name="price"]').parents('.form-group').find('input').attr('placeholder','Ingresa el precio de la unidad (soles)');
        $('#FastProductModal input[name="product_sale_weigth_min"]').parents('.form-group').find('input').removeAttr('required');

    }

}
  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
    this.isLoading = false;
  }

  zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }
  imageCroppedProduct(event: ImageCroppedEvent) {
    this.croppedImageProduct = event.base64;
    console.log(event, base64ToFile(event.base64));
  }
  imageLoadedProduct() {
    this.showCropperProduct = true;
    console.log('Image loaded');
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(event, base64ToFile(event.base64));
  }
  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }
  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;

  }
  loadImageFailed() {
    console.log('Load failed');
  }
  blobToFile(theBlob: Blob, fileName: string): File {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
  }

  base64ToBlob(base64, mime) {
    mime = mime || '';
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
      var slice = byteChars.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: mime });
  }
  saveImageProduct() {

    let own = this;
    own.isLoadingUpdate = true;
    var image = {
      src: (own.croppedImage).split(',')[1]
    };

    this.fileName = new Date().getTime() + '.jpeg';
    //console.log(this.fileName)
    let blob = own.base64ToBlob(image.src, 'image/jpeg');
    //console.log(blob)    
    var myFile = own.blobToFile(blob, "my-image.jpeg");
    //console.log(myFile)
    //let product_id= $(own.idGeneral).find('#addModal').find('input[name="id"]').val();
    //console.log(product_id);

    console.log((own.croppedImage).split(',')[1])



    let formData = new FormData()

    formData.append("store_id", (own.store.stores_id).toString());
    formData.append("file", myFile);
    own.images = [];

    let authorization = this.localStorageService.getItem('accessToken');

    fetch(this.APP_URL_API + 'dashboard/product/add/image', {
      method: 'POST',
      body: formData,
      mode: 'cors',
      headers: new Headers({
        'Authorization': authorization
      })
    })
      .then(response => {
        return response.json()
      }).then(data => {
        console.log(data)
        if (data.response == true) {
          //own.images=data.product_images;
          own.images.push({
            id: 0,
            product_id: 0,
            image: data.image,
            path: data.path,
            type: 0,
            description: '',
            visible: 0
          });
        }
        own.isLoadingUpdate = false;

        // $(own.idGeneral).find('.alerts').append(Metodos.insertAlert());
      }).catch(error => {
        own.isLoadingUpdate = false;

      });

  }
}