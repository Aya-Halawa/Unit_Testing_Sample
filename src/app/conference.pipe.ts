import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conference'
})
export class ConferencePipe implements PipeTransform {
  transform(value: string): string {
    return value + 'ern Conference';
  }
}
