import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
//import * as $ from 'jquery';
import { Router } from '@angular/router';
//import { User } from 'src/app/models/user.model';
//import { IResponse } from 'src/app/models/response.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthGuardHttp } from 'src/app/shared/http/auth-guard.http';
import { AuthUserInterface as AuthUser } from 'src/app/shared/interfaces/auth-user.interface';
import { CountryInterface as Country } from 'src/app/shared/interfaces/country.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-up-default',
  templateUrl: './sign-up-default.component.html',
  styleUrls: ['./sign-up-default.component.scss']
})
export class SignUpDefaultComponent implements OnInit, AfterViewInit {
  public APP_URL = environment.apiUrl;

  public isBrowser: boolean;
  public isServer: boolean;
  public textPassword: string = 'Ver';
  public textWhatsapp: string = 'Hola Sumac Chasca Perú S.A.C., me gustaría consultar lo siguiente ';
  public phoneWhatsapp: string = '51900288628';

  public typePassword: string = 'password';
  public typeRegister: string = 'Usuario';
  public typePatternDocument: string= '[0-9]{8}';
  public buttonRadioStyle: string = `
    line-height: 2;
    outline: none;
    border-style: none;
  `;

  public documents_type = ['DNI', 'RUC','C-EXTRANJERIA'];
  public allContries:Country[] = null;
  public user:AuthUser = {
    type_user: 'user',
    name: '',
    email: '',
    password: '',
    celphone: '',
    document: '00000000',
    document_type: this.documents_type[0],
    country_phone_code: '51',
    country_phone_id:0,
    country_id: 179,
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


  //signUpForm
  //users: User[];

  constructor(@Inject(PLATFORM_ID) private platformId, private router: Router, private authGuardHttp: AuthGuardHttp
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.isServer = isPlatformServer(platformId);
  }
  //Collection 'json' not found
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    if (this.isBrowser) {
      //background-repeat
      this.allContries = this.authGuardHttp.getAllContries();
     //console.log(this.allContries)
    }
  }

  passwordFocus(event: any) {
    event.preventDefault();
  }
  passwordBlur(event: any) {
    event.preventDefault();
  }

  passwordKeyUp(event: any) { // with type info
    event.preventDefault();
    CommonUtils.validatePassword(event);
  }


  showPassword(event: any) {

    event.preventDefault();
    event.stopPropagation();
    if (this.typePassword == 'password') {
      this.typePassword = 'text';
      this.textPassword = 'Ocultar';
    } else {
      this.typePassword = 'password';
      this.textPassword = 'Ver';
    }
  }

  signUp(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate(['auth/signup']);

  }

  forgotPassword(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate(['auth/forgot-password']);

  }
  //https://medium.com/karibu-blog/estructura-de-carpetas-de-angular-para-la-vida-real-1a8b78bc99b


  switchUserActive(event: any) {
    event.preventDefault();

    document.querySelector('#label-checked-store').classList.remove('active', 'opacity-8');
    document.querySelector('#label-checked-store').classList.add('opacity-8');

    document.querySelector('#label-checked-user').classList.remove('active', 'opacity-8');
    document.querySelector('#label-checked-user').classList.add('active');


    var divContent = document.querySelectorAll('.content-div-document');
    for (let index = 0; index < divContent.length; index++) {
      const element = divContent[index];
      element.classList.add('d-none');
    }


    //event.srcElement.classList.remove('active');
    this.typeRegister = 'Usuario';
    this.user.type_user='user';


    if(this.user.document_type=='DNI') this.user.document='00000000';
    else this.user.document='00000000000';


  }
  switchStoreActive(event: any) {
    event.preventDefault();

    document.querySelector('#label-checked-user').classList.remove('active', 'opacity-8');
    document.querySelector('#label-checked-user').classList.add('opacity-8');

    document.querySelector('#label-checked-store').classList.remove('active', 'opacity-8');
    document.querySelector('#label-checked-store').classList.add('active');

    var divContent = document.querySelectorAll('.content-div-document');
    for (let index = 0; index < divContent.length; index++) {
      const element = divContent[index];
      element.classList.remove('d-none');
    }


    this.typeRegister = 'Tienda';
    //public typePatternDocument: string= '[0-9]{8}';
    this.user.type_user='store';

    this.user.document = ''
  }

  selectTypeDocument(event:any){
    event.preventDefault();
    var data:string = event.target.value;
    if(data=='DNI') this.typePatternDocument = '[0-9]{8}';
    else this.typePatternDocument = '[0-9]{11}';

    this.user.document='';
  }

  login(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate(['auth/login']);

  }

  countryPhone(event:any){
    event.preventDefault();
    var data:string = event.target.value;

    let country: Country[] = this.allContries.filter( resp => resp.phone_code == data.toString());

    this.user.country_id = (country[0].id);

    let classes = document.getElementsByClassName('img-celphone');
    for(var i = 0; 0 < classes.length; i++){
      var img = classes[i] as HTMLImageElement;

      img.src=`https://flagcdn.com/48x36/${country[0].iso2.toLowerCase()}.png`;
      //img.removeAttribute('img');
      //img.setAttribute('img',`https://flagcdn.com/48x36/${country[0].iso2.toLowerCase()}.png`)
    }
  }

  onSubmit(){

    if(this.user.type_user==''||this.user.type_user==null|| typeof this.user.type_user=='undefined') return null;
    if(this.user.name==''||this.user.name==null|| typeof this.user.name=='undefined') return null;
    if(this.user.email==''||this.user.email==null|| typeof this.user.email=='undefined') return null;
    if(this.user.password==''||this.user.password==null|| typeof this.user.password=='undefined') return null;
    if(this.user.celphone==''||this.user.celphone==null|| typeof this.user.celphone=='undefined') return null;
    if(this.user.document_type==''||this.user.document_type==null|| typeof this.user.document_type=='undefined') return null;
    if(this.user.document==''||this.user.document==null|| typeof this.user.document=='undefined') return null;
    if(this.user.country_phone_code==''||this.user.country_phone_code==null|| typeof this.user.country_phone_code=='undefined') return null;
    if(isNaN(this.user.country_id) == true ||this.user.country_id==null|| typeof this.user.country_id=='undefined') return null;
    if(this.user.check_terms_conditions==true && this.user.check_politics_privacy==true){
      //preloader
      CommonUtils.insertPreload('PRELOAD-SIGNUP');

      if(this.user.type_user == 'user'){
        this.authGuardHttp.addUser(this.user)
        .subscribe(
        ( response:HttpResponse<any> ) => {

          if(response.status == 201){
            //console.log(response);

            CommonUtils.removeNodoPreload('PRELOAD-SIGNUP',this.APP_URL+'assets/images/rutas/login/snapstore.png',response.body.message,'success',false);
          }
        },
        ( response:HttpErrorResponse ) => {
         // console.log(response);
          var message = (typeof response.error.message=='undefined')?'¡Sucedio un error inesperado!':response.error.message;

          CommonUtils.removeNodoPreload('PRELOAD-SIGNUP',this.APP_URL+'assets/images/rutas/login/snapstore.png',message,'danger',true);

        },
        () =>{

        });


      }else{
        this.authGuardHttp.addStore(this.user)
        .subscribe(
        ( response:HttpResponse<any> ) => {

          if(response.status == 201){
            //console.log(response);
            CommonUtils.removeNodoPreload('PRELOAD-SIGNUP',this.APP_URL+'assets/images/rutas/login/snapstore.png',response.body.message,'success',false);
          }
        },
        ( response:HttpErrorResponse ) => {
          //console.log(response);
          var message = (typeof response.error.message=='undefined')?'¡Sucedio un error inesperado!':response.error.message;

          CommonUtils.removeNodoPreload('PRELOAD-SIGNUP',this.APP_URL+'assets/images/rutas/login/snapstore.png',message,'danger',true);

        },
        () =>{

        });


      }
    }else{
      return null;

    }
    //  console.log(this.user);
  }
}
/*
public user:User = {
    type_user: 'user',
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    celphone: '',
    document: '00000000',
    document_type: this.documents_type[0],
    country_phone_code: '51',
    country_id: 179,
    country_phone_id: 0,
    deparment_id: 0,
    province_id: 0,
    district_id: 0,
    message:'',
    error:'',
    token:'',
    provider:'',
    image: '',
    first_name: '',
    last_name: '',
    check_terms_conditions: true,
    check_politics_privacy: true,
    check_emails_snap_store: true,
    comment: '',
    reference: '',
    address: '',
    check_save_to_pay_form: false,
    check_payment_method: 0,
  };
*/
