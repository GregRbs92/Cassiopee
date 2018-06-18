import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mToHm',
})
export class mToHmPipe implements PipeTransform {
  /**
   * Takes a value in minutes and transforms it into hours and minutes.
   */
  transform(value: number, ...args) {
    let hours = Math.floor(value / 60);
    let minutes = value - hours * 60;
    return `${hours}h${minutes}`;
  }
}
