import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creationDate'
})
export class CreationDatePipe implements PipeTransform {
  transform(date: Date | string): string {
    const day = (date as Date).getDate().toString().padStart(2, '0');
    const month = (date as Date).getMonth().toString().padStart(2, '0');
    const year = (date as Date).getFullYear().toString();
    const result = `${day}.${month}.${year}`;
    return result;
  }
}
