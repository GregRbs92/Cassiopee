import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  /**
   * Takes a value and capitalizes it.
   */
  transform(value: string, ...args) {
    return value.substring(0, 1).toUpperCase() + value.substring(1);
  }
}
