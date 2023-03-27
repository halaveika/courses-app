import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creationDate'
})
export class CreationDatePipe implements PipeTransform {
  transform(date: string): string {
    const newDate = date.split('/');
    return `${newDate[1]}.${newDate[0]}.${newDate[2]}`;
  }
}
