import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HomeEnum } from '../config/home.enum';
import { WParameterHttp } from '../http/w-parameters.http';
import { ParameterInterface } from '../interfaces/parameter.interface';
import { LocalService } from '../services/local.service';

@Injectable()
export class EcommerceResolve implements Resolve<Observable<any>> {
  lang: string = 'es';

  parameters: ParameterInterface[];
  footer: ParameterInterface[];
  profile: ParameterInterface[];
  currency: ParameterInterface[];
  carrousel: ParameterInterface[];
  proposal: ParameterInterface[];
  notFound: ParameterInterface[];

  constructor(private wParameterHttp: WParameterHttp, private localService: LocalService) { }

  resolve(): Observable<any> {
    return this.wParameterHttp.getWParametersByCode('STORE,CURRENCY')
      .pipe(map((data: any) => {
        this.parameters = data;
        this.footer = this.parameters.map(x => x.children.find(item => item.code === HomeEnum.FOOTER));
        this.profile = this.parameters.map(x => x.children.find(item => item.code === HomeEnum.PROFILE));
        this.currency = this.parameters.filter(x => x.code === HomeEnum.CURRENCY);
        this.carrousel = this.parameters.map(x => x.children.find(item => item.code === HomeEnum.CARROUSEL));
        this.proposal = this.parameters.map(x => x.children.find(item => item.code === HomeEnum.PROPOSAL));
        this.notFound = this.parameters.map(x => x.children.find(item => item.code === HomeEnum.NOT_FOUND));
        this.lang = this.localService.getData('lang') || 'es';//coalescencia nula
        return {
          ...{ footer: this.footer },
          ...{ profile: this.profile },
          ...{ currency: this.currency },
          ...{ carrousel: this.carrousel },
          ...{ proposal: this.proposal },
          ...{ notFound: this.notFound },
          ...{ lang: this.lang }
        };
      }), catchError((err) => {
        return throwError(() => err);
      }));
  }
}
