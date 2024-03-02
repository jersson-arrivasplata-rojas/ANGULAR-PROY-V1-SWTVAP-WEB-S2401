import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { AfterViewInit, Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
//import { LocalStorageService } from 'src/app/services/local-storage.service';
//import * as $ from 'jquery';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from "angularx-social-login";
import { AuthUserInterface as AuthUser } from 'src/app/shared/interfaces/auth-user.interface';
import { CountryInterface as Country } from 'src/app/shared/interfaces/country.interface';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
import { environment } from 'src/environments/environment';

//https://medium.com/@izzatnadiri/how-to-pass-data-to-and-receive-from-ng-bootstrap-modals-916f2ad5d66e
@Component({
  selector: 'ngbd-modal-stacked',
  templateUrl: './modal-stacked.html'
})

export class NgbdModal2Content implements OnInit {
  public APP_URL = environment.apiUrl;

  public documents_type = ['DNI', 'RUC', 'C-EXTRANJERIA'];

  @Input() public social: AuthUser

  public preloadId = 'PRELOAD-SIGNOAUTH';
  public allContries: Country[] = null;
  public typeRegister: string = 'Usuario';
  public typePatternDocument: string = '[0-9]{8}';
  public buttonRadioStyle: string = `
    line-height: 2;
    outline: none;
    border-style: none;
  `;

  constructor(public activeModal: NgbActiveModal, private localStorageService: LocalStorageService, private router: Router) {
    this.allContries = [];
  }
  ngOnInit(): void {
    //console.log(this.social);

  }

  onSubmit() {

    if(this.social.type_user==''||this.social.type_user==null|| typeof this.social.type_user=='undefined') return null;
    if(this.social.name==''||this.social.name==null|| typeof this.social.name=='undefined') return null;
    if(this.social.email==''||this.social.email==null|| typeof this.social.email=='undefined') return null;
    if(this.social.password==''||this.social.password==null|| typeof this.social.password=='undefined') return null;
    if(this.social.celphone==''||this.social.celphone==null|| typeof this.social.celphone=='undefined') return null;
    if(this.social.document_type==''||this.social.document_type==null|| typeof this.social.document_type=='undefined') return null;
    if(this.social.document==''||this.social.document==null|| typeof this.social.document=='undefined') return null;
    if(this.social.country_phone_code==''||this.social.country_phone_code==null|| typeof this.social.country_phone_code=='undefined') return null;
    if(isNaN(this.social.country_id) == true ||this.social.country_id==null|| typeof this.social.country_id=='undefined') return null;
    if(this.social.check_terms_conditions==true && this.social.check_politics_privacy==true){
      CommonUtils.insertPreload(this.preloadId);

    }else{
      return null;
    }


  }
  loginOauth() {
    this.activeModal.dismiss('Cross click');


  }

  countryPhone(event: any) {
    event.preventDefault();
    var data: string = event.target.value;

    let country: Country[] = this.allContries.filter(resp => resp.phone_code == data.toString());

    this.social.country_id = (country[0].id);

    let classes = document.getElementsByClassName('img-celphone-modal');
    for (var i = 0; 0 < classes.length; i++) {
      var img = classes[i] as HTMLImageElement;

      img.src = `https://flagcdn.com/48x36/${country[0].iso2.toLowerCase()}.png`;
      //img.removeAttribute('img');
      //img.setAttribute('img',`https://flagcdn.com/48x36/${country[0].iso2.toLowerCase()}.png`)
    }
  }

  switchUserActive(event: any) {
    event.preventDefault();

    document.querySelector('#label-checked-store-modal').classList.remove('active', 'opacity-8');
    document.querySelector('#label-checked-store-modal').classList.add('opacity-8');

    document.querySelector('#label-checked-user-modal').classList.remove('active', 'opacity-8');
    document.querySelector('#label-checked-user-modal').classList.add('active');


    var divContent = document.querySelectorAll('.content-div-document-modal');
    for (let index = 0; index < divContent.length; index++) {
      const element = divContent[index];
      element.classList.add('d-none');
    }


    //event.srcElement.classList.remove('active');
    this.typeRegister = 'Usuario';
    this.social.type_user = 'user';


    if (this.social.document_type == 'DNI') this.social.document = '00000000';
    else this.social.document = '00000000000';


  }
  switchStoreActive(event: any) {
    event.preventDefault();

    document.querySelector('#label-checked-user-modal').classList.remove('active', 'opacity-8');
    document.querySelector('#label-checked-user-modal').classList.add('opacity-8');

    document.querySelector('#label-checked-store-modal').classList.remove('active', 'opacity-8');
    document.querySelector('#label-checked-store-modal').classList.add('active');

    var divContent = document.querySelectorAll('.content-div-document-modal');
    for (let index = 0; index < divContent.length; index++) {
      const element = divContent[index];
      element.classList.remove('d-none');
    }


    this.typeRegister = 'Tienda';
    //public typePatternDocument: string= '[0-9]{8}';
    this.social.type_user = 'store';

    this.social.document = ''
  }

  selectTypeDocument(event: any) {
    event.preventDefault();
    var data: string = event.target.value;
    if (data == 'DNI') this.typePatternDocument = '[0-9]{8}';
    else this.typePatternDocument = '[0-9]{11}';

    this.social.document = '';
  }

}


@Component({
  selector: 'app-login-default',
  templateUrl: './login-default.component.html',
  styleUrls: ['./login-default.component.scss']
})
export class LoginDefaultComponent implements OnInit, AfterViewInit {
  public APP_URL = environment.apiUrl;

  public isBrowser: boolean;
  public isServer: boolean;
  public textPassword: string = 'Ver';
  public textWhatsapp: string = 'Hola Sumac Chasca Per\u00FA S.A.C., me gustar\u00EDa consultar lo siguiente ';
  public phoneWhatsapp: string = '51900288628';

  public content = {

  };
  public documents_type = ['DNI', 'RUC', 'C-EXTRANJERIA'];

  public social:AuthUser = {
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
    message: '',
    error: '',
    check_terms_conditions: true,
    check_politics_privacy: true,
    check_emails_snap_store: true,
    token: '',
    password_confirmation: '',
    provider: '',//FACEBOOK,EMAIL,GOOGLE
    image: '',
    first_name: '',
    last_name: ''
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
    country_phone_id:0,
    country_id: 0,
    message: '',
    error: '',
    check_terms_conditions: true,
    check_politics_privacy: true,
    check_emails_snap_store: true,
    token: '',
    password_confirmation: '',
    provider: '',
    image: '',
    first_name: '',
    last_name: ''
  };
  //
  constructor(@Inject(PLATFORM_ID) private platformId, private router: Router, private socialAuthService: SocialAuthService, private localStorageService: LocalStorageService, private modalService: NgbModal
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.isServer = isPlatformServer(platformId);
  }

  public typePassword: string = 'password';
  public preloadId = 'PRELOAD-LOGIN';

  //543618382244-2j1c2u9gl256rkr0iba5erb3v53dpqtd.apps.googleusercontent.com

  ngOnInit(): void {
    //this.offSetHeight()
    if (this.isBrowser) {

    }
  }
  ngAfterViewInit() {

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

  home() {
    this.router.navigate(['/']);
  }
  /*@HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(event.target.innerWidth)
    //background-repeat
    this.offSetHeight()
  }*/

  onSubmit() {

    if (this.user.email == '' || this.user.email == null || typeof this.user.email == 'undefined') return null;
    if (this.user.password == '' || this.user.password == null || typeof this.user.password == 'undefined') return null;

    //preloader
    CommonUtils.insertPreload(this.preloadId);
    let stores_uri='';
  }



  setSocialSignIn(socialUser: SocialUser) {
    this.social.type_user = 'user';
    this.social.name = socialUser.name;
    this.social.email = socialUser.email;
    this.social.password = socialUser.id;
    this.social.celphone = '';
    this.social.country_phone_code = '51';
    this.social.country_id = 179;
    this.social.document = '00000000';

    this.social.document_type = this.documents_type[0];
    this.social.message = '';
    this.social.error = '';
    this.social.check_terms_conditions = true;
    this.social.check_politics_privacy = true;
    this.social.check_emails_snap_store = true;
    this.social.token = '';
    this.social.password_confirmation = socialUser.id;
    this.social.provider = socialUser.provider;//FACEBOOK,EMAIL,GOOGLE
    this.social.image = socialUser.photoUrl;
    //social.first_name=socialUser.firstName;
    //social.last_name=socialUser.lastName;
  }
  signInWithGoogle(): void {
    /* */
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((response: SocialUser) => {

      this.setSocialSignIn(response);
      //console.log(response);
      this.loginOauth()

      /*const modalRef = this.modalService.open(NgbdModal2Content, {
        size: 'lg'
      });
      modalRef.componentInstance.social = this.social;*/

    },
      (response) => {
        //console.log(response);

      });


  }


  //https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((response: SocialUser) => {
      this.setSocialSignIn(response);
      //console.log(response);
      this.loginOauth();
    },
      (response) => {
        //console.log(response);

      });;
  }
  loginOauth() {
    let socialPreloadId = 'PRELOAD-SIGNOAUTHGLOBAL';

    CommonUtils.insertPreloadRemoveHidden(socialPreloadId);
    let stores_uri='';

  }
  signOut(): void {
    this.socialAuthService.signOut();
  }
}




/*

*/
