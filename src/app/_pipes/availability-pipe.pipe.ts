import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'availabilityPipe',
  standalone: true
  
})
export class AvailabilityPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch(value) {
      case true: value = 'Yes';
        break;
      case false: value = 'No';
        break;
    }
    return value;
  }

}
