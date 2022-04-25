import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyType'
})
export class EmptyTypePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    // if the dropdown menu was untouched -> the string is empty -> pick the first element
      if (value == "") {
        return "Előétel";
      } else {
        return value;
      }
  }

}
