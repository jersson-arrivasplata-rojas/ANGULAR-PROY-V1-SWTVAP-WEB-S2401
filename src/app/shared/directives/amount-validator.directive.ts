import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { debounceTime, map, of } from 'rxjs';
import { TimersEnum } from '../config/timers.enum';

@Directive({
  selector: '[appAmountValidator]',
})
export class AmountValidatorDirective {

  pattern = /^\d*\.?\d{0,4}/;

  constructor(private ngControl: NgControl) { }


  @HostListener('ngModelChange', ['$event'])
  onModelChange(value: string) {
    of(value).pipe(
      debounceTime(TimersEnum.TIMER_VALUES_DIRECTIVE_CHANGES), // Limita la frecuencia de validación
      map(value => this.applyPattern(value))
    ).subscribe();
  }

  @HostListener('change', ['$event.target.value'])
  onChange(value: string) {
    this.applyPattern(value);
  }

  applyPattern(value: string) {
    if (typeof value === 'string' && value.length > 1 && value[0] === '0') {
      value = value.slice(1);
    }

    if (typeof value === 'string') {
      const match = value.match(this.pattern); // Encuentra el valor que cumple con el patrón
      if (match && this.ngControl.control.value !== match[0]) {
        this.ngControl.control?.setValue(match[0], { emitEvent: false });
      }
    }
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string) {
    this.applyPattern(value);
    // Si el valor termina con un punto, lo eliminamos
    if (value.endsWith('.')) {
      const newValue = value.slice(0, -1);
      this.ngControl.control?.setValue(newValue, { emitEvent: false });
    }
  }

}
