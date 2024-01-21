import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationHttp } from 'src/app/shared/http/authorization.http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header-default-example',
  templateUrl: './header-default-example.component.html',
  styleUrls: ['./header-default-example.component.css']
})
export class HeaderDefaultExampleComponent implements OnInit {

  public APP_URL = environment.apiUrl;

  @Input() theme_color_primary;
  @Input() stores_uri;
  @Input() stores_image_url;
  @Input() stores_name;
  @Input() store_address_google_maps;
  @Input() stores_address;
  @Input() today:{
    day:string,
    time_start:string,
    time_end:string,
    response:number
  };
  @Input() hours;
  @Input() stores_description;
  @Input() stores_nickname;
  @Input() stores_celphone;
  @Input() stores_email;
  @Input() stores_whatsapp;
  @Input() stores_facebook;
  @Input() stores_instagram;

  @Input() stores_collect;
  @Input() stores_delivery;
  @Input() stores_coverage;

  constructor(private router: Router,private authorizationHttp: AuthorizationHttp) { }

  ngOnInit(): void {
  }


}
