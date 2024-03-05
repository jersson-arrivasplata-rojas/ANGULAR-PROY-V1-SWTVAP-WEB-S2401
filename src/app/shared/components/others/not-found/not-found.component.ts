import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'swtvap-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  @Input() status: string = '404';
  @Input() title: string = 'Error!';
  @Input() message: string = '¡Lo siento! La p\u00E1gina que buscaba no existe.';
  @Input() color: string = 'primary';
  @Input() buttonColor: string = 'primary';
  @Input() buttonText: string = 'Regresar';

  constructor(private location: Location) { }

  back(){
    this.location.back();
  }
}
