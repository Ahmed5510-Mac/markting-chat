import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import{CustomerService} from '../services/customer.service'
import{UsersService} from '../services/users.service'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
  AvatarIcon:string="../../assets/images/ahmed darwish.jpg"
  newMessageIcon:string="../../assets/images/iconmessage.png"
  statusIcon:string="../../assets/images/status.png"
  conversition:any;
  word:string='';
  showAddCustomerModel:boolean=false
  constructor(private _CustomerService:CustomerService,
    private _UsersService:UsersService){}
  ngOnInit(): void {
    this._CustomerService.getAllCustomer().subscribe(res=>{
      this.conversition=  res
       console.log("res",res);
       console.log("customers",this.conversition);
   })
  }
  @Output()conversationClicked:EventEmitter <any> = new EventEmitter();
  arrowiconChang=false
  searchiconChang=true
  iconswitch(){
    this.arrowiconChang= !this.arrowiconChang
    this.searchiconChang= !this.searchiconChang
  }
  normalicon(){
    this.arrowiconChang=false
    this.searchiconChang=true
  }
  // showaddCustomer(){
  //   this._UsersService.changeupdateShow(!this.shoeModel)
  // }
  addCustomer(){
    this._CustomerService.showAddCustomer(true)

  }
}
