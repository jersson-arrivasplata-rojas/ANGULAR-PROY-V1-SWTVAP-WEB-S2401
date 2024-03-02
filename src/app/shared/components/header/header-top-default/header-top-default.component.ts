import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header-top-default',
  templateUrl: './header-top-default.component.html',
  styleUrls: ['./header-top-default.component.css']
})
export class HeaderTopDefaultComponent implements OnInit {
  public APP_URL = environment.apiUrl;
  public APP_FACEBOOK_LINK = 'https://www.facebook.com/SnapStore-107155914352227';
  public APP_FACEBOOK_GROUP_LINK = 'https://www.facebook.com/groups/534116717470019';
  public APP_INSTAGRAM_LINK = 'https://www.instagram.com/snapstoreperu/?igshid=wzwovu8dh7po';
  public APP_WEB_LINK = 'https://www.snapstore.pe/';
  public APP_DEVINNOVA_LINK = 'https://devinnovaperu.com/';
  public menu_class='mdi mdi-menu';
  public dropdown_active = false;
  public store_active=true;
  public textWhatsapp=''
  public phoneWhatsapp=''
  @Input() type:number=1;

  constructor(
     private router:Router,
     private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.textWhatsapp=CommonUtils.textWhatsapp
    this.phoneWhatsapp=CommonUtils.phoneWhatsapp
  }
  openDropDownMenu(){
    if(window.innerWidth<=767){
      var content:HTMLElement = document.getElementById('content-mobile-header');
      if(content.hasAttribute('hidden')){
        content.removeAttribute('hidden');
        this.menu_class='mdi mdi-close';
      }else{
        content.setAttribute('hidden','hidden');
        this.menu_class='mdi mdi-menu';
      }
    }

  }
  dropdown(element){

    this.dropdown_active = !this.dropdown_active;//'drop-down--active'
  }
  logout(){
    this.router.navigate(['/']);
  }

  goAdmin(){
    let stores_uri = this.localStorageService.getItem('stores_uri');
    if (stores_uri != null && typeof stores_uri != undefined) {
      this.router.navigateByUrl('../'+stores_uri+'/dashboard/inicio');
    }else{
      this.router.navigate(['/auth/login'])
    }
  }

  get storeUri(){
    return this.localStorageService.getItem('stores_uri')
  }
}
