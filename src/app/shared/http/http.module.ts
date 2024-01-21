import { NgModule } from '@angular/core';
import { AuthGuardHttp } from './auth-guard.http';
import { AuthorizationHttp } from './authorization.http';
@NgModule({
  imports: [],
  providers: [
    AuthGuardHttp,
    AuthorizationHttp
  ],
})
export class HttpModule {}
