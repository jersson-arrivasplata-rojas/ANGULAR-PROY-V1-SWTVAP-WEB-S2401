import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUserInterface as AuthUser } from 'src/app/shared/interfaces/auth-user.interface';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'swtvap-reset-password-default',
  templateUrl: './reset-password-default.component.html',
  styleUrls: ['./reset-password-default.component.css']
})
export class ResetPasswordDefaultComponent implements OnInit {
  public APP_URL = environment.apiUrl;
  public isBrowser: boolean;
  public isServer: boolean;
  public textPassword: string='Ver';
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
    token:'',
    error:'',
    check_terms_conditions: true,
    check_politics_privacy: true,
    check_emails_snap_store: true,
    password_confirmation:'',
    provider:'',
    image: '',
    first_name: '',
    last_name: ''
  };

  token:string;
  email:string;
  //
  constructor(@Inject(PLATFORM_ID) private platformId, private router: Router,private activatedRoute:ActivatedRoute, private localStorageService:LocalStorageService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.isServer = isPlatformServer(platformId);
  }

  public typePassword: string = 'password';
  public typeRegister: string='Usuario';

  //543618382244-2j1c2u9gl256rkr0iba5erb3v53dpqtd.apps.googleusercontent.com

  ngOnInit(): void {
    //this.offSetHeight()
    if (this.isBrowser) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      if(urlParams.has('email')==true){
        this.email = urlParams.get('email')
        this.user.email = this.email;
      }
      //this.token=this.activatedRoute.snapshot.paramMap.get("token");
      this.activatedRoute.paramMap.subscribe(params => {
          this.token = params.get('token');
          this.user.token= this.token;
      });
    }
  }

  passwordFocus(event: any){
    event.preventDefault();
  }
  passwordBlur(event: any){
    event.preventDefault();
  }

  passwordKeyUp(event: any) { // with type info
    event.preventDefault();
    CommonUtils.validatePassword(event);
  }

   showPassword(event:any){

    event.preventDefault();
    event.stopPropagation();
    if(this.typePassword == 'password'){
      this.typePassword = 'text';
      this.textPassword = 'Ocultar';
    }else{
      this.typePassword = 'password';
      this.textPassword = 'Ver';
    }
   }


   //https://medium.com/karibu-blog/estructura-de-carpetas-de-angular-para-la-vida-real-1a8b78bc99b

   home(){
    this.router.navigate(['/']);
   }
  /*@HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(event.target.innerWidth)
    //background-repeat
    this.offSetHeight()
  }*/

  onSubmit(){

    if(this.user.email==''||this.user.email==null|| typeof this.user.email=='undefined') return null;
    if(this.user.password==''||this.user.password==null|| typeof this.user.password=='undefined') return null;
    if(this.user.token==''||this.user.token==null|| typeof this.user.token=='undefined') return null;

    this.user.password_confirmation=this.user.password;
    //preloader
    CommonUtils.insertPreload('PRELOAD-RESET-PASSWORD');

  }

  login(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate(['auth/login']);

  }
}
