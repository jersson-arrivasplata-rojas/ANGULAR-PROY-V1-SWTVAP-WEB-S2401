import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-store-default',
  templateUrl: './footer-store-default.component.html',
  styleUrls: ['./footer-store-default.component.css']
})
export class FooterStoreDefaultComponent implements OnInit {
  @Input() public textWhatsapp: string = '';
  @Input() public phoneWhatsapp: string = '';
  @Input() public image: string = '';
  @Input() public container: string = 'container';

  @Input() public store: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
