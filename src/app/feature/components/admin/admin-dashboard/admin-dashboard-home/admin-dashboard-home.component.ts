import { Component, ComponentFactoryResolver, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { Metodos } from 'src/Utils/Metodos';
import { Store } from 'src/app/interfaces/store';
import { NodeStoreService } from 'src/app/services/node-store.service';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
  selector: 'app-admin-dashboard-home',
  templateUrl: './admin-dashboard-home.component.html',
  styleUrls: [
    './admin-dashboard-home.component.css',
    '../../../../../assets/css/hopscotch.css'
  ]
})
export class AdminDashboardHomeComponent implements OnInit {
  public APP_URL = environment.appUrl;
  public APP_URL_API = environment.apiUrl;
  public $amount_month_total: any = '';
  public $user_news_month: any = '';
  public $amount_last_month_total: any = '';
  public $amount_week_total: any = '';
  public $user_news_week: any = '';
  public $amount_last_week_total: any = '';
  public $amount_day_total: any = '';
  public $user_news_day: any = '';
  public $amount_last_day_total: any = '';
  public $views_totals: any = '';
  public $orders_totals: any = '';
  public $user_news_totals: any = '';
  public $likes_totals: any = '';
  public $horarios: any[]=[];
  public $users_news: any[]=[];
  public $amount_order_totals: any[]=[];
  public $products: any[]=[];
  public idGeneral = '#STORE-DASHBOARD-INICIO';
  public store:Store=null;
  preloadDashboard:boolean = false;
  
//https://stackoverflow.com/questions/14919894/getscript-but-for-stylesheets-in-jquery
  
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,public nodeStoreService:NodeStoreService, public renderer2:Renderer2) {
      nodeStoreService.getStore().subscribe(data=>{
        this.store = data.store;
      }); 
    }

  ngOnInit(): void {
    Metodos.menuDashboardActive('inicio');
    $.getScript(this.APP_URL+'assets/javascript/tours/dashboard/dashboard-inicio-tour.js');
    this.getHomeIndex()
  }
  public getImagePrincipal() {
    return (this.store?.stores_image == null || this.store?.stores_image == '') ? Metodos.getImageDefault100X100(this.APP_URL) : this.store?.stores_image_url;
  }
  getHomeIndex() {
    Metodos.insertPreloadStoreRemoveHidden('PRELOAD-DASHBOARD-INICIO', this.getImagePrincipal(), this.store.stores_name);

    let own = this;
    own.preloadDashboard=false;
    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/home',//ok

      type: 'GET',
      headers: { 
        "Authorization": localStorage.getItem('accessToken')
      },
      data: { store_id: own.store.stores_id },

      // el tipo de información que se espera de respuesta
      dataType: 'json',
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (data) {
        own.$horarios = data.horarios;
        own.$amount_day_total = data.amount_day_total;
        own.$amount_week_total = data.amount_week_total;
        own.$amount_month_total = data.amount_month_total;
        own.$user_news_totals = data.user_news_totals;
        own.$views_totals = data.views_totals;
        own.$likes_totals = data.likes_totals;
        own.$users_news = data.users_news;
        own.$amount_last_day_total = data.amount_last_day_total;
        own.$amount_last_week_total = data.amount_last_week_total;
        own.$amount_last_month_total = data.amount_last_month_total;
        own.$user_news_month = data.user_news_month;
        own.$user_news_day = data.user_news_day;
        own.$user_news_week = data.user_news_week;
        own.$orders_totals = data.orders_totals;
        own.$amount_order_totals = data.amount_order_totals;
        own.$products = data.products;
       // console.log(data)
       
      },

      error: function (xhr, status) {
        // alert('Disculpe, existió un problema');
      },

      // código a ejecutar sin importar si la petición falló o no
      complete: function (xhr, status) {
        //  alert('Petición realizada');
        own.preloadDashboard=true;
        Metodos.removeNodoPreloadHidden('PRELOAD-DASHBOARD-INICIO');
        
      }
    });
  }

  
 
}
