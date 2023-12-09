import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import{UsersService} from '../services/users.service';

@Component({
  selector: 'app-chat',
  templateUrl: './whatsapp-chat.component.html',
  styleUrls: ['./whatsapp-chat.component.scss']
})
export class whatsappChatComponent implements OnInit {
  constructor(private _Router:Router,
    private _AuthService:AuthService ,
    private _CustomerService:CustomerService,
    private _UsersService:UsersService)  {
      this._CustomerService.showAddCustomer(false)
  }
  ngOnDestroy(){
    // console.log('ngOnDestroy - finshed whatsapp');
    this._CustomerService.showAddCustomer(false)
  }
  conversation:any;
  showAddModel:boolean=false
  ngOnInit(): void {
    this._CustomerService.addFormShow.subscribe(e=>{
      if(e)
      {this.showAddModel=true}
      else{
        this.showAddModel=false
      }
      })
  }
  onConversationselected(user:any){
    this.conversation=user
  }

}
