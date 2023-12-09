import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl,FormGroup,Validators } from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {UsersService} from '../services/users.service';
import {Router} from '@angular/router'
import{ToastrService} from 'ngx-toastr'
import { CustomerService } from '../services/customer.service';
import { User } from '../models/user';
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddCustomerComponent  implements OnInit{
  //  @Input() Show:boolean=false;
   Show:boolean=false;
  showModel:boolean=false;
  categoryList:any;
  constructor( private _AuthService:AuthService,
    private _Router:Router,
    private toastr:ToastrService ,
    private _CustomerService:CustomerService ){}
 // ================================= ngAfter ViewInit =====================================
    ngAfterViewInit(){
      console.log("categoryList",this.categoryList);

      // ---------------Category select-------------------------
      const selector:any= document.querySelector('.custom-select')
      selector.addEventListener('click',function(e:any){
        console.log("error", e.target);
       Array.from( e.target.children[1].children).forEach((opt:any) => {
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
 // ================================= ngOnInit =====================================
  ngOnInit(): void {
    this._CustomerService.addFormShow.subscribe(res=>{
      this.Show=res
      console.log("addCustomer",res);
      console.log("show",this.Show=res);
    })
    // ---------------get All roles-------------------------
  this._CustomerService.getAllCategory().subscribe(data=>{
  this.categoryList=data
  console.log("categoryListData1",data);
})
console.log("categoryListData2",this.categoryList);
  }

// ------------------------------add customer form builder-------------------------------------
  addCustomerForm:FormGroup|any=new FormGroup({
    "fullName": new FormControl(null,[Validators.required ,Validators.minLength(3),Validators.pattern(/^[a-zA-Z][^0-9]{3,}$/)]),
    "phone": new FormControl(null,[Validators.required ,Validators.minLength(11) ,Validators.pattern(/^(002|\+2)?01[0125][0-9]{8}$/)]),
    "notes": new FormControl(null,[  Validators.minLength(3),Validators.maxLength(500)]),
    "gender": new FormControl(null,[Validators.required ]),
    "category": new FormControl(null,[Validators.required ]),
  })
// ------------------------|add Customer|---------------------------
  addCustomer(){
    this._CustomerService.AddCustomer(this.addCustomerForm.value)
    console.log(this.addCustomerForm.value);


  }
// ------------------------|form Close |---------------------------
  formClose(){
    this._CustomerService.showAddCustomer(false)

  }
}
