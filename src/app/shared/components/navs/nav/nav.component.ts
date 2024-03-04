import { Component, EventEmitter, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'swtvap-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  public assetUrl = environment.assetUrl;

  @Output() onCart: EventEmitter<any> = new EventEmitter();



  cart(){
    this.onCart.emit();
  }
}
