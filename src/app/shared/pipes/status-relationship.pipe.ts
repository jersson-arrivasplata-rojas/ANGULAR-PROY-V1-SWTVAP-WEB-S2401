import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusRelationship'
})
export class StatusRelationshipPipe implements PipeTransform {

  transform(value: string | boolean): string {

    return value ? 'Asociado' : 'No Asociado';
  }

}
