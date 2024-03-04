import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
//import * as $ from 'jquery';

@Component({
  selector: 'swtvap-success-password-recover-default',
  templateUrl: './success-password-recover-default.component.html',
  styleUrls: ['./success-password-recover-default.component.scss']
})
export class SuccessPasswordRecoverDefaultComponent implements OnInit, AfterViewInit {
  public isBrowser: boolean;
  public isServer: boolean;
  public textWhatsapp: string= 'Hola Sumac Chasca Per\u00FA S.A.C., me gustar\u00EDa consultar lo siguiente ';
  public phoneWhatsapp: string= '51900288628';
  public content = {

  };
  //@ViewChild('fbLoginButton', { static: true }) fbLoginButton: ElementRef;
  //user/password/reset
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
}

