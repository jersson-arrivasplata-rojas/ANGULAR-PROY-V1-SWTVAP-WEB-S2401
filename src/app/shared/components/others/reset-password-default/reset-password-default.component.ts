import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuardHttp } from 'src/app/shared/http/auth-guard.http';
import { AuthUserInterface as AuthUser } from 'src/app/shared/interfaces/auth-user.interface';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password-default',
  templateUrl: './reset-password-default.component.html',
  styleUrls: ['./reset-password-default.component.css']
})
export class ResetPasswordDefaultComponent implements OnInit, AfterViewInit {
  public APP_URL = environment.apiUrl;
  public isBrowser: boolean;
  public isServer: boolean;
  public textPassword: string='Ver';
  public textWhatsapp: string= 'Hola Sumac Chasca Perú S.A.C., me gustaría consultar lo siguiente ';
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
  constructor(@Inject(PLATFORM_ID) private platformId, private router: Router,private activatedRoute:ActivatedRoute,
   private authGuardHttp: AuthGuardHttp, private localStorageService:LocalStorageService
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
  ngAfterViewInit(){

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

    this.authGuardHttp.resetPassword(this.user)
    .subscribe(
    ( response:HttpResponse<any> ) => {

      if(response.status == 200){
        //console.log(response);

        CommonUtils.removeNodoPreload('PRELOAD-RESET-PASSWORD',this.APP_URL+'assets/images/rutas/login/snapstore.png',response.body.message,'success',false);

      }
    },
    ( response:HttpErrorResponse ) => {
      //console.log(response);
      var message = (typeof response.error.message=='undefined')?'¡Sucedio un error inesperado!':response.error.message;
      CommonUtils.removeNodoPreload('PRELOAD-RESET-PASSWORD',this.APP_URL+'assets/images/rutas/login/snapstore.png',message,'danger',true);

    },
    () =>{

    });
  }

  login(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate(['auth/login']);

  }
}
