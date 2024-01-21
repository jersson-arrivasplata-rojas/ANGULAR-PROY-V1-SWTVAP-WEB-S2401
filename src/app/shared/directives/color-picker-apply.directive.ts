import { Directive, Input } from '@angular/core';
import { ScopesUtil } from '../utils/scopes.util';

@Directive({
  selector: '[appColorPickerApply]'
})
export class ColorPickerApplyDirective {

  @Input() public scope: ScopesUtil;
  @Input() public element: any;

  constructor() { }

  /*@HostListener('change') ngOnChanges() {
    if (this.scope.variable.value.charAt(0) === '#') {
      element.colorpicker('setValue', scope.variable.value)
    }
   }*/

}
