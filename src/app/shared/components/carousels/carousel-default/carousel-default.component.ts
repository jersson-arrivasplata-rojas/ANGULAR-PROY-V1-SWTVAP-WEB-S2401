import { Component, Input, OnInit } from '@angular/core';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
import { ResourcesUtils } from 'src/app/shared/utils/resources.utils';

@Component({
  selector: 'app-carousel-default',
  templateUrl: './carousel-default.component.html',
  styleUrls: ['./carousel-default.component.scss']
})
export class CarouselDefaultComponent implements OnInit {

  @Input() images: string[] = [
    '../../../../assets/images/photo-wide-2.jpg',
    '../../../../assets/images/photo-wide-1.jpg'
  ];
  @Input() activateText: string;
  @Input() activateIndicator: string;
  @Input() autoInterval: string='false';//else 2000

  public next: string;
  public prev: string;

  public iconosNextPrev: [string, string][] = [
    ['i-Arrow-Left-2','i-Arrow-Right-2'],
    ['i-Arrow-Left-2','i-Arrow-Right-2']
  ]
  //i-Arrow-Left-2

  constructor() {

  }

  ngOnInit(): void {
    switch (CommonUtils.getPortalId()) {
      case 1:
        this.next = ResourcesUtils.siguiente;
        this.prev = ResourcesUtils.anterior;
        break;
    }

  }

  /*getActive(index){
    if(index == 0){
      return 'active';
    }else{
      return '';
    }
  }*/
}
