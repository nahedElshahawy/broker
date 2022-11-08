import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creat'
})
export class CreatPipe implements PipeTransform {

  transform(value: string,): string {
    let Year = value.substring(0, 10);
    // let time = value.substring(11, 16)

    // let FullDate =   Year + ' at '  + time ;
    let FullDate =   Year  ;
    return FullDate;
  }

}
