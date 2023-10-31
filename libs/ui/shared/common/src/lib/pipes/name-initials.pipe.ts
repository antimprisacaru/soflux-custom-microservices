import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameInitials',
  standalone: true
})
export class NameInitialsPipe implements PipeTransform {
  transform(value: string): string {
    return value.match(/\b\w/g)!.join('');
  }
}
