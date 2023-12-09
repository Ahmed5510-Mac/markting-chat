import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
updateShow=new BehaviorSubject(false)
  constructor() { }
   changeupdateShow(x:any){
    this.updateShow.next(x)
  }

}
