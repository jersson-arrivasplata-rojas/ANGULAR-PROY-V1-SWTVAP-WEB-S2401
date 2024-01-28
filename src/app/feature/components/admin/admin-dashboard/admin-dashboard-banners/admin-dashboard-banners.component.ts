import { Component, OnInit } from '@angular/core';
import { base64ToFile, Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Banner } from 'src/app/interfaces/banner';
import { Profile } from 'src/app/interfaces/profile';
import { Store } from 'src/app/interfaces/store';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NodeStoreService } from 'src/app/services/node-store.service';


import { environment } from 'src/environments/environment';
import { Metodos } from 'src/Utils/Metodos';
import Swal from 'sweetalert2';
//import { Dimensions, ImageCroppedEvent, ImageTransform } from './image-cropper/interfaces/index';
//import {base64ToFile} from './image-cropper/utils/blob.utils';
//import { ImageCroppedEvent } from 'ngx-image-cropper';
//import { ImageTransform } from 'ngx-image-cropper';
declare var $: any;

@Component({
    selector: 'app-admin-dashboard-banners',
    templateUrl: './admin-dashboard-banners.component.html',
    styleUrls: ['./admin-dashboard-banners.component.css']
})
export class AdminDashboardBannersComponent implements OnInit {
    public APP_URL = environment.appUrl;
    public APP_URL_API = environment.apiUrl;
    public APP_URL_API_BASE = environment.apiUrlBase;
    public APP_AWS_SNAPSTOREPEPUBLIC=environment.apiAWSsnapstorepepublic;

    isLoadingDeleteBanner: boolean = false;
    isLoadingBanner: boolean = false;
    isLoadingProfile: boolean = false;

    idGeneral = '#STORE-DASHBOARD-COMMENTS';
    preloadDashboard: boolean = false;
    fileName: string;
    fileNameProfile: string;
    maxSizeProfile: Dimensions = {
        width: 200,
        height: 200
    };

    imageChangedEvent: any = '';
    imageChangedProfileEvent: any = '';

    croppedImage: any = this.APP_URL + 'assets/images/snapstore/placeholder-1200X420-2.png';
    croppedImageProfile: any = this.APP_URL + 'assets/images/snapstore/placeholder-200X200-2.png';

    canvasRotation = 0;
    rotation = 0;
    scale = 1;
    showCropper = false;
    showCropperProfile = false;
    containWithinAspectRatio = false;
    transform: ImageTransform = {};

    public store: Store = null;

    public banners:Banner[]=[];
    public profile:Profile[]=[];

    customOptions: OwlOptions = {
     loop: true,
     mouseDrag: true,
     touchDrag: true,
     autoplay:true,
     pullDrag: false,
     autoHeight:true,
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
   };

    constructor(public nodeStoreService: NodeStoreService,private localStorageService:LocalStorageService) {
        nodeStoreService.getStore().subscribe(data => {
            this.store = data.store;
        });
    }

    ngOnInit(): void {
        Metodos.menuDashboardActive('banners');

        this.preloadDashboard = false;
        Metodos.insertPreloadStoreRemoveHidden('PRELOAD-DASHBOARD-BANNERS', this.getImagePrincipal(), this.store.stores_name);
        let own = this;
        setTimeout(() => {
            this.preloadDashboard = true;
            Metodos.removeNodoPreloadHidden('PRELOAD-DASHBOARD-BANNERS');
        }, 2000);

        this.getBannersProfile();
        //this.getProfile();
    }

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    fileChangeEventProfile(event: any): void {
        this.imageChangedProfileEvent = event;
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        console.log(event, base64ToFile(event.base64));
    }
    imageCroppedProfile(event: ImageCroppedEvent) {
        this.croppedImageProfile = event.base64;
        console.log(event, base64ToFile(event.base64));
    }

    imageLoaded() {
        this.showCropper = true;
        console.log('Image loaded');
    }
    imageLoadedProfile() {
        this.showCropperProfile = true;
        console.log('Image loaded');
    }

    cropperReady(sourceImageDimensions: Dimensions) {
        console.log('Cropper ready', sourceImageDimensions);
    }

    loadImageFailed() {
        console.log('Load failed');
    }

    rotateLeft() {
        this.canvasRotation--;
        this.flipAfterRotate();
    }

    rotateRight() {
        this.canvasRotation++;
        this.flipAfterRotate();
    }

    private flipAfterRotate() {
        const flippedH = this.transform.flipH;
        const flippedV = this.transform.flipV;
        this.transform = {
            ...this.transform,
            flipH: flippedV,
            flipV: flippedH
        };
    }


    flipHorizontal() {
        this.transform = {
            ...this.transform,
            flipH: !this.transform.flipH
        };
    }

    flipVertical() {
        this.transform = {
            ...this.transform,
            flipV: !this.transform.flipV
        };
    }

    resetImage() {
        this.scale = 1;
        this.rotation = 0;
        this.canvasRotation = 0;
        this.transform = {};
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

    toggleContainWithinAspectRatio() {
        this.containWithinAspectRatio = !this.containWithinAspectRatio;
    }

    updateRotation() {
        this.transform = {
            ...this.transform,
            rotate: this.rotation
        };
    }


    saveImageCarousel() {
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
        }).then((result) => {
            if (result.isConfirmed) {
                own.isLoadingBanner = true;
                console.log(own.croppedImage);
                console.log(base64ToFile(own.croppedImage));
                var image = {
                    src: (own.croppedImage).split(',')[1]
                };

                this.fileName = new Date().getTime() + '.jpeg';
                //console.log(this.fileName)
                let blob = own.base64ToBlob(image.src, 'image/jpeg');
                //console.log(blob)
                var myFile = own.blobToFile(blob, "my-image.jpeg");
                //console.log(myFile)
                let formData = new FormData()
                formData.append("store_id", own.store.stores_id.toString());
                formData.append("file", myFile);
                //console.log(formData)
                let authorization = this.localStorageService.getItem('accessToken');
                fetch(this.APP_URL_API+'dashboard/store/banner', {
                method: 'POST',
                body: formData,
                mode: 'cors',
                headers: new Headers({
                    'Authorization': authorization
                  })
                })
                .then(response=>{
                    return response.json()
                }).then(data=>{
                    console.log(data)
                    own.banners=data.banners;
                    own.isLoadingBanner = false;
                    $(own.idGeneral).find('.alerts').append(Metodos.insertAlert());
                });

            } else if (result.isDenied) {

            }
        });
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

    saveImagePerfil() {
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
        }).then((result) => {
            if (result.isConfirmed) {
                own.isLoadingProfile = true;
               // console.log(own.croppedImage);
               // console.log(base64ToFile(own.croppedImage));
                var image = {
                    src: (own.croppedImageProfile).split(',')[1]
                };

                this.fileNameProfile = new Date().getTime() + '.jpeg';
                //console.log(this.fileName)
                let blob = own.base64ToBlob(image.src, 'image/jpeg');
                //console.log(blob)
                var myFile = own.blobToFile(blob, "my-image.jpeg");
                //console.log(myFile)
                let formData = new FormData()
                formData.append("store_id", own.store.stores_id.toString());
                formData.append("file", myFile);

                //console.log(formData)

                let authorization = this.localStorageService.getItem('accessToken');
                fetch(this.APP_URL_API+'dashboard/store/profile', {
                method: 'POST',
                body: formData,
                mode: 'cors',
                headers: new Headers({
                    'Authorization': authorization
                  })
                })
                .then(response=>{
                    return response.json()
                }).then(data=>{
                    console.log(data)
                    own.profile=data.profile;
                    own.isLoadingProfile = false;
                    $(own.idGeneral).find('.alerts').append(Metodos.insertAlert());
                });

            } else if (result.isDenied) {

            }
        });
    }



    getBannersProfile(){
        let own=this;
        own.isLoadingBanner = true;
        $.ajax({
            url: own.APP_URL_API + 'dashboard/store/banner',

            data: { store_id: own.store.stores_id },

            type: 'GET',
            headers: {
                "Authorization": localStorage.getItem('accessToken')
              },
            dataType: 'json',

            success: function (data) {
                own.banners=data.banners;
                own.profile=data.profile;
            },
            error: function (xhr, status) {
            },

            complete: function (xhr, status) {
                own.isLoadingBanner = false;
            }

          });
    }


    /*getProfile(){
        let own=this;
        own.isLoadingProfile = true;
        $.ajax({
            url: own.APP_URL_API + 'dashboard/store/profile',

            data: { store_id: own.store.stores_id },

            type: 'GET',

            dataType: 'json',

            success: function (data) {
                own.profile=data.profile;
            },
            error: function (xhr, status) {
            },

            complete: function (xhr, status) {
                own.isLoadingProfile = false;
            }

          });
    }*/
    deleteBannerImage(id){
        let own=this;

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
                own.isLoadingDeleteBanner = true;
                $.ajax({
                    url: own.APP_URL_API + 'dashboard/store/banner',

                    data: { id: id, store_id: own.store.stores_id },

                    type: 'DELETE',
                    headers: {
                        "Authorization": localStorage.getItem('accessToken')
                      },
                    dataType: 'json',

                    success: function (data) {
                        own.banners=data.banners;
                        $(own.idGeneral).find('.alerts').append(Metodos.deleteAlert());
                    },
                    error: function (xhr, status) {
                        $(own.idGeneral).find('.alerts').append(Metodos.noDeleteAlert());
                    },

                    complete: function (xhr, status) {
                        own.isLoadingDeleteBanner = false;
                    }

                });
            } else if (result.isDenied) {
            }
          });


    }

    getBannerImage(id,store_id,image){
        return this.APP_AWS_SNAPSTOREPEPUBLIC+'stores/'+store_id+'/'+'banners'+'/'+id+'/xs/'+image;
    }

    getProfileImage(store_id,image,path,image_url){
        if(path==''||path==null){
            return image_url+image;
        }

        return this.APP_AWS_SNAPSTOREPEPUBLIC+'stores/'+store_id+'/profile/'+image;
    }

    public getImagePrincipal() {
        return (this.store?.stores_image == null || this.store?.stores_image == '') ? Metodos.getImageDefault100X100(this.APP_URL) :this.APP_AWS_SNAPSTOREPEPUBLIC+ this.store?.stores_image_url;
    }


}
