import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginDefaultComponent } from './auth-login-default/auth-login-default.component';

const routes: Routes = [
  { path: 'login', component: AuthLoginDefaultComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthRoutingModule { }
