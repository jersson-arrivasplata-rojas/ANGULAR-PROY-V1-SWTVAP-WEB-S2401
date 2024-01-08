import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './feature/components/base/base.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    canActivate: [],
    children: [
      {
        path: '',
        loadChildren: () => import('./feature/feature.module').then(x => x.FeatureModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppRoutingModule { }