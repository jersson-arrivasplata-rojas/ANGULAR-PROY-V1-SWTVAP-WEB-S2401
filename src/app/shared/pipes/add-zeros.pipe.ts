import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addZeros'
})
export class AddZerosPipe implements PipeTransform {

  transform(value: number, digits: number = 3): string {
    const strValue = value.toString();
    const decimalIndex = strValue.indexOf('.');
    if (decimalIndex !== -1) {
      const decimalPart = strValue.substr(decimalIndex + 1);
      if (decimalPart.length < digits) {
        const zerosToAdd = digits - decimalPart.length;
        return strValue + '0'.repeat(zerosToAdd);
      }
    } else {
      return strValue + '.' + '0'.repeat(digits);
    }
    return strValue;
  }

}
