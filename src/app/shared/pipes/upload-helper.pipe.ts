import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'uploadHelper'
})
export class UploadHelperPipe implements PipeTransform {

  dateString: string | null = "";

  constructor(private datePipe: DatePipe) {
  }

  transform(value: Date, ...args: unknown[]): unknown {
    this.dateString = this.datePipe.transform(value, 'yyyy-MM-dd-hh-mm');
    return this.dateString;
  }

}
