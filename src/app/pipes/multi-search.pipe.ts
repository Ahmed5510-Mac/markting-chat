import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiSearch'
})
export class MultiSearchPipe implements PipeTransform {

  transform(array:any[]|null, word:any): any {
    // console.log(args[1]);
    // console.log(args[2]);
    // console.log(args[3]);

    if (word == undefined) {
      return array
    }
    return array?.filter(el=>{

      return el.firstName.includes(word)||el.lastName.includes(word)||el.email.includes(word)
    })
  }

}
