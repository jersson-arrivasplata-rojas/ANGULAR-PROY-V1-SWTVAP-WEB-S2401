import { Component, Input, OnInit } from '@angular/core';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'swtvap-button-default-hex',
  templateUrl: './button-default-hex.component.html',
  styleUrls: ['./button-default-hex.component.scss']
})
export class ButtonDefaultHexComponent implements OnInit {
  @Input() title: string = '';
  @Input() icono: string = 'i-Gear-2';
  @Input() claseButton: string = '';
  @Input() claseI: string ;
  @Input() background: string;
  @Input() color: string = '#fff';
  public claseBtn: string;

  public classButton: string[] = ['btn-rounded', 'btn-sm', 'btn-lg', 'btn-icon','round', 'rounded-circle', 'btn-block '];

  constructor() { }

  ngOnInit(): void {
    this.pushStyle()
  }
  // https://css-tricks.com/converting-color-spaces-in-javascript/
  pushStyle() {

    let hslPercent20 = `hsl(${CommonUtils.rgbToHsl(CommonUtils.hexToRgbT(this.background)).array[0]}, 100%, 45%)`;// this.rgbToHsl(this.hexToRgbT(this.background)).string;
    let hslPercent30 = `hsl(${CommonUtils.rgbToHsl(CommonUtils.hexToRgbT(this.background)).array[0]}, 100%, 40%)`;//this.rgbToHsl(this.hexToRgbT(this.background)).string;
    let claseBtn: string = CommonUtils.claseAletaria;
    let cssStyle: string = `
      .btn-${claseBtn} {
        color: ${this.color};
        background-color: ${this.background};
        border-color: ${this.background};
      }

      .btn-${claseBtn}:hover {
        color: ${this.color};
        background-color: ${this.background};
        border-color:  ${this.background};
        box-shadow: 0 8px 25px -8px ${this.background};
      }

      .btn-${claseBtn}.focus,
      .btn-${claseBtn}:focus {
        box-shadow: 0 0 0 .2rem ${CommonUtils.hexToRgbT(this.background)};
      }

      .btn-${claseBtn}.disabled,
      .btn-${claseBtn}:disabled {
        color: ${this.color};
        background-color: ${this.background};
        border-color: ${this.background};
      }

      .btn-${claseBtn}:not(:disabled):not(.disabled).active,
      .btn-${claseBtn}:not(:disabled):not(.disabled):active,
      .show>.btn-${claseBtn}.dropdown-toggle {
        color: ${this.color};
        background-color: ${hslPercent30};
        border-color: ${hslPercent30};
      }

      .btn-${claseBtn}:not(:disabled):not(.disabled).active:focus,
      .btn-${claseBtn}:not(:disabled):not(.disabled):active:focus,
      .show>.btn-${claseBtn}.dropdown-toggle:focus {
        box-shadow: 0 0 0 .2rem rgb(${CommonUtils.hexToRgbT(this.background).array[0]},${CommonUtils.hexToRgbT(this.background).array[1]},${CommonUtils.hexToRgbT(this.background).array[2]},0.5 );
      }
    `;
    // this.hexToRGB(this.background, 0.5) ${this.hexToRgbT(this.background).string}
    this.claseBtn = `btn-${claseBtn}`;
    CommonUtils.addStyleBody(cssStyle);
    //cssStyle
  }

}
