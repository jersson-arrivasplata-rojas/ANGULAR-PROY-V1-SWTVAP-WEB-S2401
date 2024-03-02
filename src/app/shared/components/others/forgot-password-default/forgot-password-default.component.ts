import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserInterface as AuthUser } from 'src/app/shared/interfaces/auth-user.interface';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
import { environment } from 'src/environments/environment';
//import * as $ from 'jquery';

@Component({
  selector: 'app-forgot-password-default',
  templateUrl: './forgot-password-default.component.html',
  styleUrls: ['./forgot-password-default.component.scss']
})
export class ForgotPasswordDefaultComponent implements OnInit, AfterViewInit {
  public APP_URL = environment.apiUrl;

  public isBrowser: boolean;
  public isServer: boolean;
  public textWhatsapp: string= 'Hola Sumac Chasca Per\u00FA S.A.C., me gustar\u00EDa consultar lo siguiente ';
  public phoneWhatsapp: string= '51900288628';
  public content = {

  };
  public user:AuthUser = {
    type_user: '',
    name: '',
    email: '',
    password: '',
    celphone: '',
    document: '',
    document_type: '',
    country_phone_code: '',
    country_phone_id: 0,
    country_id: 0,
    message:'',
    error:'',
    check_terms_conditions: true,
    check_politics_privacy: true,
    check_emails_snap_store: true,
    token:'',
    password_confirmation:'',
    provider:'',
    image: '',
    first_name: '',
    last_name: ''
  };
  //@ViewChild('fbLoginButton', { static: true }) fbLoginButton: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId, private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.isServer = isPlatformServer(platformId);
  }



  ngOnInit(): void {
  }
  ngAfterViewInit(){

  }


   login(event:any){
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate(['auth/login']);

   }
   signUp(event:any){
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate(['auth/signup']);

   }

   onSubmit(){

    if(this.user.email==''||this.user.email==null|| typeof this.user.email=='undefined') return null;

    //preloader
    CommonUtils.insertPreload('PRELOAD-FORGOT-PASSWORD');

  }
}
//user/password/reset
