import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'swtvap-base',
  templateUrl: './base.component.html',
  styleUrls: [
    './base.component.scss'
  ],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class BaseComponent {

  constructor() { }

}
