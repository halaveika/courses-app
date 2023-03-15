import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creationDate'
})
export class CreationDatePipe implements PipeTransform {
  transform(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.getMonth().toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const result = `${day}.${month}.${year}`;
    return result;
  }
}
