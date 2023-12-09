import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(conves:any[], word: string): any {

    if (word == undefined) {
      return conves
    }
    return conves.filter(conv=>{
      return conv.Name.includes(word)
    })
  }

}
