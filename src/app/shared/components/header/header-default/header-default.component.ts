import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
import { environment } from 'src/environments/environment';

import { StoreInterface as Store } from 'src/app/shared/interfaces/store.interface';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { NodeStoreService } from 'src/app/shared/services/node-store.service';
declare var dynamics: any;

@Component({
  selector: 'swtvap-header-default',
  templateUrl: './header-default.component.html',
  styleUrls: ['./header-default.component.css']
})
export class HeaderDefaultComponent implements OnInit {

  public APP_URL = environment.apiUrl;

  @ViewChild('HoursModal') HoursModal:ElementRef;
  @Input() theme_color_primary;
  @Input() stores_uri;
  @Input() stores_image_url;
  @Input() stores_name;
  @Input() store_address_google_maps;
  @Input() stores_address;
  @Input() stores_user_follow;
  @Input() stores_user_like;


  /*@Input() today:{
    day:string,
    time_start:string,
    time_end:string,
    response:number
  };*/
  @Input() hours=[];
  @Input() stores_description;
  @Input() stores_nickname;
  @Input() stores_celphone;
  @Input() stores_email;
  @Input() stores_whatsapp;
  @Input() stores_facebook;
  @Input() stores_instagram;
  @Input() stores_collect;
  @Input() stores_delivery;
  @Input() stores_coverage;
  @Input() stores_despatch_time;

  public store:Store;

  constructor(private router: Router,
    private localStorageService:LocalStorageService,
    public nodeStoreService: NodeStoreService) {
    nodeStoreService.getStore().subscribe(data=>{
      this.store = data.store;
    });
  }

  ngOnInit(): void {
    //document.getElementById('dripIconsChevRonLeftStore').dataset.type='0';

    /*var btnOpen = document.getElementById('js-open');
    var btnClose = document.getElementById('js-close');
    var modal = document.getElementById('js-modal');*/


  }


  alertShowModal(element){
    CommonUtils.alertModalShow(element,this.HoursModal.nativeElement,dynamics);
  }


  alertCloseModal(element){
    CommonUtils.alertModalClose(element,this.HoursModal.nativeElement,dynamics);
  }



  addStoreLike(element){
    let authorization = this.localStorageService.getItem('accessToken');

  }
  addStoreFollow(element){
    let authorization = this.localStorageService.getItem('accessToken');
    if(CommonUtils.validationAccessToken(authorization)==true){
      let followI = element.querySelector(`i`);
      this.changeFollow(followI);
    }else{
      this.router.navigate(['/auth/login'], { queryParams: { store: this.store.stores_id, qim: this.store.stores_image ,qn:this.store.stores_name,uri:this.store.stores_uri } });

    }


  }

  mouseenterLike(){
    let likeI = document.querySelector(`#hover-icon-like-${this.stores_uri} i`);
    this.changeLike(likeI);
  }

  mouseleaveLike(){
    let likeI = document.querySelector(`#hover-icon-like-${this.stores_uri} i`);
    this.changeLike(likeI);

  }
  changeLike(likeI){
    if(likeI.classList.contains('d-none')==true){
      likeI.classList.remove('d-none');
    }else{
      likeI.classList.add('d-none');
    }
  }

  mouseenterFollow(){
    let followI = document.querySelector(`#hover-icon-follow-${this.stores_uri} i`);
    this.changeFollow(followI);
  }

  mouseleaveFollow(){
    let followI = document.querySelector(`#hover-icon-follow-${this.stores_uri} i`);
    this.changeFollow(followI);

  }
  changeFollow(followI){
    if(followI.classList.contains('d-none')==true){
      followI.classList.remove('d-none');
    }else{
      followI.classList.add('d-none');
    }
  }



}
