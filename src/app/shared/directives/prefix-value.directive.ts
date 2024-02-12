import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPrefixValue]'
})
export class PrefixValueDirective {
  @Input('appPrefixValue') prefix: string;

  constructor(private control: NgControl) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    if (this.prefix && value.indexOf(this.prefix) !== 0) {
      this.control.control.setValue(this.prefix + value, { emitEvent: false });
    }
  }
}
