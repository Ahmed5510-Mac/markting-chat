import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import {AuthService} from '../services/auth.service'
import { inject } from '@angular/core';
import Swal from 'sweetalert2'
import{ToastrService} from 'ngx-toastr'


export const adminurlGuard: CanActivateFn = (route, state) => {
  const _ToastrService = inject(ToastrService)
  const _AuthService = inject(AuthService)
  const _Router = inject(Router)
  console.log("currentUserRole",_AuthService.currentUser.value.role);
  if (_AuthService.currentUser.value!=null && _AuthService.currentUser.value.role==='admin') {
      console.log("roleTrue",_AuthService.currentUser.role);
      return true;
    }
    else{
      _Router.navigate(['/whatsappChat'])
      Swal.fire({
        template:` ${_ToastrService.warning("your dont have admin account to open users","Admin user")}`
      });
      return false
    }

};
