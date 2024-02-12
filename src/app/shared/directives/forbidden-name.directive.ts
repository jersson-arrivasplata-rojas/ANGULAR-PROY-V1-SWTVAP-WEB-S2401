import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appForbiddenName]',
})
export class ForbiddenValidatorDirective {
  @Input('appForbiddenName') forbiddenName: string;

}

