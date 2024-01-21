import { Component, Input, OnInit } from '@angular/core';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'app-button-outline-hex',
  templateUrl: './button-outline-hex.component.html',
  styleUrls: ['./button-outline-hex.component.scss']
})
export class ButtonOutlineHexComponent implements OnInit {
  @Input() title: string = '';
  @Input() icono: string = 'i-Gear-2';
  @Input() claseButton: string = '';
  @Input() claseI: string ;
  @Input() background: string;
  @Input() color: string = '#fff';
  public claseBtn: string;

  public classButton: string[] = ['btn-rounded', 'btn-sm', 'btn-lg', 'btn-icon','round', 'rounded-circle'];
  constructor() { }

  ngOnInit(): void {
    this.pushStyle()
  }
  // https://css-tricks.com/converting-color-spaces-in-javascript/
  pushStyle() {

    let hslPercent20 = `hsl(${CommonUtils.rgbToHsl(CommonUtils.hexToRgbT(this.background)).array[0]}, 100%, 45%)`;// this.rgbToHsl(this.hexToRgbT(this.background)).string;
    let claseBtn: string = CommonUtils.claseAletaria;
    let cssStyle: string = `
    .btn-outline-${claseBtn}:not(:disabled):not(.disabled):active,
    .btn-outline-${claseBtn}:not(:disabled):not(.disabled).active,
    .show > .btn-outline-${claseBtn}.dropdown-toggle {
        color: ${this.color};
        background-color: ${this.background};
        border-color: ${this.background};
    }

    .btn-${claseBtn},
    .btn-outline-${claseBtn} {
      border-color: ${this.background};
      color: ${this.background};
      background:${this.color};
    }

    .btn-${claseBtn} .btn-spinner,
    .btn-outline-${claseBtn} .btn-spinner {
      animation: btn-glow-${claseBtn} 1s ease infinite;
    }
    .btn-${claseBtn}:hover,
    .btn-outline-${claseBtn}:hover {
      background: ${this.background};
      color: ${this.color};
      box-shadow: 0 8px 25px -8px ${this.background};
      border-color: ${this.background};
    }
    .btn-${claseBtn}:focus,
    .btn-outline-${claseBtn}:focus {
      box-shadow: none;
      box-shadow: 0 8px 25px -8px ${this.background};
    }
    @keyframes btn-glow-primary {
      0% {
        box-shadow: 0 0 0 0.4em ${hslPercent20}, 0 0 0 0.1em ${hslPercent20};
        transform: rotate(360deg);
      }
      50% {
        border-top-color: ${this.color};
      }
      100% {
        box-shadow: 0 0 0 0.4em ${hslPercent20}, 0 0 0 3.6em transparent;
       }
      }
    `;
    // this.hexToRGB(this.background, 0.5) ${this.hexToRgbT(this.background).string}
    this.claseBtn = `btn-outline-${claseBtn}`;
    CommonUtils.addStyleBody(cssStyle);
    //cssStyle
  }

}
