import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDateFormat]'
})
export class DateFormatDirective {

  constructor(private ngControl: NgControl) { }
  private previousValue = '';

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string) {
    this.applyPattern(value);
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {   // Verificar si el valor contiene solo números y guiones
    if (!/^[\d-]*$/.test(value)) {
      this.ngControl.control?.setValue(this.previousValue, { emitEvent: false });
      return;
    }

    if (value.length > 10) {
      this.ngControl.control?.setValue(value.slice(0, 10), { emitEvent: false });
    } else if ((value.length === 4 || value.length === 7) && /\d$/.test(value) && value.length > this.previousValue.length) {
      this.ngControl.control?.setValue(value + '-', { emitEvent: false });
    }
    this.previousValue = value;
  }

  applyPattern(value: string) {
    const parsedDate = new Date(value);
    if (!isNaN(parsedDate.getTime())) {

      const formattedDate = parsedDate.toISOString().slice(0, 10);
      this.ngControl.control?.setValue(formattedDate, { emitEvent: false });
    }
  }
}
