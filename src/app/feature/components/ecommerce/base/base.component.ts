import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeEnum } from 'src/app/shared/config/home.enum';
import { WParameterHttp } from 'src/app/shared/http/w-parameters.http';
import { ParameterInterface } from 'src/app/shared/interfaces/parameter.interface';

@Component({
  selector: 'swtvap-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
  parameters: ParameterInterface;
  footer: ParameterInterface;
  lang: string = 'es';
  constructor(private wParameterHttp: WParameterHttp, private router: Router) { }

  ngOnInit() {
    this.wParameterHttp.getWParametersByCode('STORE').subscribe((response: any) => {
      this.parameters = response;
      this.footer = this.parameters.children.find(item => item.code === HomeEnum.FOOTER);
    });
  }

  cart($event) {
    this.router.navigate(['/cart']);
  }
}
