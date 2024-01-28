import { NgModule } from '@angular/core';
import { AuthGuardHttp } from './auth-guard.http';
import { AuthHttp } from './auth.http';
import { AuthorizationHttp } from './authorization.http';
@NgModule({
  imports: [],
  providers: [
    AuthGuardHttp,
    AuthorizationHttp,
    AuthHttp
  ],
})
export class HttpModule {}
