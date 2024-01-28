import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthLoginDefaultComponent } from './auth-login-default/auth-login-default.component';
import { AuthLogoutDefaultComponent } from './auth-logout-default/auth-logout-default.component';

const routes: Routes = [
  {
    path: 'login',

    canActivate: [AuthGuard],
    component: AuthLoginDefaultComponent,
  },
  {
    path: 'logout',

    canActivate: [AuthGuard],
    component: AuthLogoutDefaultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthRoutingModule {}
