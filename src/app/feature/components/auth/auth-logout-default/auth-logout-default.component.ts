
import { Component, } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-auth-logout-default',
  templateUrl: './auth-logout-default.component.html',
  styleUrls: ['./auth-logout-default.component.scss']
})
export class AuthLogoutDefaultComponent {
  public assetUrl = environment.assetUrl;
  public title = 'Sumac Chasca Perú S.A.C.' ;

}
