import { CanActivateFn, Router } from '@angular/router';
import {AuthService} from '../services/auth.service'
import { inject } from '@angular/core';
import { User } from '../models/user';
import Swal from 'sweetalert2'
import{ToastrService} from 'ngx-toastr'



export const authGuard: CanActivateFn = (route, state) => {
  const _ToastrService = inject(ToastrService)
  const _AuthService = inject(AuthService)
  const _Router = inject(Router)
  const notnull:any=1 ;


  if (_AuthService.currentUser.getValue() != null) {
    // console.log(state.url);
    // console.log(_AuthService.currentUser.getValue());
    // console.log(_AuthService.currentUser);
    _AuthService.gardstatus.next(null)
    return true
  }else{
    _Router.navigate(['/login'])
    _AuthService.gardstatus.next(notnull)
    return false
  }
};

