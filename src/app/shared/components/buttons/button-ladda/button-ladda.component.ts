import { Component, Input, OnInit } from '@angular/core';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'app-button-ladda',
  templateUrl: './button-ladda.component.html',
  styleUrls: ['./button-ladda.component.scss']
})
export class ButtonLaddaComponent implements OnInit {
  @Input() color: string ;
  @Input() title: string ;
  @Input() icono: string;
  @Input() claseButton: string;
  @Input() claseI: string;

  public arrayToEndBody: string[] = [
    '../../../../assets/js/vendor/spin.min.js',
    '../../../../assets/js/vendor/ladda.js',
    '../../../../assets/js/ladda.script.js'
  ];
  public arrayToEndHead: string[] = [
    '../../../../assets/css/vendor/ladda-themeless.min.css'
  ];
  constructor() { }

  ngOnInit(): void {
    CommonUtils.addJSFilesToEndBody(this.arrayToEndBody);
    CommonUtils.addCssFilesToEndHead(this.arrayToEndHead);
  }

}
//file:///C:/My%20Web%20Sites/02/demos.ui-lib.com/gull/html/layout1/widget-statistics.html
