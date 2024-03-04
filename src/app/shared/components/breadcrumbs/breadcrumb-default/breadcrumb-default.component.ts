import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'swtvap-breadcrumb-default',
  templateUrl: './breadcrumb-default.component.html',
  styleUrls: ['./breadcrumb-default.component.scss']
})
export class BreadcrumbDefaultComponent implements OnInit {
  @Input() title: string; // = ''
  @Input() subtitle: string; // = ''
  @Input() description: string='Version 0.2'; // = ''
  @Input() url: string=''; // = ''


  constructor() { }

  ngOnInit(): void {
  }

}
