import { Component, OnInit } from '@angular/core';
import{CustomerService} from '../services/customer.service'
import { Router } from '@angular/router';
import{AuthService} from '../services/auth.service'
import{UsersService} from '../services/users.service'
import Swal from 'sweetalert2/src/sweetalert2.js'
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent  implements OnInit {
  ngOnDestroy(){
    console.log('ngOnDestroy - finshed customer');
    this._UsersService.changeupdateShow(false)
  }
  constructor(private _Router:Router,private _AuthService:AuthService ,private _UsersService:UsersService, private _CustomerService:CustomerService)  {
    this.loadCustomer()
  }
  customerList:any;
  shoeModel:boolean=false;
  tableHead:string[]=["Name","Avatar","phone Number","Gender","category","Notes","Action"];
  showSearch:boolean=false;
  sortDirectionIcon:boolean=false;
word:string=''
  ngOnInit(): void {
    console.log('customerList',this.customerList);

    this.showSearch=!this.showSearch;
   this._UsersService.updateShow.subscribe(e=>{
    if(e)
    {this.shoeModel=true}
    else{
      this.shoeModel=false
    }
    })
  }
// -----------------handel Move------------------
deleteUser(id:any){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn conf",
      cancelButton: "btn cancel"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't Delete this User!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this._AuthService.delete(id).subscribe(res=>{
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "This user has been deleted.",
          icon: "success"
        }).then((result)=>{
          if (result) {
           location.reload()
          }
        });
      })

    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
      ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error"
      });
    }
  });
}
// -----------------handel Move------------------
  handelMove(td:any){
     const {currentTarget:target}=td
      const rect=target.getBoundingClientRect()
      const x=td.clientX - rect.left
      const y=td.clientY -rect.top
    //  console.log(target);
     target.style.setProperty("--mouse-x",`${x}px`)
     target.style.setProperty("--mouse-y",`${y}px`)
   }
// -----------------loadUser------------------
  loadCustomer(){
    this._CustomerService.getAllCustomer().subscribe((customer:any) =>{
      this.customerList=customer
      console.log('customer',customer);

    })
    console.log(this.customerList);

  }
  getBy(id:any){
    this._AuthService.getbycode(id).subscribe(res=>{
    this._AuthService.user.next(res)

    })
  }
// -----------------updateUser------------------
  updateUser(user:any){
    this.getBy(user.id)
     this._UsersService.changeupdateShow(!this.shoeModel)
  }
// -----------------sorting------------------
sortingup(direction:any,element:any){
  // console.log(this.customerList);
  let prop=element.textContent.trim()=='Name'?'Name':element.textContent.trim()=='phone Number'?'phoneNumber'
  :element.textContent.trim()=='note'?'Notes':element.textContent.toLowerCase().trim()

  this.customerList.sort( (a:any, b:any)=> {
    var nameA = a[prop],
    nameB = b[prop]
    if (nameA < nameB)
      return direction=='up'?-1:1;
    if (nameA > nameB)
      return direction=='down'?1:-1;;
    return 0;
  })
  this.sortDirectionIcon=!this.sortDirectionIcon
}


}
