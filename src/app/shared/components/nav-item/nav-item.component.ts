import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit {
  @Input() name: string;
  @Input() icon: string;
  @Input() activate: boolean;
  @Input() url: string;
  @Input() drop: boolean;



  @Output() event: EventEmitter<string> = new EventEmitter<string>();
  constructor(private router: Router, private location: Location) { }

  ngOnInit(): void {
  }
  public changeUrlIFrame(url: string): void {
    //console.log(url)
    this.event.emit(url);
  }

}
//https://valor-software.com/ngx-bootstrap/#/pagination
