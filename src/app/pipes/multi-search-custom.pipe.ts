import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiSearchCustom'
})
export class MultiSearchCustomPipe implements PipeTransform {


  transform(array:any[]|null, word:string,p1:string,p2:string ,p3:string): any {



    if (word == undefined) {
      return array
    }
    return array?.filter(el=>{

      return el[p1].includes(word)||el[p2].includes(word)||el[p3]?.includes(word)
    })
  }
// =================================================================
  // transform(array:any[]|null, ...args:any[]): any {
  //   let[word,Name,phoneNumber,category]=args
  //   // let word=args[0][0];
  //   console.log(word);
  //   console.log(Name);
  //   console.log(phoneNumber);
  //   console.log(category);
  //   // console.log(args[3]);

  //   if (word == undefined) {
  //     return array
  //   }
  //   return array?.filter(el=>{

  //     return el.Name.includes(word)||el.phoneNumber.includes(word)||el.category?.includes(word)
  //   })
  // }

}
// el.Name.includes(word)||el.phoneNumber.includes(word)||
