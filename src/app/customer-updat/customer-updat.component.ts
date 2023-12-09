import { Component, Input, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators } from '@angular/forms';
import {AuthService} from '../services/auth.service';
import { CustomerService } from '../services/customer.service';
import {Router} from '@angular/router'
import{ToastrService} from 'ngx-toastr'
import{User} from '../models/user'
import Swal from 'sweetalert2/src/sweetalert2.js'
import { UsersService } from '../services/users.service';
import { CustomerComponent } from '../customer/customer.component';
@Component({
  selector: 'app-customer-updat',
  templateUrl: './customer-updat.component.html',
  styleUrls: ['./customer-updat.component.scss']
})
export class CustomerUpdatComponent  implements OnInit  {

  // user:User={id:0,firstName:'',lastName:'',email:'',password:'',gender:'',role:'',isActive:false};
showModel:boolean=false;
showPass:boolean=false;
categoryList:any;
 @Input() showCustomerUpdate:boolean=false;
constructor( private _AuthService:AuthService,
  private _Router:Router,
  private toastr:ToastrService,
  private _CustomerService:CustomerService,
  private _UsersService:UsersService  ){}
  ngAfterViewInit(){
    // console.log(this.show);
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
// this._CustomerService.getAllCustomer.subscribe(res=>{
//   console.log("",res);
//   this.user=res
//   this.updateForm.patchValue({
//     fullName:res.firstName,
//     lastName:res.lastName,
//     email:res.email,
//     password:res.password,
//     gender:res.gender,
//     role:res.role,
//     isActive:res.isActive
//     });
//     console.log(this.user);
// })
// ---------------get All roles-------------------------
this._CustomerService.getAllCategory().subscribe(data=>{
this.categoryList=data})
}
logvalue(){
  console.log(this.updateForm);
}
// ----------------------------------
updateForm: FormGroup|any = new FormGroup({
  "fullName": new FormControl(null,[Validators.required ,Validators.minLength(3),Validators.pattern(/^[a-zA-Z][^0-9]{2,}$/)]),
  "phone": new FormControl(null,[Validators.required ,Validators.minLength(11) ,Validators.pattern(/^(002|\+2)?01[0125][0-9]{8}$/)]),
  "Notes": new FormControl(null,[ Validators.minLength(3),Validators.maxLength(500),Validators.pattern(/^([\w ]){3,500}$/)]),
  "category": new FormControl(null,[Validators.required]),
  "gender": new FormControl(null,[Validators.required])
})
    // ---------------Close form -------------------
    formClose(){
      this._UsersService.changeupdateShow(!this.showModel)
     }
     updateUser(){

     }
}
