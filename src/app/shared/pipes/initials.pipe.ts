import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    // Divide la cadena en palabras, toma la primera letra de cada palabra y las une.
    return value.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
  }

}
