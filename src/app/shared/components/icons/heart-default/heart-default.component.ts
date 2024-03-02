import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StoreInterface as Store } from 'src/app/shared/interfaces/store.interface';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { NodeStoreService } from 'src/app/shared/services/node-store.service';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'app-heart-default',
  templateUrl: './heart-default.component.html',
  styleUrls: ['./heart-default.component.css']
})
export class HeartDefaultComponent implements OnInit {
  @ViewChild('heartDefault') heartDefault:ElementRef;
  @Input() content_id:any;
  @Input() product_id:any;
  @Input() fontSize:any='1.8rem';
  @Input() heart:number;

  public store:Store;
  constructor(private router: Router,
     private localStorageService:LocalStorageService,
      public nodeStoreService: NodeStoreService) {
      nodeStoreService.getStore().subscribe(data=>{
        this.store = data.store;
      });
    }

  ngOnInit(): void {

  }
  addHeart(element){
    let authorization = this.localStorageService.getItem('accessToken');
    if(CommonUtils.validationAccessToken(authorization)==true){
      this.changeHeart(element);


    }else{
      this.router.navigate(['/auth/login'], { queryParams: { store: this.store.stores_id, qim: this.store.stores_image ,qn:this.store.stores_name,uri:this.store.stores_uri } });
    }

  }
  mouseenterHeart(element){
    this.changeHeart(element);
  }

  mouseleaveHeart(element){
    this.changeHeart(element);
  }

  changeHeart(element){
    let query = element.querySelector('i');
    if(query.classList.contains('mdi-heart-outline')==true){
      query.classList.remove('mdi-heart-outline');
      query.classList.add('mdi-heart');
      element.classList.add('is-active');
    }else{
      query.classList.add('mdi-heart-outline');
      query.classList.remove('mdi-heart');
      element.classList.remove('is-active');
    }
  }
}
