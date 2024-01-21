
import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserInterface as AuthUser } from 'src/app/shared/interfaces/auth-user.interface';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-auth-login-default',
  templateUrl: './auth-login-default.component.html',
  styleUrls: ['./auth-login-default.component.scss']
})
export class AuthLoginDefaultComponent {
  public assetUrl = environment.assetUrl;

  public textPassword: string = 'Ver';
  public textWhatsapp: string = 'Hola Sumac Chasca Perú S.A.C., me gustaría consultar lo siguiente ';
  public phoneWhatsapp: string = '51900288628';

  public content = {

  };
  public documents_type = ['DNI', 'RUC', 'C-EXTRANJERIA'];

  public user: AuthUser = {
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
  public store_id = 0;
  public store_image = '';
  public store_name = '';
  public store_uri = '';
  social: any;

  constructor(private router: Router) {
  }

  public typePassword: string = 'password';
  public preloadId = 'PRELOAD-LOGIN';

  //543618382244-2j1c2u9gl256rkr0iba5erb3v53dpqtd.apps.googleusercontent.com

  public getImageStore() {
    return this.assetUrl + 'stores/' + this.store_id + '/profile/' + this.store_image;
  }
  passwordFocus(event: any) {
    event.preventDefault();
  }
  passwordBlur(event: any) {
    event.preventDefault();
  }

  passwordKeyUp(event: KeyboardEvent) { // with type info
    event.preventDefault();
   // Metodos.validatePassword(event);
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
  home() {
    this.router.navigate(['/']);
  }
  type: number = 1;

}
