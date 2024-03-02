import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-default',
  templateUrl: './search-default.component.html',
  styleUrls: ['./search-default.component.css']
})
export class SearchDefaultComponent implements OnInit {

  @Input() public fieldsetActivate=1;
  public APP_URL =  environment.apiUrl;

  public search = {
    current_page: 0,
    type: null,
    name: null,
    product: null,
    address: null,
    price_min: 0,
    price_max: 0,
    filters: null,
    check_delivery: null,
    check_pick_store: null,
    check_promotions: null
  };


  constructor( private router: Router) { }

  ngOnInit(): void {
    this.search.price_min = CommonUtils.price_min;
    this.search.price_max = CommonUtils.price_max;
  }

  busquedaExplorar(){
    //this.router.navigateByUrl('/home/busqueda?type=search&address=PlanEmprededorBasico&product=Lima&store=Tiendita');
    //${this.search.filters}
    //this.router.navigateByUrl(`/home/busqueda?type=stores&filters=&name=${(this.search.name!=null && this.search.name!='')?this.search.name:''}&product=${(this.search.product!=null && this.search.product!='')?this.search.product:''}&address=${(this.search.address!=null && this.search.address!='')?this.search.address:''}&price_min=${(this.search.price_min!=null && this.search.price_min!=0)?this.search.price_min:''}&price_max=${(this.search.price_max!=null && this.search.price_max!=100000000000000)?this.search.price_max:''}&check_delivery=${(this.search.check_delivery!=null && this.search.check_delivery!='')?this.search.check_delivery:''}&check_pick_store=${(this.search.check_pick_store!=null && this.search.check_pick_store!='')?this.search.check_pick_store:''}&check_promotions=${(this.search.check_promotions!=null && this.search.check_promotions!='')?this.search.check_promotions:''}`);
    this.router.navigateByUrl(`/home/busqueda?type=products&filters=${(this.search.filters!=null && this.search.filters!='')?this.search.filters:''}&name=${(this.search.name!=null && this.search.name!='')?this.search.name:''}&product=${(this.search.product!=null && this.search.product!='')?this.search.product:''}&address=${(this.search.address!=null && this.search.address!='')?this.search.address:''}&price_min=${(this.search.price_min!=null && this.search.price_min!=CommonUtils.price_min)?this.search.price_min:''}&price_max=${(this.search.price_max!=null && this.search.price_max!=CommonUtils.price_max)?this.search.price_max:''}&check_delivery=${(this.search.check_delivery!=null && this.search.check_delivery!='')?this.search.check_delivery:''}&check_pick_store=${(this.search.check_pick_store!=null && this.search.check_pick_store!='')?this.search.check_pick_store:''}&check_promotions=${(this.search.check_promotions!=null && this.search.check_promotions!='')?this.search.check_promotions:''}`);

  }

  onSubmit(): void {

  }
}
