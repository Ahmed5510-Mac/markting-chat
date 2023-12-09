import { Component, DoCheck, AfterViewInit, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import{AuthService} from '../services/auth.service'
import{UsersService} from '../services/users.service'
// import Swal from 'sweetalert2'
import Swal from 'sweetalert2/src/sweetalert2.js'
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  ngOnDestroy(){
    console.log('ngOnDestroy - finshed users');
   this._UsersService.changeupdateShow(false)

  }
  constructor(private _Router:Router,private _AuthService:AuthService ,private _UsersService:UsersService)  {
    this.loadUser()
  }
  userList:any;
  shoeModel:boolean=false;
  tableHead:string[]=["ID","Name","Email","Role","Gender","Status","Action"];
  showSearch:boolean=false;
  sortDirectionIcon:boolean=false;
  word:string='';
  avatarUrl:string=`http://elkholy.azq1.com/dash/`

  ngOnInit(): void {
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
// this._AuthService.delete(id).subscribe(res=>{
// })
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
  loadUser(){
    this._AuthService.getAll().subscribe(user =>{
      this.userList = user
      console.log(this.userList );

    })
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
  this.sortDirectionIcon=!this.sortDirectionIcon
  let prop=element.textContent.toLowerCase().trim()=='name'?'firstName':element.textContent.toLowerCase().trim()=='status'?'isActive'
  :element.textContent.toLowerCase().trim()=='role'?'role':'email'
  this.userList.sort( (a:any, b:any)=> {
    let nameA = a[prop],
        nameB = b[prop]
    if (nameA < nameB)
      return direction=='up'?-1:1;
    if (nameA > nameB)
      return direction=='down'?1:-1;;
    return 0;  // No sorting
})
// console.log(element)
}
// -----------------search------------------
// findMatch(wordToMatch:any,users:any){
//   return users.filter((user:any)=> {
//   const regex=new RegExp(wordToMatch,'gi');
//   return user.firstName.match(regex)||user['lastName'].match(regex)||user['email'].match(regex)})
//   }
// filtering(value:any){
//   if (value.trim()!='') {
//     console.log(value);
//     this.userList=this.findMatch(value,this.userList)
//   }else{
//     this.loadUser()

// console.log('0');

//   }
// }
}
