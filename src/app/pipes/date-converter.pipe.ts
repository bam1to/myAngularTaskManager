import { Pipe, PipeTransform } from '@angular/core';
import { DateInterface } from '../interfaces/date.interface';

@Pipe({
  name: 'dateConverter'
})
export class DateConverterPipe implements PipeTransform {

  transform(value: DateInterface, ...args: any): string {
    const date = `${value.year}-${value.month}-${value.day}`;
    return date;
  }

}
