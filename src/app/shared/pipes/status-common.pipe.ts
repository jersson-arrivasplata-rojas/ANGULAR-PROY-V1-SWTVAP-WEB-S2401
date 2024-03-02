import { Pipe, PipeTransform } from '@angular/core';
import { StatusCommonEnum } from '../config/status-common.enum';

@Pipe({
  name: 'statusCommon'
})
export class StatusCommonPipe implements PipeTransform {

  transform(value: string | number): string {
    return StatusCommonEnum[value];
  }
}
