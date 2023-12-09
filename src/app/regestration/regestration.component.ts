import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators } from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router'
import{ToastrService} from 'ngx-toastr'
import Swal from 'sweetalert2'
// import Swal from 'sweetalert2/src/sweetalert2.js'
@Component({
  selector: 'app-regestration',
  templateUrl: './regestration.component.html',
  styleUrls: ['./regestration.component.scss']
})
export class RegestrationComponent implements OnInit   {
fShow:boolean=false;
fClose:boolean=false;
showPass:boolean=false;
errorPass:boolean=false;
regexFirstL:RegExp=/^[A-Z ][\s\S]{0,}$/;
regexWeak:RegExp=/^[A-Z][\s\S]{0,4}$/;
regexMedium:RegExp=/^[A-Z][a-z\d @#$%^&+=!]{5,8}$/;
regexStrong:RegExp=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{9,}$/;
passLength:string="Weak";
passLengthColor:string="#ff4757";

  constructor( private _AuthService:AuthService,private _Router:Router,private toastr:ToastrService ){}
  ngOnInit(): void {
    this.fShow=!this.fShow;
    // console.log(this.registrationForm['firstName']);
  }
  // ----------------------------------
  registrationForm: FormGroup|any = new FormGroup({
    "firstName": new FormControl(null,[Validators.required ,Validators.minLength(3),Validators.pattern(/^[a-zA-Z][^0-9]{2,}$/)]),
    "lastName": new FormControl(null,[Validators.required ,Validators.minLength(3) ,Validators.pattern(/^[a-zA-Z][^0-9]{2,}$/)]),
    "email": new FormControl(null,[Validators.required ,Validators.email ,Validators.pattern(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*(\.[a-z]{2,7})$/)]),
    "password": new FormControl(null,[Validators.required ,Validators.minLength(5),Validators.pattern(/^[A-Z][a-z]/)]),
    "gender": new FormControl(null),
    "role": new FormControl('un assign'),
    "isActive": new FormControl(false),
  })
  errorMessage:any="errorMessage"
  invalidRegistration:boolean= false
  // ---------------registerForm-------------------
  procedRegistration(){
    if (this.registrationForm.valid) {
      this._AuthService.prosscedRegister(this.registrationForm.valid).subscribe(res=>{
        this.toastr.success('pleas contact admin for enable access , Registration Successfully')
      })
    }
  }
  //---------------registerForm-------------------
  registerForm(){
      if( this.registrationForm.valid==true) {
        this._AuthService.registration(this.registrationForm.value).subscribe(res=>{
            this.registrationForm.reset();
             this.toastr.success("User Saved successfully")
            this._Router.navigate(['/login']);

        },error=>{
          this.errorMessage=error.message
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!" + error.message,
          });

        })
      }
  }
  // ---------------showPassword-------------------
  showPassword(pass:any){
    this.showPass=!this.showPass
  }
  // ---------------checkPassword-------------------
  checkPassword(value:string,element:any){
    let weak=document.querySelector('.weak')
    let medium=document.querySelector('.medium')
    let strong=document.querySelector('.strong')
    // ---------------first---------------
    if(value.match(this.regexFirstL)){
    // ---------------weak---------------
    if(value.match(this.regexWeak)){
      weak?.classList.add('active')
      medium?.classList.remove('active')
      strong?.classList.remove('active')
      this.passLength='weak'
      this.passLengthColor="#ff4757"
    }
    // ---------------medium---------------
    else if(value.toString().match(this.regexMedium)){
      weak?.classList.add('active')
      medium?.classList.add('active')
      strong?.classList.remove('active')
      this.passLength='medium'
      this.passLengthColor="orange"
    }
    // ---------------strong---------------
    else if(value.toString().match(this.regexStrong)){
      weak?.classList.add('active')
      medium?.classList.add('active')
      strong?.classList.add('active')
      this.passLengthColor="green"
      this.passLength='strong'
    }
  }else {
    element.value=""
    this.errorPass=!this.errorPass
  }
  }
  formClose(){
    this.fClose=!this.fClose
    this._Router.navigate(['/login']);

  }
  // ----------------------------
  goSignin(){
    this._Router.navigate(['/login']);
  }
  // handelonmousMove=(e:any)=>{
  //   const {currentTarget:target}=e
  // }



}
