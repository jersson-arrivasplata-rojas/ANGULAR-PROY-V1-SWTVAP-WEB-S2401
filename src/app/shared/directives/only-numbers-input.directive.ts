import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbersInput]'
})
export class OnlyNumbersInputDirective {

  @Input() OnlyNumber: boolean;
  @Input() AllowPlus: boolean;
  @Input() AllowPoint: boolean;

  regexStr = '^[0-9]*$';
  regexStrPlus = '^[0-9+]*$';
  regexStrPoint = '^[0-9.]*$';

  constructor(private el: ElementRef) { }


  @HostListener('input', ['$event']) onInput(event) {
    let value = this.el.nativeElement.value;
    if (typeof value === 'string' && value.length > 1 && value[0] === '0') {
      this.el.nativeElement.value = value.slice(1);
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <any>event;
    if (this.OnlyNumber) {
      if ([46, 8, 9, 27, 13, 110, 190, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.keyCode == 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+V
        (e.keyCode == 86 && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.keyCode == 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
      }
      let ch = String.fromCharCode(e.keyCode);
      let regEx = this.getRegex();
      if (regEx.test(ch))
        return;
      else
        e.preventDefault();
    }
  }
  private getRegex(): RegExp {
    if (this.AllowPoint) {
      return new RegExp(this.regexStrPoint);
    } else if (this.AllowPlus) {
      return new RegExp(this.regexStrPlus);
    } else {
      return new RegExp(this.regexStr);
    }
  }
}
