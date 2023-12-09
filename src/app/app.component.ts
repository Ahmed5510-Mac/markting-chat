import { Component ,OnInit } from '@angular/core';
import {AuthService} from './services/auth.service'
import { AlertsService } from './services/alerts.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLogin:boolean=false;
  constructor(private _AuthService:AuthService ,private _AlertsService:AlertsService, private _Router:Router){
  }
  gologin(){
     this._Router.navigate(['/login'])
  }
  ngOnInit(): void {
    this._AuthService.currentUser.subscribe((cur:any)=>{
      if ( cur ){
        this.isLogin = true;
        // console.log("after",this.isLogin);
      }
      else
      this.isLogin = false;
    },(err:any)=>{})

    this._AuthService.gardstatus.subscribe(st=>{
      if(st){
        
        // this.guard=true
        this._AlertsService.alertConfirmation(this.gologin,"please  login first","This process is required",true,"Yes, login" ,"No, let me think",'your  still dont have login')
      }else
      {
        this.guard=false
      }
    })
  }
  guard:boolean=false;
  title = 'big-revision';
  number=3
  name="ahmed"



}
