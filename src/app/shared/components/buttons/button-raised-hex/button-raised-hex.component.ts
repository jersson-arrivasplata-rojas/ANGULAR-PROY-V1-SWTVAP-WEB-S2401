import { Component, Input, OnInit } from '@angular/core';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'app-button-raised-hex',
  templateUrl: './button-raised-hex.component.html',
  styleUrls: ['./button-raised-hex.component.scss']
})
export class ButtonRaisedHexComponent implements OnInit {
  @Input() title: string = '';
  @Input() icono: string = 'i-Gear-2';
  @Input() claseButton: string = '';
  @Input() claseI: string ;
  @Input() background: string;
  @Input() color: string = '#fff';
  public claseBtn: string;

  constructor() { }

  ngOnInit(): void {
    this.pushStyle()
  }
  // https://css-tricks.com/converting-color-spaces-in-javascript/
  pushStyle() {
    let claseBtn: string = CommonUtils.claseAletaria;
    let cssStyle: string = `
      .btn-raised.btn-raised-${claseBtn} {
        background: ${this.background};
        box-shadow: 0 4px 6px rgb(${CommonUtils.hexToRgbT(this.background).array[0]},${CommonUtils.hexToRgbT(this.background).array[1]},${CommonUtils.hexToRgbT(this.background).array[2]},0.11 ), 0 1px 3px rgb(${CommonUtils.hexToRgbT(this.background).array[0]},${CommonUtils.hexToRgbT(this.background).array[1]},${CommonUtils.hexToRgbT(this.background).array[2]},0.08 );
      }
    `;
    // this.hexToRGB(this.background, 0.5) ${this.hexToRgbT(this.background).string}
    this.claseBtn = `btn-raised-${claseBtn}`;
    CommonUtils.addStyleBody(cssStyle);
    //cssStyle
  }

}
