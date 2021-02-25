import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'reverse' })

export class ArrayReversePipe implements PipeTransform {
  transform(value) {
    return value.slice().reverse();
  }
}