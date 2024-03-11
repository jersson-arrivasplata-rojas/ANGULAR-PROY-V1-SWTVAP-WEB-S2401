import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HomeEnum } from '../config/home.enum';
import { WParameterHttp } from '../http/w-parameters.http';
import { ParameterInterface } from '../interfaces/parameter.interface';

@Injectable()
export class EcommerceResolve implements Resolve<Observable<any>> {

  parameters: ParameterInterface[];
  profile: ParameterInterface[];
  carrousel: ParameterInterface[];

  constructor(private wParameterHttp: WParameterHttp) { }

  resolve(): Observable<any> {
    return this.wParameterHttp.getWParametersByCode('STORE')
      .pipe(map((data: any) => {
        this.parameters = data;
        this.profile = this.parameters.map(x => x.children.find(item => item.code === HomeEnum.PROFILE));
        this.carrousel = this.parameters.map(x => x.children.find(item => item.code === HomeEnum.CARROUSEL));
        return {
          ...{ profile: this.profile },
          ...{ carrousel: this.carrousel },
        };
      }), catchError((err) => {
        return throwError(() => err);
      }));
  }
}
