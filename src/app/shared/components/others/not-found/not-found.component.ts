import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  @Input() status: string = '404';
  @Input() title: string = 'Error!';
  @Input() message: string = '¡Lo siento! La página que buscaba no existe.';
  @Input() color: string = 'primary';
  @Input() buttonColor: string = 'primary';
  @Input() buttonText: string = 'Regresar';

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  back(){
    this.location.back();
  }
}
