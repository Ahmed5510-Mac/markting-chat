import { Component,OnInit, ViewEncapsulation } from '@angular/core';
import {FormGroup ,FormControl, Validators}from'@angular/forms'
import {Router} from '@angular/router';
import { UserData } from '../shared/userdata';
import{AuthService} from '../services/auth.service'
import{ToastrService} from 'ngx-toastr'
import  Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

constructor( private _Router:Router , private _AuthService:AuthService ,private _ToastrService:ToastrService){}


  invalidLogin:boolean=false;
  errorMessage:any="errorMessage";
  fShow:boolean=false;
  fClose:boolean=false;
  showPass:boolean=false;
  ngOnInit(): void {
    this.fShow=!this.fShow

  }
  loginForm:FormGroup|any=new FormGroup({
    "email":new FormControl(null,[Validators.required, Validators.email]),
    "password":new FormControl(null,[Validators.required , Validators.pattern(/^[A-Z]/)])
  })
  formClose(){
    this.fClose=!this.fClose
    this._Router.navigate(['/register'])
  }
  //---------------------------------------------------
  showPassword(pass:any){
    this.showPass=!this.showPass
  }

  //----------------------login Form Fun-----------------------------
  loginFormFun(){
    this._AuthService.login(this.loginForm.value).subscribe(data=>{
      const user = data.find((user:any)=>{
        return user["email"] === this.loginForm.value.email && user["password"] === this.loginForm.value.password
                     })
      if(user != null){
        //console.log("userData",user.isActive);
          if(user.isActive){
            sessionStorage.setItem("userName",JSON.stringify({id:user.id,role:user.role,fName:user.firstName,lName:user.lastName}))
            // sessionStorage.setItem("userRole",user.role)
            this._Router.navigate(['/whatsappChat'])
            this._ToastrService.success("login Successfully")
            this._AuthService.currentUser.next(user)
            this.loginForm.reset()
          }
            else{
              Swal.fire({
                template:` ${this._ToastrService.warning("pleas contact admin to active","in Active user")}`
              });
            this._ToastrService.warning("in Active user","pleas contact admin to active")
          }
        }
       if(user===undefined || user===null){
        Swal.fire({
          icon: "error",
          title: "Login Error.",
          text: "password or email invalid Login Error!" ,
        });
      }
    },err=>{
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong!" + err.message,
      });
      this._ToastrService.error(err.message)
    })

  }
  //---------------------------------------------------
  goRegistration(){
    this._Router.navigate(['/register'])
  }

}
