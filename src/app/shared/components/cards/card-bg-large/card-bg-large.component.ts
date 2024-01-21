import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-bg-large',
  templateUrl: './card-bg-large.component.html',
  styleUrls: ['./card-bg-large.component.scss']
})
export class CardBgLargeComponent implements OnInit {
  @Input() titulo: string;
  @Input() subtitulo: string;
  @Input() tipo: string = 'white';
  @Input() url: string;
  @Input() claseprincipal: string;
  @Input() contenidoFooter: string;



  constructor() { }

  ngOnInit(): void {
  }

}
