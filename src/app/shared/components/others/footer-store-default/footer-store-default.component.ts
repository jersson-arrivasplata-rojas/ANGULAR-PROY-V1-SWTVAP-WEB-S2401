import { Component, Input } from '@angular/core';

@Component({
  selector: 'swtvap-footer-store-default',
  templateUrl: './footer-store-default.component.html',
  styleUrls: ['./footer-store-default.component.css']
})
export class FooterStoreDefaultComponent {
  @Input() public textWhatsapp: string = '';
  @Input() public phoneWhatsapp: string = '';
  @Input() public image: string = 'https://via.placeholder.com/100x100';
  @Input() public container: string = 'container';

  @Input() public store: string = 'Sumac Chasca Per\u00FA S.A.C.';

}
