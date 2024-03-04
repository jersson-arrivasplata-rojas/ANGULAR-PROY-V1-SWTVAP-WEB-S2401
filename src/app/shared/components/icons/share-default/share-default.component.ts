import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'swtvap-share-default',
  templateUrl: './share-default.component.html',
  styleUrls: ['./share-default.component.css']
})
export class ShareDefaultComponent implements OnInit {
  @Input() link;
  @Input() content_id;
  constructor() { }

  ngOnInit(): void {
  }

}
