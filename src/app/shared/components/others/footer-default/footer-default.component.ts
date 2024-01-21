import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer-default',
  templateUrl: './footer-default.component.html',
  styleUrls: ['./footer-default.component.css']
})
export class FooterDefaultComponent implements OnInit {

  constructor() { }
  public APP_URL =  environment.apiUrl;
  public textWhatsapp: string = 'Hola Sumac Chasca Perú S.A.C., me gustaría consultar lo siguiente ';
  public phoneWhatsapp: string = '51900288628';
  ngOnInit(): void {
  }

}
