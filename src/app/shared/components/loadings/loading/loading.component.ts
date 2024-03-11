import { Component, Input } from '@angular/core';

@Component({
  selector: 'swtvap-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() title: string = 'Cargando...';

}
