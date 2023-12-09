import { Component,OnInit } from '@angular/core';
import{AuthService} from '../services/auth.service'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  implements OnInit {
  constructor(private _AuthService:AuthService){}
  logoSrc:string = '../../assets/images/logo-dark.png'
  isLogin:boolean = false;
  isAdmin:boolean = false;
  user:any;
  user1:any=sessionStorage.getItem('userName')
  ngOnInit(): void {
    this.user=JSON.parse(this.user1)

    this._AuthService.currentUser.subscribe((cur:any)=>{
      if (cur){
        this.isLogin = true;
        // this.user = cur
          console.log("after",this.user);
      }
      else{
        this.isLogin = false;
      }
       if(cur.role==='admin'){
        this.isAdmin = true;
        // console.log("admin true");

      }else{
        this.isAdmin = false;
        // console.log("admin false");

      }

      // console.log("isAdmin",this.isAdmin);
      // console.log("isLogin",this.isLogin);
      // console.log("cur.role",cur.role);
      // console.log("cur",cur);
    })
  }

  ngAfterViewInit(){
    const links=document.querySelectorAll('.nav-link')
    links.forEach((link) => {
     link.addEventListener('click',function(e:any){
      console.log( e.target);
      links.forEach((item:any) => {
        item.classList.remove('Active');
      })
     e.target.classList.add('Active')
     })
    })
  }


  logOut(){
    this._AuthService.logout()
    // location.reload()
  };





}
