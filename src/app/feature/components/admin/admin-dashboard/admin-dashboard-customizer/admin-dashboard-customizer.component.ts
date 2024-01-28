import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Select2Data, Select2Value } from 'ng-select2-component';
import { ColorEvent } from 'ngx-color';
import { Options } from 'select2';
import { Metodos } from 'src/Utils/Metodos';
import { Store } from 'src/app/interfaces/store';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { NodeStoreService } from 'src/app/services/node-store.service';
import { environment } from 'src/environments/environment';

declare var $: any;
let stores_uri = '';
declare var WebFont: any;


@Component({
  selector: 'app-admin-dashboard-customizer',
  templateUrl: './admin-dashboard-customizer.component.html',
  styleUrls: ['./admin-dashboard-customizer.component.css']
})
export class AdminDashboardCustomizerComponent implements OnInit {
  public APP_URL_API_BASE = environment.apiUrlBase;
  public APP_AWS_SNAPSTOREPEPUBLIC=environment.apiAWSsnapstorepepublic;

  @ViewChild('InputThemeColorFirst')  InputThemeColorFirst:ElementRef;
  @ViewChild('InputThemeColorFirstText')  InputThemeColorFirstText:ElementRef;

  @ViewChild('InputThemeColorSecond')  InputThemeColorSecond:ElementRef;
  @ViewChild('InputThemeColorSecondText')  InputThemeColorSecondText:ElementRef;
  @ViewChild('InputThemeColorBackground')  InputThemeColorBackground:ElementRef;

  public idGeneral='#STORE-DASHBOARD-CUSTOMIZER';
  preloadDashboard:boolean = false;
  isLoadingPrincipal: boolean = false;
  isLoadingSecundary: boolean = false;
  isLoadingBackground: boolean = false;
  isLoadingDefinedColor: boolean = false;
  isLoadingLightColor: boolean = false;

  //primaryColor = '#194D33';
  primaryColorHSLA = {
    h: 241,
    s: 0.90,
    l: 0.34,
    a: 1,
  };
  secondaryColorHSLA = {
    h: 345,
    s: 0.96,
    l: 0.59,
    a: 1,
  };
  successColorHSLA = {
    h: 141,
    s: 1,
    l: 0.3,
    a: 1,
  };
  dangerColorHSLA = {
    h: 4,
    s: 0.90,
    l: 0.58,
    a: 1,
  };
  warningColorHSLA = {
    h: 45,
    s: 0.99,
    l: 0.58,
    a: 1,
  };

  infoColorHSLA = {
    h: 213,
    s: 1,
    l: 0.23,
    a: 1,
  };

  lightColorHSLA = {
    h: 0,
    s: 0,
    l: 0.73,
    a: 1,
  };

  blackColorHSLA = {
    h: 268,
    s: 0.1,
    l: 0.28,
    a: 1,
  };

  whiteColorHSLA = {
    h: 0,
    s: 0,
    l: 1,
    a: 1,
  };

  public primaryHSLA:any;
  public secondaryHSLA:any;

  /*public customizer={
    theme_color_first : '#0b09a5',
    theme_color_first_text : '#ffffff',
    theme_color_second : '#fb3366',
    theme_color_second_text: '#ffffff',
    theme_color_background: '#ffffff',
    theme_color_background_text: '#000',
    theme_color_info: '#003473',
    theme_color_warning: '#FEC928',
    theme_color_danger: '#f44336',
    theme_color_success: '#009b37',
    theme_color_light: '#e9ecef',
    theme_color_light_text: '#000'
  }*/
  public customizer={
    theme_color_first : '',
    theme_color_first_text : '',
    theme_color_second : '',
    theme_color_second_text: '',
    theme_color_background: '',
    theme_color_background_text: '',
    theme_color_info: '',
    theme_color_warning: '',
    theme_color_danger: '',
    theme_color_success: '',
    theme_color_light: '',
    theme_color_light_text: ''
  }
  /*,
    theme_color_success :'#009b37',
    theme_color_info : '#003473',
    theme_color_warning : '#FEC928',
    theme_color_danger : '#f44336',
    theme_color_light : '#bbb',
    theme_color_dark : '#47404f',
    grid_break_point_xs: 0,//'0px'
    grid_break_point_sm: '576px',
    grid_break_point_md: '768px',
    grid_break_point_lg: '992px',
    grid_break_point_xl: '1200px',
    body_bg:'',
    body_color:'',
    font_size_base:'',
    line_height_base:'',
    font_url:'',
    font_family_san_serif:'',*/


  public store:Store=null;
  public $stores_uri:string;
  public $filters_options: Options;


  //linear-gradient(to bottom, #9be2fe 0%, #67d1fb 100%)
 /* public theme_color_first='#0b09a5';
  public theme_color_first_text='#ffffff';
  public theme_color_second='#fb3366';
  public theme_color_second_text='#ffffff';
  public theme_color_background='#ffffff';
  public theme_color_background_text='#000';
  public theme_color_info='#003473';
  public theme_color_warning='#FEC928';
  public theme_color_danger='#f44336';
  public theme_color_success='#009b37';
  public theme_color_light='#fff';
  public theme_color_light_text='#000';*/
  public theme_color_first='';
  public theme_color_first_text='';
  public theme_color_second='';
  public theme_color_second_text='';
  public theme_color_background='';
  public theme_color_background_text='';
  public theme_color_info='';
  public theme_color_warning='';
  public theme_color_danger='';
  public theme_color_success='';
  public theme_color_light='';
  public theme_color_light_text='';

  public store_address_google_maps='';
  public APP_URL = environment.appUrl;
  public APP_URL_API = environment.apiUrl;
  public textKeys: Select2Data=[];//
  public  $keys: Select2Value[] =[];


  constructor(private authorizationService:AuthorizationService,
    public nodeStoreService:NodeStoreService) {
      nodeStoreService.getStore().subscribe(data=>{
        this.store = data.store;

        this.theme_color_first=this.store?.store_customizer_bootstrap[0].theme_color_first;
        this.theme_color_first_text=this.store?.store_customizer_bootstrap[0].theme_color_first_text;
        this.theme_color_second=this.store?.store_customizer_bootstrap[0].theme_color_second;
        this.theme_color_second_text=this.store?.store_customizer_bootstrap[0].theme_color_second_text;
        this.theme_color_background=this.store?.store_customizer_bootstrap[0].theme_color_background;
        this.theme_color_background_text=this.store?.store_customizer_bootstrap[0].theme_color_background_text;
        this.theme_color_info=this.store?.store_customizer_bootstrap[0].theme_color_info;
        this.theme_color_warning=this.store?.store_customizer_bootstrap[0].theme_color_warning;
        this.theme_color_danger=this.store?.store_customizer_bootstrap[0].theme_color_danger;
        this.theme_color_success=this.store?.store_customizer_bootstrap[0].theme_color_success;
        this.theme_color_light=this.store?.store_customizer_bootstrap[0].theme_color_light;
        this.theme_color_light_text=this.store?.store_customizer_bootstrap[0].theme_color_light_text;



        this.customizer.theme_color_first=this.store?.store_customizer_bootstrap[0].theme_color_first;
        this.customizer.theme_color_first_text=this.store?.store_customizer_bootstrap[0].theme_color_first_text;
        this.customizer.theme_color_second=this.store?.store_customizer_bootstrap[0].theme_color_second;
        this.customizer.theme_color_second_text=this.store?.store_customizer_bootstrap[0].theme_color_second_text;
        this.customizer.theme_color_background=this.store?.store_customizer_bootstrap[0].theme_color_background;
        this.customizer.theme_color_background_text=this.store?.store_customizer_bootstrap[0].theme_color_background_text;
        this.customizer.theme_color_info=this.store?.store_customizer_bootstrap[0].theme_color_info;
        this.customizer.theme_color_warning=this.store?.store_customizer_bootstrap[0].theme_color_warning;
        this.customizer.theme_color_danger=this.store?.store_customizer_bootstrap[0].theme_color_danger;
        this.customizer.theme_color_success=this.store?.store_customizer_bootstrap[0].theme_color_success;
        this.customizer.theme_color_light=this.store?.store_customizer_bootstrap[0].theme_color_light;
        this.customizer.theme_color_light_text=this.store?.store_customizer_bootstrap[0].theme_color_light_text;

        this.store_address_google_maps = data.store_address_google_maps;



      });

     /* WebFont.load({
        google: {
          families: ['Droid Sans', 'Droid Serif']
        }
      });*/
     /* let own = this;
      own.textKeys.push({
        value: 1,
        label: "'Helvetica Neue', Helvetica, Arial",
        data: {  id: 1, name: "'Helvetica Neue', Helvetica, Arial" }
      },
      {
        value: 2,
        label: "Georgia",
        data: {  id: 2, name: "Georgia" }
      },{
        value: 3,
        label: "'Courrier New', Consolas",
        data: {  id: 3, name: "'Courrier New', Consolas" }
      },{
        value: 4,
        label: "Impact",
        data: {  id: 4, name: "Impact" }
      },{
        value: 5,
        label: "'Lucida Console', Monaco",
        data: {  id: 5, name: "'Lucida Console', Monaco" }
      },{
        value: 6,
        label: "'Palatino Linotype','Book Antiqua'",
        data: {  id: 6, name: "'Palatino Linotype','Book Antiqua'" }
      },{
        value: 7,
        label: "'Trebuchet MS'",
        data: {  id: 7, name: "'Trebuchet MS'" }
      },{
        value: 8,
        label: "Tahoma, Geneva",
        data: {  id: 8, name: "Tahoma, Geneva" }
      },{
        value: 9,
        label: "Verdana, Geneva",
        data: {  id: 9, name: "Verdana, Geneva" }
      },{
        value: 10,
        label: "'Times New Roman', Times",
        data: {  id: 10, name: "'Times New Roman', Times" }
      });

        $.ajax({
            url: "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBb_pLbXGeesG8wE32FMtywG4Vsfq6Uk_8",
            type: 'GET',
            dataType: 'JSONP',
            success: function (data) {
                for (var i = 0; i < data.items.length; i++ ) {
                  own.textKeys.push({
                    value: ((own.textKeys.length)+1),
                    label: data.items[i].family,
                    data: {  id: ((own.textKeys.length)+1), name: data.items[i].family }//color: 'white',
                  });

                  //own.textKeys.push(data.items[i].family);
                }
               // console.log(own.textKeys)
            }
        });*/

        this.$filters_options = {
          multiple: false,
          theme: 'classic',
          closeOnSelect: false,
          width: '300'
        };
    }

  ngOnInit(): void {
    Metodos.menuDashboardActive('customizer');
    //this.setPrimaryHSL();
    //this.setSecondaryHSL();
    //stores_uri = location.pathname.split('/')[1];
    //this.$stores_uri = stores_uri;
    //this.stores();

    this.preloadDashboard=false;

    Metodos.insertPreloadStoreRemoveHidden('PRELOAD-DASHBOARD-CUSTOMIZER', this.getImagePrincipal(), this.store.stores_name);
    let own = this;
    setTimeout(function(){
      own.preloadDashboard=true;
      Metodos.removeNodoPreloadHidden('PRELOAD-DASHBOARD-CUSTOMIZER');
    },3000)
  }
  font:string='';
  isLoadingFont:boolean=false;
  setFontCustomizer($event){
    console.log($event.target.innerText);
    this.font = $event.target.innerText;
    Metodos.addStyleHead(`
      @import url("https://fonts.googleapis.com/css2?family=${this.font}");
        html,body {
          font-family: ${this.font}!important;
        }
    `);
  }

  saveFont(){
    if(this.font==''){
      return false;
    }
    let own = this;

    var data: any = {
      type:6,
      font_family_san_serif:this.font,
      id: own.store.stores_id
    };

    own.isLoadingFont=true;
    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/customizer/update',//

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

        $(own.idGeneral).find('.alerts').append(Metodos.insertAlert())

      },

      error: function (xhr, status) {
        // alert('Disculpe, existió un problema');

        $(own.idGeneral).find('.alerts').append(Metodos.noInsertAlert())
      },
      complete: function (xhr, status) {
        own.isLoadingFont=false;
      }
    });
    return true;

  }
  public getImagePrincipal() {
    return  (this.store?.stores_image == null || this.store?.stores_image == '') ? Metodos.getImageDefault100X100(this.APP_URL) : this.APP_AWS_SNAPSTOREPEPUBLIC+this.store?.stores_image_url;
  }

  changeFirstComplete($event: ColorEvent): void {
    this.customizer.theme_color_first= $event.color.hex;
    this.theme_color_first== $event.color.hex;
    this.InputThemeColorFirst.nativeElement.value='';
    document.documentElement.style.setProperty('--theme_color_first', this.customizer.theme_color_first);


    document.getElementById('safari-pinned-tab-theme').setAttribute('content',  this.customizer.theme_color_first);
    document.getElementById('msapplication-TileColor-theme').setAttribute('content',  this.customizer.theme_color_first);
    document.getElementById('theme-color-theme').setAttribute('content',  this.customizer.theme_color_first);


  }

  setThemeColorFirst(value){
    let data = ((value=='')?this.theme_color_first:value);
    this.customizer.theme_color_first= data;
    document.documentElement.style.setProperty('--theme_color_first',data);
  }

  changeFirstTextComplete($event: ColorEvent): void {
    this.customizer.theme_color_first_text= $event.color.hex;
    this.theme_color_first== $event.color.hex;
    this.InputThemeColorFirstText.nativeElement.value='';
    document.documentElement.style.setProperty('--theme_color_first_text', this.customizer.theme_color_first_text);
  }

  setThemeColorFirstText(value){
    let data = ((value=='')?this.theme_color_first_text:value);
    this.customizer.theme_color_first_text= data;
    document.documentElement.style.setProperty('--theme_color_first_text',data);
  }


  changeSecondComplete($event: ColorEvent): void {
    this.customizer.theme_color_second= $event.color.hex;
    this.theme_color_second== $event.color.hex;
    this.InputThemeColorSecond.nativeElement.value='';

    document.documentElement.style.setProperty('--theme_color_second', this.customizer.theme_color_second);
  }


  setThemeColorSecond(value){
    let data = ((value=='')?this.theme_color_second:value);
    this.customizer.theme_color_second= data;
    document.documentElement.style.setProperty('--theme_color_second',data);
  }

  changeSecondTextComplete($event: ColorEvent): void {
    this.customizer.theme_color_second_text= $event.color.hex;
    this.theme_color_second_text== $event.color.hex;
    this.InputThemeColorSecondText.nativeElement.value='';

    document.documentElement.style.setProperty('--theme_color_second_text', this.customizer.theme_color_second_text);
  }


  setThemeColorSecondText(value){
    let data = ((value=='')?this.theme_color_second_text:value);
    this.customizer.theme_color_second_text= data;
    document.documentElement.style.setProperty('--theme_color_second_text',data);
  }

  changeBackComplete($event: ColorEvent): void {
    this.customizer.theme_color_background= $event.color.hex;
    this.theme_color_second== $event.color.hex;
    this.InputThemeColorBackground.nativeElement.value='';

    document.documentElement.style.setProperty('--theme_color_background', this.customizer.theme_color_background);
  }


  setThemeColorBack(value){
    let data = ((value=='')?this.theme_color_background:value);
    this.customizer.theme_color_background= data;
    document.documentElement.style.setProperty('--theme_color_background',data);
  }


  changeBackTextComplete($event: ColorEvent): void {
    this.customizer.theme_color_background_text= $event.color.hex;
    this.theme_color_second== $event.color.hex;
    document.documentElement.style.setProperty('--theme_color_background_text', this.customizer.theme_color_background_text);
  }


  setThemeColorBackText(value){
    let data = ((value=='')?this.theme_color_background_text:value);
    this.customizer.theme_color_background_text= data;
    document.documentElement.style.setProperty('--theme_color_background_text',data);
  }


  changeColorInfoComplete($event: ColorEvent): void {
    this.customizer.theme_color_info= $event.color.hex;
    this.theme_color_info== $event.color.hex;
    document.documentElement.style.setProperty('--theme_color_info', this.customizer.theme_color_info);
  }

  changeColorWarningComplete($event: ColorEvent): void {
    this.customizer.theme_color_warning= $event.color.hex;
    this.theme_color_warning== $event.color.hex;
    document.documentElement.style.setProperty('--theme_color_warning', this.customizer.theme_color_warning);
  }
  changeColorDangerComplete($event: ColorEvent): void {
    this.customizer.theme_color_danger= $event.color.hex;
    this.theme_color_danger== $event.color.hex;
    document.documentElement.style.setProperty('--theme_color_danger', this.customizer.theme_color_danger);
  }
  changeColorSuccessComplete($event: ColorEvent): void {
    this.customizer.theme_color_success= $event.color.hex;
    this.theme_color_success== $event.color.hex;
    document.documentElement.style.setProperty('--theme_color_success', this.customizer.theme_color_success);
  }


  changeColorLightComplete($event: ColorEvent): void {
    this.customizer.theme_color_light= $event.color.hex;
    this.theme_color_light== $event.color.hex;
    document.documentElement.style.setProperty('--theme_color_light', this.customizer.theme_color_light);
  }
  changeColorLightTextComplete($event: ColorEvent): void {
    this.customizer.theme_color_light_text= $event.color.hex;
    this.theme_color_light_text== $event.color.hex;
    document.documentElement.style.setProperty('--theme_color_light_text', this.customizer.theme_color_light_text);
  }











  changeSuccessComplete($event: ColorEvent): void {
    this.successColorHSLA = $event.color.hsl;
    //this.primaryColor = $event.color.hex;
  }
  changeDangerComplete($event: ColorEvent): void {
    this.dangerColorHSLA = $event.color.hsl;
    //this.primaryColor = $event.color.hex;
  }
  changeWarningComplete($event: ColorEvent): void {
    this.warningColorHSLA = $event.color.hsl;
    //this.primaryColor = $event.color.hex;
  }

  changeInfoComplete($event: ColorEvent): void {
    this.infoColorHSLA = $event.color.hsl;
    //this.primaryColor = $event.color.hex;
  }

  changeLightComplete($event: ColorEvent): void {
    this.lightColorHSLA = $event.color.hsl;
    //this.primaryColor = $event.color.hex;
  }


  changeBlackComplete($event: ColorEvent): void {
    this.blackColorHSLA = $event.color.hsl;
    //this.primaryColor = $event.color.hex;
  }

  changeWhiteComplete($event: ColorEvent): void {
    this.whiteColorHSLA = $event.color.hsl;
    //this.primaryColor = $event.color.hex;
  }


  setPrimaryHSL(){
    this.primaryHSLA = { 'background': `hsla(${this.primaryColorHSLA.h},${(this.primaryColorHSLA.s*100)}%,${(this.primaryColorHSLA.l*100)}%,${(this.primaryColorHSLA.a)})` }
    console.log(this.primaryHSLA)
  }

  setSecondaryHSL(){
    this.secondaryHSLA = { 'background': `hsla(${this.secondaryColorHSLA.h},${(this.secondaryColorHSLA.s*100)}%,${(this.secondaryColorHSLA.l*100)}%,${(this.secondaryColorHSLA.a)})` }
    console.log(this.secondaryHSLA)
  }




  saveFirst(){
    let own = this;
    var data: any = {
      type:1,
      theme_color_first:this.customizer.theme_color_first,
      theme_color_first_text:this.customizer.theme_color_first_text,
      id: own.store.stores_id
    };

    own.isLoadingPrincipal=true;
    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/customizer/update',//

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

        $(own.idGeneral).find('.alerts').append(Metodos.insertAlert())

      },

      error: function (xhr, status) {
        // alert('Disculpe, existió un problema');

        $(own.idGeneral).find('.alerts').append(Metodos.noInsertAlert())
      },
      complete: function (xhr, status) {
        own.isLoadingPrincipal=false;
      }
    });
  }


  saveSecond(){
    let own = this;
    var data: any = {
      type:2,
      theme_color_second:this.customizer.theme_color_second,
      theme_color_second_text:this.customizer.theme_color_second_text,
      id: own.store.stores_id
    };


    own.isLoadingSecundary=true;
    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/customizer/update',//

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

        $(own.idGeneral).find('.alerts').append(Metodos.insertAlert())

      },

      error: function (xhr, status) {
        // alert('Disculpe, existió un problema');

        $(own.idGeneral).find('.alerts').append(Metodos.noInsertAlert())
      },
      complete: function (xhr, status) {
        own.isLoadingSecundary=false;
      }
    });
  }



  saveBackground(){
    let own = this;
    var data: any = {
      type:3,
      theme_color_background:this.customizer.theme_color_background,
      theme_color_background_text:this.customizer.theme_color_background_text,
      id: own.store.stores_id
    };

    own.isLoadingBackground=true;
    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/customizer/update',//

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

        $(own.idGeneral).find('.alerts').append(Metodos.insertAlert())

      },

      error: function (xhr, status) {
        // alert('Disculpe, existió un problema');

        $(own.idGeneral).find('.alerts').append(Metodos.noInsertAlert())
      },
      complete: function (xhr, status) {
        own.isLoadingBackground=false;
      }
    });
  }

  saveDefinedColors(){
    let own = this;
    var data: any = {
      type:4,
      theme_color_info:this.customizer.theme_color_info,
      theme_color_warning:this.customizer.theme_color_warning,
      theme_color_danger:this.customizer.theme_color_danger,
      theme_color_success:this.customizer.theme_color_success,
      id: own.store.stores_id
    };

    own.isLoadingDefinedColor=true;
    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/customizer/update',//

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

        $(own.idGeneral).find('.alerts').append(Metodos.insertAlert())

      },

      error: function (xhr, status) {
        // alert('Disculpe, existió un problema');

        $(own.idGeneral).find('.alerts').append(Metodos.noInsertAlert())
      },
      complete: function (xhr, status) {
        own.isLoadingDefinedColor=false;
      }
    });
  }

  saveLightColors(){
    let own = this;
    var data: any = {
      type:5,
      theme_color_light:this.customizer.theme_color_light,
      theme_color_light_text:this.customizer.theme_color_light_text,
      id: own.store.stores_id
    };
    own.isLoadingLightColor=true;
    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/customizer/update',//

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

        $(own.idGeneral).find('.alerts').append(Metodos.insertAlert())

      },

      error: function (xhr, status) {
        // alert('Disculpe, existió un problema');

        $(own.idGeneral).find('.alerts').append(Metodos.noInsertAlert())
      },
      complete: function (xhr, status) {
        own.isLoadingLightColor=false;
      }
    });

  }















}


/*stores():void{
    this.authorizationService.storeByUrl(this.$stores_uri)
    .subscribe(
    ( response:HttpResponse<any> ) => {

      if(response.status == 200){
        this.store = response.body.content;


        this.store_address_google_maps='https://www.google.com/maps/dir/?api=1&destination=' + (this.store?.stores_address).replace(/blue/g, "+") + '&travelmode=walking'
        for (let index = 0; index < this.store['payment_card'].length; index++) {//
            if(index==this.store['payment_card'].length) break;

            let e =  this.store['payment_card'][index];

            if(typeof e['payment']!= 'undefined'){
                for (let j = 0; j < e['payment'].length; j++){
                    if(j== e['payment'].length) break;
                    let element = e['payment'][j];
                    this.payments.push({
                      image_url:element.image_url,
                      description: element.description
                    })//image_url
                }
            }
        }

        this.theme_color_first=this.store?.store_customizer_bootstrap[0].theme_color_first;
        this.theme_color_first_text=this.store?.store_customizer_bootstrap[0].theme_color_first_text;
        this.theme_color_second=this.store?.store_customizer_bootstrap[0].theme_color_second;
        this.theme_color_second_text=this.store?.store_customizer_bootstrap[0].theme_color_second_text;
        this.theme_color_background=this.store?.store_customizer_bootstrap[0].theme_color_background;
        this.theme_color_background_text=this.store?.store_customizer_bootstrap[0].theme_color_background_text;
        this.theme_color_info=this.store?.store_customizer_bootstrap[0].theme_color_info;
        this.theme_color_warning=this.store?.store_customizer_bootstrap[0].theme_color_warning;
        this.theme_color_danger=this.store?.store_customizer_bootstrap[0].theme_color_danger;
        this.theme_color_success=this.store?.store_customizer_bootstrap[0].theme_color_success;
        this.theme_color_light=this.store?.store_customizer_bootstrap[0].theme_color_light;
        this.theme_color_light_text=this.store?.store_customizer_bootstrap[0].theme_color_light_text;



        this.customizer.theme_color_first=this.store?.store_customizer_bootstrap[0].theme_color_first;
        this.customizer.theme_color_first_text=this.store?.store_customizer_bootstrap[0].theme_color_first_text;
        this.customizer.theme_color_second=this.store?.store_customizer_bootstrap[0].theme_color_second;
        this.customizer.theme_color_second_text=this.store?.store_customizer_bootstrap[0].theme_color_second_text;
        this.customizer.theme_color_background=this.store?.store_customizer_bootstrap[0].theme_color_background;
        this.customizer.theme_color_background_text=this.store?.store_customizer_bootstrap[0].theme_color_background_text;
        this.customizer.theme_color_info=this.store?.store_customizer_bootstrap[0].theme_color_info;
        this.customizer.theme_color_warning=this.store?.store_customizer_bootstrap[0].theme_color_warning;
        this.customizer.theme_color_danger=this.store?.store_customizer_bootstrap[0].theme_color_danger;
        this.customizer.theme_color_success=this.store?.store_customizer_bootstrap[0].theme_color_success;
        this.customizer.theme_color_light=this.store?.store_customizer_bootstrap[0].theme_color_light;
        this.customizer.theme_color_light_text=this.store?.store_customizer_bootstrap[0].theme_color_light_text;


           /*  //document.getElementById('safari-pinned-tab-theme').setAttribute('color','#fb3366');
             document.getElementById('safari-pinned-tab-theme').setAttribute('content', this.store?.store_customizer_bootstrap[0].theme_color_first);
             document.getElementById('msapplication-TileColor-theme').setAttribute('content', this.store?.store_customizer_bootstrap[0].theme_color_first);
             document.getElementById('theme-color-theme').setAttribute('content', this.store?.store_customizer_bootstrap[0].theme_color_first);


             this.theme_color_first = this.store?.store_customizer_bootstrap[0].theme_color_first;


             document.documentElement.style.setProperty('--theme_color_first', this.store?.store_customizer_bootstrap[0].theme_color_first);
             document.documentElement.style.setProperty('--theme_color_first_text', this.store?.store_customizer_bootstrap[0].theme_color_first_text);
             document.documentElement.style.setProperty('--theme_color_second', this.store?.store_customizer_bootstrap[0].theme_color_second);
             document.documentElement.style.setProperty('--theme_color_second_text', this.store?.store_customizer_bootstrap[0].theme_color_second_text);
             document.documentElement.style.setProperty('--theme_color_background', this.store?.store_customizer_bootstrap[0].theme_color_background);
             document.documentElement.style.setProperty('--theme_color_background_text', this.store?.store_customizer_bootstrap[0].theme_color_background_text);

             document.documentElement.style.setProperty('--theme_color_info', this.store?.store_customizer_bootstrap[0].theme_color_info);
             document.documentElement.style.setProperty('--theme_color_warning', this.store?.store_customizer_bootstrap[0].theme_color_warning);
             document.documentElement.style.setProperty('--theme_color_danger', this.store?.store_customizer_bootstrap[0].theme_color_danger);
             document.documentElement.style.setProperty('--theme_color_success', this.store?.store_customizer_bootstrap[0].theme_color_success);

             document.documentElement.style.setProperty('--theme_color_light', this.store?.store_customizer_bootstrap[0].theme_color_light);
             document.documentElement.style.setProperty('--theme_color_light_text', this.store?.store_customizer_bootstrap[0].theme_color_light_text);

      }




    },
    ( response:HttpErrorResponse ) => {
      //var message = (typeof response.error.message=='undefined')?'¡Sucedio un error inesperado!':response.error.message;


    },
    () =>{
      Metodos.removeNodoPreloadHidden('PRELOAD-STORE');
    });
  }*/
