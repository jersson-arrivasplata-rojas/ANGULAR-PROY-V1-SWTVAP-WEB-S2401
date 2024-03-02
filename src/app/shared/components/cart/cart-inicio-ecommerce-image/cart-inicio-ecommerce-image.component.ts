import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ImageInterface as Image } from 'src/app/shared/interfaces/image.interface';
import { StoreInterface as Store } from 'src/app/shared/interfaces/store.interface';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { NodeStoreService } from 'src/app/shared/services/node-store.service';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
import { environment } from 'src/environments/environment';

//Component, OnInit, Input, Output,
@Component({
  selector: 'app-cart-inicio-ecommerce-image',
  templateUrl: './cart-inicio-ecommerce-image.component.html',
  styleUrls: ['./cart-inicio-ecommerce-image.component.css']
})
export class CartInicioEcommerceImageComponent implements OnInit {
  public APP_URL = environment.apiUrl;

  @Input() content;
  @Input() products_id;
  @Input() quantity='';
  @Input() type = 0;
  @Input() subcategories_description:any;
  @Input() product_type_sale_discount:any;
  @Input() product_type_sale_price:any;
  @Input() product_type_sale_type:any;
  @Input() product_type_sale_stock:any;
  @Input() products_unavailable:number;

  @Input() products_images_tag_visible:number;
  @Input() product_images:Image[];
  @Input() products_tag_name:string;
  @Input() splitTags:string[];

  @Output() emitEvent = new EventEmitter();
  @Output() emitAlertEvent = new EventEmitter<{
    response:boolean,
    id:string,
    data: ElementRef
  }>();
  public id:string;
  @ViewChild('alert') alert:ElementRef;
  public alerProduct:boolean = false;
  //@Output() emitEvent = new EventEmitter<any>(); : EventEmitter<any>

  public store:Store;
  constructor(private router: Router,
    public localStorageService:LocalStorageService,
    public nodeStoreService: NodeStoreService) {
      nodeStoreService.getStore().subscribe(data=>{
        this.store = data.store;
      });
    }

  ngOnInit(): void {
    this.id = `alert-product-${this.content}-${this.products_id}`;
  }

  addCart($event){
    let authorization = this.localStorageService.getItem('accessToken');
    if(CommonUtils.validationAccessToken(authorization)==true){
      //console.log(this.alert);
      let alertProductId=document.getElementById(`alert-product-${this.content}-${this.products_id}`);
      let inputProductId:any=document.getElementById(`input-product-${this.content}-${this.products_id}`);
      let spinnerProductId:any = document.getElementById(`spinner-product-${this.content}-${this.products_id}-i`);
      let spinnerCartId:any = document.getElementById(`spinner-cart-${this.content}-${this.products_id}-i`);

      if(inputProductId.value=='') inputProductId.value=1;
      spinnerCartId.classList.add('d-none');
      spinnerProductId.classList.remove('d-none');

      let product_tags_image_description = '';//[name='bla[]']:checked
      let product_tags_image_type = 0;//[name='bla[]']:checked

      if(this.products_images_tag_visible==1&&this.product_images.length >= 2){
        let element_itv:any= document.querySelector('input[name="tag'+this.products_id+'b"]:checked');
        product_tags_image_description = element_itv.value;
        for (let index = 0; index < this.product_images.length; index++) {
          const element = this.product_images[index];
          if(element.description=='product_tags_image_description'){
            product_tags_image_type=element.type;
          }
        }
      }

      let tag_description = '';//[name='bla[]']:checked
      //let tag_description_title = '';//[name='bla[]']:checked

      if(this.splitTags.length>0){
        let element_d:any= document.querySelector('input[name="tag'+this.products_id+'"]:checked');
        tag_description = element_d.value;

        /*if(this.products_tag_name!=''&&this.products_tag_name!=null){
          tag_description_title=this.products_tag_name;
        }*/

      }

      console.log(product_tags_image_type);
      console.log(product_tags_image_description);
      console.log(tag_description);

    }else{
      this.router.navigate(['/auth/login'], { queryParams: { store: this.store.stores_id, qim: this.store.stores_image ,qn:this.store.stores_name,uri:this.store.stores_uri } });
    }

  }

  /*public getImagePrincipal() { this.getImagePrincipal()
    return  (this.store?.stores_image == null || this.store?.stores_image == '') ? CommonUtils.getImageDefault100X100(this.APP_URL) : this.APP_URL_API_BASE+'storage/'+ this.store?.stores_image_url;
  }*/
}

