import { Component, OnInit } from '@angular/core';
import { ClientHttp } from 'src/app/shared/http/clients.http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-dashboard-home',
  templateUrl: './admin-dashboard-home.component.html',
  styleUrls: [
    './admin-dashboard-home.component.css'
  ]
})
export class AdminDashboardHomeComponent implements OnInit {
  public APP_URL = environment.apiUrl;
  public $amount_month_total: any = 0;
  public $user_news_month: any = 0;
  public $amount_last_month_total: any = 0;
  public $amount_week_total: any = 0;
  public $user_news_week: any = 0;
  public $amount_last_week_total: any = 0;
  public $amount_day_total: any = 0;
  public $user_news_day: any = 0;
  public $amount_last_day_total: any = 0;
  public $views_totals: any = 0;
  public $orders_totals: any = 0;
  public $user_news_totals: any = 0;
  public $likes_totals: any = 0;
  public $horarios: any[] = [];
  public $users_news: any[] = [];
  public $amount_order_totals: any[] = [];
  public $products: any[] = [];

  //https://stackoverflow.com/questions/14919894/getscript-but-for-stylesheets-in-jquery

  constructor(private clientHttp: ClientHttp) {

  }

  ngOnInit(): void {
    this.clientHttp.getAll().subscribe((data) => {
      this.$user_news_totals = data.length;
      this.$users_news = data;
      this.$users_news = this.$users_news.sort((a, b) => {
        if (a.clientId < b.clientId) {
          return -1;
        }
        if (a.clientId > b.clientId) {
          return 1;
        }
        return 0;
      }).reverse().slice(0, 10);
    });
    /*
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
    */
  }

}
