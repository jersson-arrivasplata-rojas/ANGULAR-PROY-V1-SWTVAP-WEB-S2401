import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'swtvap-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss']
})
export class SidebarLeftComponent implements OnInit {
  @Input() sidebarLeft: {
      name: string;
      icon: string;
      url: string;
      activate: boolean;
      drop: boolean;
  }[];

  /*public name: string;
  public icon: string;
  public activate: boolean;
  @Input() url: string;*/
  //

  @Output() event: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  public changeUrlIFrame(url: string): void {
    this.event.emit(url);
  }
}
/*

*/

