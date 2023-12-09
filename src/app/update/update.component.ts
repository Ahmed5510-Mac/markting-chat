import { Component, Input } from '@angular/core';
import {FormControl,FormGroup,Validators } from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {UsersService} from '../services/users.service';
import {Router} from '@angular/router'
import{ToastrService} from 'ngx-toastr'
import{User} from '../models/user'
import Swal from 'sweetalert2/src/sweetalert2.js'
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {
  ngOnDestroy(){
    console.log('ngOnDestroy - finshed update');
  }
  // -------------props------------------
  showModel:boolean=false;
  showPass:boolean=false;
 @Input() show:boolean=false;
  user:User={id:0,name:'',email:'',gender:"",role:'',active:false};
  roleList:any;
  // -------------------------------
    constructor( private _AuthService:AuthService,
      private _Router:Router,
      private toastr:ToastrService ,
      private _UsersService:UsersService ){
      }
      ngAfterViewInit(){
      console.log(this.show);
      // ---------------Role select-------------------------
      const selector:any= document.querySelector('.custom-select')
      selector.addEventListener('click',function(e:any){
     Array.from( e.target.children[1].children).forEach((opt:any) => {
       // console.log(opt);
       opt.classList.toggle("Active")
     })

     })
 selector.addEventListener('mousedown',(e:any)=>{
   e.preventDefault();
   const select=selector.children[0]
   console.log('select',select.value);
   const dropDown= document.createElement("ul")
     dropDown.className = 'selector-option'
     Array.from(select.children).forEach((el:any,index) => {
       // const icon:any=document.createElement('img')
       const dropDownOption:any = document.createElement('li');
      //  console.log("dropDownOption",dropDownOption);
         dropDownOption.setAttribute("style",`--i:${index+1}`)
         dropDownOption.textContent = el.textContent;
         dropDownOption.addEventListener('mousedown', (e:any) => {
           e.stopPropagation()
           select.value = el.value;
           el.selected=true
           select.dispatchEvent(new Event('change'))
           dropDown.remove()
         })
         dropDown.appendChild(dropDownOption)
          //  console.log('select after',select.value);
     })
     selector.appendChild(dropDown)
     document.addEventListener('click', e => {
         // console.log(e.target)
         if (!selector.contains(e.target)) {
           dropDown.remove()


         }
     })
 })
    }
    ngOnInit(): void {
 // -------------------to show model-----------------------------
      this._UsersService.updateShow.subscribe(e=>{
        if(e) this.showModel=true;
        else this.showModel=false;
      })
  // -----------------------set value to form------------------------------
      this._AuthService.user.subscribe(res=>{
        console.log("",res);
        this.user=res
        this.updateForm.patchValue({
          firstName:res.name,
          lastName:'',
          email:res.email,
          password:'res.password',
          gender:res.gender,
          role:res.role,
          isActive:res.active
          });
          console.log(this.user);
      })
    // ---------------get All roles-------------------------
    this._AuthService.getAllRole().subscribe(data=>{
        this.roleList=data})

   }
   // -------------------start build Update  form------------------------------------
    updateForm: FormGroup|any = new FormGroup({
      "firstName": new FormControl(null,[Validators.required ,Validators.minLength(3),Validators.pattern(/^[a-zA-Z][^0-9]{2,}$/)]),
      "lastName": new FormControl(null,[Validators.required ,Validators.minLength(3) ,Validators.pattern(/^[a-zA-Z][^0-9]{2,}$/)]),
      "email": new FormControl(null,[Validators.required ,Validators.email ,Validators.pattern(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*(\.[a-z]{2,7})$/)]),
      "password": new FormControl(null,[Validators.required ,Validators.minLength(5),Validators.pattern(/^[A-Z][a-z]/)]),
      "gender": new FormControl(''),
      "role": new FormControl(''),
      "isActive": new FormControl(false),
    })
    errorMessage:any="errorMessage"
    invalidRegistration:boolean= false
    // ---------------Update Form Method -------------------
    updateUser(){
        if( this.updateForm.valid) {}
          this._AuthService.updateUser(this.user.id,this.updateForm.value).subscribe(res=>{
            console.log("updateForm",this.updateForm.value);

            this._UsersService.updateShow.next(false)
              const Toast = Swal.mixin({
                customClass: {
                  cancelButton: "btn cancel"
                },
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Signed in successfully"
              });
               setTimeout(()=>window.location.reload(),400)
          },error=>{
            this.errorMessage=error.message
             this.invalidRegistration=true
             this.toastr.warning('please enter valid data')
             this.toastr.error(error.message)
          })
         }
    // ---------------Close form -------------------
    formClose(){
     this._UsersService.changeupdateShow(!this.showModel)
    }
  }
