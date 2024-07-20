import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'swtvap-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() title: string = 'Cargando...';
  @Input() public image: string = environment.appUrl + '/assets/img/bg-xsm.png';

}
