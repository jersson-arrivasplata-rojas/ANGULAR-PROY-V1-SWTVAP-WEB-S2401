import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormularioPagoInterface as FormularioPago } from 'src/app/shared/interfaces/formulario-pago.interface';
import { SearchInterface as Search } from 'src/app/shared/interfaces/search.interface';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../services/local-storage.service';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationHttp {


  headers = { 'content-type': 'application/json'};

  constructor(private http: HttpClient, private messageService: MessageService, private localStorageService:LocalStorageService) { }

  stores(): Observable<any> {
    return this.http.get(environment.apiUrl+'stores/home',
    {
      'headers': this.headers ,
      observe: 'response'
    });
  }
  storeByUrl(uri: string): Observable<any> {//http://localhost:8000/api/store?uri=polize-store
    let authorization = this.localStorageService.getItem('accessToken');
    let route = 'store';
    let headers = {
      'content-type': 'application/json'
    };
    if(authorization!=null){
      if(authorization.split(' ')[1]!=null && authorization.split(' ')[1]!=''&&typeof authorization.split(' ')[1]!='undefined'){
        headers['Authorization'] = authorization;
         route = 'store/auth';
      }
    }


    return this.http.get(environment.apiUrl+`${route}?uri=`+uri,
    {
      'headers': headers ,
      observe: 'response'
    });
  }
  storeByUrlAllProducts(uri: string, search:Search): Observable<any> {//http://localhost:8000/api/store?uri=polize-store
    let url = environment.apiUrl + `store/products?uri=${uri}&current_page=${search.current_page}&subcategories=${(search.subcategories!=null && search.subcategories!='')?search.subcategories:''}&categories=${(search.categories!=null && search.categories!='')?search.categories:''}&product=${(search.product!=null && search.product!='')?search.product:''}&price_min=${(search.price_min!=null && search.price_min!=0)?search.price_min:''}&price_max=${(search.price_max!=null && search.price_max!=100000000000000)?search.price_max:''}&check_promotions=${(search.check_promotions!=null && search.check_promotions!='')?search.check_promotions:''}`
    return this.http.get(url,
    {
      'headers': this.headers ,
      observe: 'response'
    });
  }
  storeByUrlProduct(store: string, producto: string): Observable<any> {//http://localhost:8000/api/store?uri=polize-store
    let authorization = this.localStorageService.getItem('accessToken');
    let route = 'store/product/byurl';
    let headers = {
      'content-type': 'application/json'
    };
    if(authorization!=null){
      if(authorization.split(' ')[1]!=null && authorization.split(' ')[1]!=''&&typeof authorization.split(' ')[1]!='undefined'){
        headers['Authorization'] = authorization;
         route = 'store/product/byurl/auth';
      }
    }


    let url = environment.apiUrl + `${route}?store=${store}&product=${producto}`
    return this.http.get(url,
    {
      'headers': headers ,
      observe: 'response'
    });
  }
  storeProductComments(id:any): Observable<any> {//http://localhost:8000/api/store?uri=polize-store
    let url = environment.apiUrl + `store/product/comment/select?product_id=${id}`
    return this.http.get(url,
    {
      'headers': this.headers ,
      observe: 'response'
    });
  }
  storeProductAddComments(id:any,name:any,email:any,celphone:any,comment:any,uri:any): Observable<any> {//http://localhost:8000/api/store?uri=polize-store
    let authorization = this.localStorageService.getItem('accessToken');
    let route = 'store/product/comment/add';
    let headers = {
      'content-type': 'application/json'
    };
    if(authorization!=null){
      if(authorization.split(' ')[1]!=null && authorization.split(' ')[1]!=''&&typeof authorization.split(' ')[1]!='undefined'){
        headers['Authorization'] = authorization;
        route = 'store/product/comment/add/auth';
      }
    }


    //store/product/comment/add/auth
    let url = environment.apiUrl + `${route}?product_id=${id}&name=${name}&email=${email}&celphone=${celphone}&comment=${comment}&uri=${uri}`
    return this.http.get(url,
    {
      'headers': headers ,
      observe: 'response'
    });
  }
  //http://localhost:8000/api/store/product/search?product=&store=polize-store&current_page=0
  storeProductSearch(store: string, producto: string, current_page: number, subcategories: string, price_min:number, price_max:number, check_promotions:string): Observable<any> {//http://localhost:8000/api/store?uri=polize-store

    let authorization = this.localStorageService.getItem('accessToken');
    let route = 'store/product/search';
    let headers = {
      'content-type': 'application/json'
    };
    if(authorization!=null){
      if(authorization.split(' ')[1]!=null && authorization.split(' ')[1]!=''&&typeof authorization.split(' ')[1]!='undefined'){
        headers['Authorization'] = authorization;
        route = 'store/product/search/auth';
      }
    }

    let url = environment.apiUrl + `${route}?store=${store}&product=${producto}&current_page=${current_page}&subcategories=${(subcategories!=null && subcategories!='')?subcategories:''}&price_min=${(price_min!=null && price_min!=0)?price_min:''}&price_max=${(price_max!=null && price_max!=100000000000000)?price_max:''}&check_promotions=${(check_promotions!=null && check_promotions!='')?check_promotions:''}`
    return this.http.get(url,
    {
      'headers': headers ,
      observe: 'response'
    });
  }

  storeCarts(store: any){
    let headers = {
      'content-type': 'application/json',
      'Authorization': this.localStorageService.getItem('accessToken')
    };

    let url = environment.apiUrl + `store/carts?store=${store}`
    return this.http.get(url,
    {
      'headers': headers ,
      observe: 'response'
    });
  }

  removeCart(products_cart_id,store): Observable<any> {//http://localhost:8000/api/store?uri=polize-store
    let headers = {
      'content-type': 'application/json',
      'Authorization': this.localStorageService.getItem('accessToken')
    };

    let url = environment.apiUrl + `store/product/remove/cart?products_cart_id=${products_cart_id}&store=${store}`
    return this.http.get(url,
    {
      'headers': headers ,
      observe: 'response'
    });
  }

  addCart(products_cart_id,product_id,quantity,store,type,product_tags_image_type,product_tags_image_description,product_tag_description): Observable<any> {//http://localhost:8000/api/store?uri=polize-store
    let authorization = this.localStorageService.getItem('accessToken');
   // if(Metodos.validationAccessToken(authorization)==true){
      let headers = {
        'content-type': 'application/json',
        'Authorization': authorization
      };

      let url = environment.apiUrl + `store/product/add/cart?products_cart_id=${products_cart_id}&product_id=${product_id}&quantity=${quantity}&store=${store}&type=${type}&product_tags_image_type_color=${((type==1)?((product_tags_image_description.indexOf("#")==0)?'hex':''):'')}&product_tags_image_type=${product_tags_image_type}&product_tags_image_description=${(product_tags_image_description.indexOf("#")==-1)?product_tags_image_description:product_tags_image_description.split("#")[1]}&product_tag_description=${product_tag_description}`
      console.log(url)
      return this.http.get(url,
      {
        'headers': headers ,
        observe: 'response'
      });
    /*}else{

    }  */
  }
  addHeart(product): Observable<any> {//http://localhost:8000/api/store?uri=polize-store
    let headers = {
      'content-type': 'application/json',
      'Authorization': this.localStorageService.getItem('accessToken')
    };
    let url = environment.apiUrl + `store/product/add/heart?product_id=${product}`
    return this.http.get(url,
    {
      'headers': headers ,
      observe: 'response'
    });
  }

  addStoreLike(store): Observable<any> {//http://localhost:8000/api/store?uri=polize-store
    let headers = {
      'content-type': 'application/json',
      'Authorization': this.localStorageService.getItem('accessToken')
    };
    let url = environment.apiUrl + `store/add/like?store=${store}`
    return this.http.get(url,
    {
      'headers': headers ,
      observe: 'response'
    });
  }

  addStoreFollow(store): Observable<any> {//http://localhost:8000/api/store?uri=polize-store
    let headers = {
      'content-type': 'application/json',
      'Authorization': this.localStorageService.getItem('accessToken')
    };
    let url = environment.apiUrl + `store/add/follow?store=${store}`
    return this.http.get(url,
    {
      'headers': headers ,
      observe: 'response'
    });
  }

//http://localhost:8000/api/explorer/products?to=0
  products(search:Search): Observable<any> {
    let url = environment.apiUrl + `explorer/products?current_page=${search.current_page}&filters=${(search.filters!=null && search.filters!='')?search.filters:''}&name=${(search.name!=null && search.name!='')?search.name:''}&product=${(search.product!=null && search.product!='')?search.product:''}&address=${(search.address!=null && search.address!='')?search.address:''}&price_min=${(search.price_min!=null && search.price_min!=0)?search.price_min:''}&price_max=${(search.price_max!=null && search.price_max!=100000000000000)?search.price_max:''}&check_delivery=${(search.check_delivery!=null && search.check_delivery!='')?search.check_delivery:''}&check_pick_store=${(search.check_pick_store!=null && search.check_pick_store!='')?search.check_pick_store:''}&check_promotions=${(search.check_promotions!=null && search.check_promotions!='')?search.check_promotions:''}`
    return this.http.get(url,
    {
      'headers': this.headers ,
      observe: 'response'
    });
  }



  shops(search:Search): Observable<any> {
    let url = environment.apiUrl + `explorer/stores?current_page=${search.current_page}&filters=${(search.filters!=null && search.filters!='')?search.filters:''}&name=${(search.name!=null && search.name!='')?search.name:''}&product=${(search.product!=null && search.product!='')?search.product:''}&address=${(search.address!=null && search.address!='')?search.address:''}&price_min=${(search.price_min!=null && search.price_min!=0)?search.price_min:''}&price_max=${(search.price_max!=null && search.price_max!=100000000000000)?search.price_max:''}&check_delivery=${(search.check_delivery!=null && search.check_delivery!='')?search.check_delivery:''}&check_pick_store=${(search.check_pick_store!=null && search.check_pick_store!='')?search.check_pick_store:''}&check_promotions=${(search.check_promotions!=null && search.check_promotions!='')?search.check_promotions:''}`

    return this.http.get(url,
    {
      'headers': this.headers ,
      observe: 'response'
    });
  }

  dashboardValidation(store): Observable<HttpResponse<Object>> {//http://localhost:8000/api/store?uri=polize-store
    let headers = {
      'content-type': 'application/json',
      'Authorization': this.localStorageService.getItem('accessToken')
    };

    let url = environment.apiUrl + `dashboard/validation/store?store=${store}`
    return this.http.get(url,
    {
      'headers': headers ,
      observe: 'response'
    });
  }

  dashboardAddCart(product_id,quantity,store_id,order_id): Observable<any> {//http://localhost:8000/api/store?uri=polize-store
    let headers = {
      'content-type': 'application/json',
      'Authorization': this.localStorageService.getItem('accessToken')
    };

    let url = environment.apiUrl + `dashboard/store/product/add/cart?product_id=${product_id}&quantity=${quantity}&store_id=${store_id}&order_id=${order_id}`
    return this.http.get(url,
    {
      'headers': headers ,
      observe: 'response'
    });
  }

  dashboardStoreAllProductComments(store_id:any): Observable<any> {//http://localhost:8000/api/store?uri=polize-store
    let headers = {
      'content-type': 'application/json',
      'Authorization': this.localStorageService.getItem('accessToken')
    };
    let url = environment.apiUrl + `dashboard/store/product/comment/all?store_id=${store_id}`
    return this.http.get(url,
    {
      'headers': headers,
      observe: 'response'
    });
  }
  dashboardStoreProductComments(id:any): Observable<any> {//http://localhost:8000/api/store?uri=polize-store
    let headers = {
      'content-type': 'application/json',
      'Authorization': this.localStorageService.getItem('accessToken')
    };
    let url = environment.apiUrl + `dashboard/store/product/comment/select?product_id=${id}`
    return this.http.get(url,
    {
      'headers': headers,
      observe: 'response'
    });
  }
  dashboardStoreProductAddResponse(id:any,response:any,product_id:any): Observable<any> {//http://localhost:8000/api/store?uri=polize-store
    let headers = {
      'content-type': 'application/json',
      'Authorization': this.localStorageService.getItem('accessToken')
    };
    let url = environment.apiUrl + `dashboard/store/product/comment/update?id=${id}&response=${response}&product_id=${product_id}`
    return this.http.get(url,
    {
      'headers': headers,
      observe: 'response'
    });
  }
  dashboardStoreCarts(id: number){
    let headers = {
      'content-type': 'application/json',
      'Authorization': this.localStorageService.getItem('accessToken')
    };

    let url = environment.apiUrl + `dashboard/store/carts?order_id=${id}`
    return this.http.get(url,
    {
      'headers': headers,
      observe: 'response'
    });
  }

  addOrder(formularioPago:FormularioPago){
    let headers = {
      'content-type': 'application/json',
      'Authorization': this.localStorageService.getItem('accessToken')
    };
    let store_id = formularioPago.store_id;
    let user_first_name = formularioPago.first_name;
    let user_last_name = formularioPago.last_name;
    let user_document_type = formularioPago.document_type;
    let user_document = formularioPago.document;
    let user_email = formularioPago.email;
    let user_celphone = formularioPago.celphone;
    let user_code_celphone = formularioPago.country_phone_code;
    let country_phone_id = formularioPago.country_phone_id;

    let address = formularioPago.address;
    let optional_address = formularioPago.reference;
    let comment = formularioPago.comment;
    let delivery_type = (formularioPago.check_delivery_type==true)?1:0;
    let payment_card_id =  formularioPago.payment_type;
    //let canal = 'platform';


    let url = environment.apiUrl + `store/order/add?store_id=${store_id}&user_first_name=${user_first_name}
    &user_last_name=${user_last_name}&user_document_type=${user_document_type}&user_document=${user_document}
    &user_email=${user_email}&user_celphone=${user_celphone}&user_code_celphone=${user_code_celphone}&country_phone_id=${country_phone_id}
    &address=${address}&optional_address=${optional_address}&comment=${comment}&delivery_type=${delivery_type}&payment_card_id=${(payment_card_id==null||payment_card_id=='')?'':payment_card_id}`
    return this.http.get(url,
    {
      'headers': headers,
      observe: 'response'
    });
  }


  //http://localhost:8000/api/explorer/filters?to=0&filters=14
 /* filters(current_page:number,filters:string): Observable<any> {
    return this.http.get(environment.apiUrl+'explorer/filters?current_page='+current_page+'&filters='+filters,
    {
      'headers': this.headers ,
      observe: 'response'
    });
  }*/
  //name=polize&product=&address=&price_min=0&price_max=10000&category&check_delivery=SI&check_pick_store=SI&check_promotions=SI
  search(to: number,
    name: string,
    product: string,
    address: string,
    price_min: number,
    price_max: number,
    filters: string,
    check_delivery: string,
    check_pick_store: string,
    check_promotions: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}explore/search?
    to=${to}&
    name=${name}&
    product=${product}&
    address=${address}&
    price_min=${price_min}&
    price_max=${price_max}&
    filters=${filters}&
    check_delivery=${check_delivery}&
    check_pick_store=${check_pick_store}&
    check_promotions=${check_promotions}`,
    {
      'headers': this.headers ,
      observe: 'response'
    });
  }
}
 /*

    amount ,
    amount_total ,
    payment_method ,
    delivery_time ,
    delivery_date ,
    date TIMESTAMP ,
    address ,
    optional_address ,
    address_google_maps ,
    address_type ,
    latitud ,
    longitud ,
    condominium ,
    condominium_build ,
    department_number ,
    floor_number ,
    type_bank ,
    account_number ,
    operation_number ,
    comision ,
    status ,
    status_pay ,
    status_worker ,
    order_programmer ,
    order_programmer_date_time ,
    revised ,
    list ,
    collect ,
    debt ,
    description ,
    convertion ,
    comment ,
    coverage_id ,
    coverage_price ,
    coverage_name ,
    country_id ,
    payment_card_id ,
    country_department_id ,
    country_district_id ,
    country_province_id ,
*/
