import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuardHttp } from 'src/app/shared/http/auth-guard.http';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'app-top-bar-default',
  templateUrl: './top-bar-default.component.html',
  styleUrls: ['./top-bar-default.component.css']
})
export class TopBarDefaultComponent implements OnInit {
  @Input() theme_color_primary;
  @Input() type:number=0;
  @Input() dropDownType:number=0;
  @Input() stores_image;


  @Input() stores_id;
  @Input() stores_name;

  @Input() stores_celphone;
  @Input() stores_email;
  @Input() stores_whatsapp;
  @Input() stores_facebook;
  @Input() stores_instagram;


  @Input() stores_uri;

  @Input() price=0;
  @Input() url='';

  @Input() hide_cart=false;

  //@ViewChild('pop') pop:NgbPopover;
  public store_active=true;
  public style_bell={
    /*position: 'absolute',
    right: '12.5rem'*/
  };

  public textWhatsapp=''
  public phoneWhatsapp=''
  disabled = true;
  public dropdown_active = false;
  constructor(private authGuardHttp:AuthGuardHttp, private localStorageService:LocalStorageService,
    private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.hide_cart==true){
      /*this.style_bell={
        position: 'absolute',
        right: '9.5rem'
      };*/
    }
    this.textWhatsapp=CommonUtils.textWhatsapp
    this.phoneWhatsapp=CommonUtils.phoneWhatsapp

  }
  isOpen(popover) {
    if (this.disabled) {
      popover.open();
    }
    return this.disabled;
  }
  goBackLeft(event){
    this.router.navigate(['/']);
  }
  goBackLeftStore(event){
    this.router.navigate([this.stores_uri]);
  }
  goBackLeftCartStore(event){
    this.router.navigate([this.stores_uri,'carrito']);
  }
  addCart(){

    this.router.navigate([this.stores_uri,'carrito']);

  }

  rightBell(){
    //"12.5rem":hide_cart==true
  }

  dropdown(element){
    this.dropdown_active = !this.dropdown_active;//'drop-down--active'
  }
  //position: absolute; right: 12.5rem;
  logout(){
    this.authGuardHttp.signOut();
    this.router.navigate(['/'+this.stores_uri]);
  }


  login(){
    this.router.navigate(['/auth/login'], { queryParams: { store: this.stores_id, qim:this.stores_image,qn:this.stores_name,uri:this.stores_uri } });
  }
  register(){
    this.router.navigate(['/auth/signup'], { queryParams: { store: this.stores_id, qim:this.stores_image,qn:this.stores_name,uri:this.stores_uri } });
  }
 /* getType(){
    let stores_uri = this.localStorageService.getItem('stores_uri');
    if(stores_uri==''||stores_uri==null||typeof stores_uri=='undefined'){
      return 1;
    }
    return 0;
  }*/

  getClassHeaderTop(){
    if(this.dropDownType==0||this.dropDownType==2){
      return 'header-top-authenticate'
    }/*else if(this.dropDownType==1){
      return 'header-top-no-authenticate'
    }*/
    return 'header-top-no-authenticate';
  }
}
