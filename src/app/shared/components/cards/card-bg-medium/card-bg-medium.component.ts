import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-bg-medium',
  templateUrl: './card-bg-medium.component.html',
  styleUrls: ['./card-bg-medium.component.scss']
})
export class CardBgMediumComponent implements OnInit {
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
