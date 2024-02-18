import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs';
import { ClientHttp } from 'src/app/shared/http/clients.http';
import { OrderHttp } from 'src/app/shared/http/orders.http';
import { ProductHttp } from 'src/app/shared/http/products.http';
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
  public $amount_year_total: any = 0;
  public $amount_year_totalUSD: any = 0;
  public $amount_year_totalEUR: any = 0;
  public $amount_last_year_total: any = 0;
  public $amount_last_year_totalUSD: any = 0;
  public $amount_last_year_totalEUR: any = 0;
  public $amount_month_six_total: any = 0;
  public $amount_month_six_totalUSD: any = 0;
  public $amount_month_six_totalEUR: any = 0;
  public $amount_last_month_six_total: any = 0;
  public $amount_last_month_six_totalUSD: any = 0;
  public $amount_last_month_six_totalEUR: any = 0;
  public $amount_last_month_total: any = 0;
  public $amount_last_month_totalUSD: any = 0;
  public $amount_last_month_totalEUR: any = 0;
  public $amount_month_total: any = 0;
  public $amount_month_totalUSD: any = 0;
  public $amount_month_totalEUR: any = 0;
  public $user_news_totals: any = 0;
  public $users_news: any[] = [];
  public $products: any[] = [];
  public $orders_news: any[] = [];
  public $order_news_totals: any = 0;
  public $product_news_totals: any = 0;
  public $orderSummary: any = {};
  //https://stackoverflow.com/questions/14919894/getscript-but-for-stylesheets-in-jquery

  constructor(private clientHttp: ClientHttp, private orderHttp: OrderHttp,
    private productHttp: ProductHttp) { }

  ngOnInit(): void {
    this.clientHttp.getAll()
      .pipe(
        mergeMap((data) => {
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

          return this.orderHttp.getSummary();
        }),
        mergeMap((sumary) => {

          this.$orderSummary = sumary ? sumary.reduce((obj, item) => {
            obj[item[0]] = item.slice(1);
            return obj;
          }, {}) : {};

          this.$amount_year_total = this.$orderSummary['Current Year'] ? this.$orderSummary['Current Year'][0] : 0;
          this.$amount_year_totalUSD = this.$orderSummary['Current Year'] ? this.$orderSummary['Current Year'][1] : 0;
          this.$amount_year_totalEUR = this.$orderSummary['Current Year'] ? this.$orderSummary['Current Year'][2] : 0;
          this.$amount_last_year_total = this.$orderSummary['Previous Year'] ? this.$orderSummary['Previous Year'][0] : 0;
          this.$amount_last_year_totalUSD = this.$orderSummary['Previous Year'] ? this.$orderSummary['Previous Year'][1] : 0;
          this.$amount_last_year_totalEUR = this.$orderSummary['Previous Year'] ? this.$orderSummary['Previous Year'][2] : 0;
          this.$amount_month_six_total = this.$orderSummary['Last 6 Months'] ? this.$orderSummary['Last 6 Months'][0] : 0;
          this.$amount_month_six_totalUSD = this.$orderSummary['Last 6 Months'] ? this.$orderSummary['Last 6 Months'][1] : 0;
          this.$amount_month_six_totalEUR = this.$orderSummary['Last 6 Months'] ? this.$orderSummary['Last 6 Months'][2] : 0;
          this.$amount_last_month_six_total = this.$orderSummary['6 to 12 Months Ago'] ? this.$orderSummary['6 to 12 Months Ago'][0] : 0;
          this.$amount_last_month_six_totalUSD = this.$orderSummary['6 to 12 Months Ago'] ? this.$orderSummary['6 to 12 Months Ago'][1] : 0;
          this.$amount_last_month_six_totalEUR = this.$orderSummary['6 to 12 Months Ago'] ? this.$orderSummary['6 to 12 Months Ago'][2] : 0;
          this.$amount_last_month_total = this.$orderSummary['Last Month'] ? this.$orderSummary['Last Month'][0] : 0;
          this.$amount_last_month_totalUSD = this.$orderSummary['Last Month'] ? this.$orderSummary['Last Month'][1] : 0;
          this.$amount_last_month_totalEUR = this.$orderSummary['Last Month'] ? this.$orderSummary['Last Month'][2] : 0;
          this.$amount_month_total = this.$orderSummary['1 to 2 Months Ago'] ? this.$orderSummary['1 to 2 Months Ago'][0] : 0;
          this.$amount_month_totalUSD = this.$orderSummary['1 to 2 Months Ago'] ? this.$orderSummary['1 to 2 Months Ago'][1] : 0;
          this.$amount_month_totalEUR = this.$orderSummary['1 to 2 Months Ago'] ? this.$orderSummary['1 to 2 Months Ago'][2] : 0;

          return this.productHttp.getAll();
        }),
        mergeMap((data) => {
          this.$product_news_totals = data.length;
          this.$products = data;
          return this.orderHttp.getAll();
        })
      ).subscribe((data) => {
        data.map((order: any) => {
          order.client = this.$users_news.find((user: any) => user.clientId === order.clientId);
        });

        this.$order_news_totals = data.length;
        this.$orders_news = data;
        this.$orders_news = this.$orders_news.sort((a, b) => {
          if (a.clientId < b.clientId) {
            return -1;
          }
          if (a.clientId > b.clientId) {
            return 1;
          }
          return 0;
        }).reverse().slice(0, 10);
      });
  }
}
