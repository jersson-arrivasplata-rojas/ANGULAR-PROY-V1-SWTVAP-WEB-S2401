import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sticks'
})
export class SticksPipe implements PipeTransform {

    transform(value: string, pos: number): string {

        const data = value.split('|');

        return data[pos];
    }

}
