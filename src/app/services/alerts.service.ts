import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private _Router:Router) { }
  tinyAlert() {
    Swal.fire('Hey there!');
  }
  successNotification() {
    Swal.fire('Hi', 'We have been informed!', 'success');
  }
  alertConfirmation(callback:any,title:string ,text:string,showCancelButton:boolean,confirmButtonText:string,cancelButtonText:string,messegIfCancel:string) {
    Swal.fire({
      title ,
      text,
      icon:'warning',
      showCancelButton,
      confirmButtonText,
      cancelButtonText,
    }).then((result) => {
      if (result.value) {
        callback()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled',messegIfCancel, 'error');
      }
    });
  }
}
