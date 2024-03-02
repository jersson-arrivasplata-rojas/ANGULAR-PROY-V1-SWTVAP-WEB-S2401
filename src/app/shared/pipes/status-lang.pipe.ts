import { Pipe, PipeTransform } from '@angular/core';
import { StatusLangEnum } from '../config/status-lang.enum';

@Pipe({
  name: 'statusLang'
})
export class StatusLangPipe implements PipeTransform {

  transform(value: string | number): string {
    return StatusLangEnum[value];
  }

}
