import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttp } from 'src/app/shared/http/auth.http';
import { LocalService } from 'src/app/shared/services/local.service';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'swtvap-auth-login-default',
  templateUrl: './auth-login-default.component.html',
  styleUrls: ['./auth-login-default.component.scss'],
})
export class AuthLoginDefaultComponent {
  public assetUrl = environment.assetUrl;
  public appUrl = environment.appUrl;

  public title = 'Sumac Chasca Per\u00FA S.A.C.';
  public textPassword: string = 'Ver';

  public user = {
    username: '',
    password: '',
  };

  constructor(
    private router: Router,
    private authHttp: AuthHttp,
    private localService: LocalService
  ) {}

  public typePassword: string = 'password';

  passwordFocus(event: any) {
    event.preventDefault();
  }
  passwordBlur(event: any) {
    event.preventDefault();
  }

  passwordKeyUp(event: KeyboardEvent) {
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

  submit() {
    this.authHttp.login(this.user).subscribe({
      next: (response) => {
        // manejar la respuesta aqu\u00ED
        this.localService.saveData('auth', JSON.stringify(response));
        this.router.navigate(['/admin/dashboard/home']);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        // cualquier l\u00F3gica que necesites ejecutar cuando el Observable se complete
      },
    });
  }
}
