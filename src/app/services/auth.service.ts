import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Observable ,BehaviorSubject} from 'rxjs'
import{Router} from '@angular/router'
import { User } from '../models/user';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  linkApi:string=`${environment.apiUrl}/users`
  roleApi:string=`${environment.apiUrl}/role`
  currentUser:any=new BehaviorSubject(null)
  gardstatus=new BehaviorSubject(null);
  currentUserRole:any=new BehaviorSubject(null)
  UserRoleStatus=new BehaviorSubject(null);
  user=new BehaviorSubject({id:0,name:'',email:'',gender:"",role:'',active:false});
  constructor( private _HttpClient:HttpClient ,private _Router:Router) {
  const storedUser:any=sessionStorage.getItem('userName')
    if(storedUser!=null){
      this.currentUser.next(JSON.parse(storedUser) )
      console.log("currentusr",this.currentUser.value.role);
    }else{
      this.currentUser.next( null)
    }
   }
  //  --------------registration-------------------
   registration(user:object):Observable<any>{
    return this._HttpClient.post(this.linkApi, user);
   }
  //  --------------login-------------------
login(user:any):Observable<any>{
  return this._HttpClient.get(this.linkApi)
}
  //  --------------logout-------------------
  logout(){
    this.currentUser.next(null)
    sessionStorage.removeItem('userName')
    sessionStorage.removeItem('userRole')
    this._Router.navigate(['/login'])
  }
  //  --------------getUserRole-------------------
  getUserRole(){
    return sessionStorage.getItem('userRole')!=null?sessionStorage.getItem('userRole')?.toString():""
  }
  //  --------------prossced Register -------------------
  prosscedRegister(inputData:any):Observable<any>{
    return this._HttpClient.post(this.linkApi, inputData);
  }
  //  --------------updateUser-------------------
  updateUser(id:any,user:any):Observable<any>{
    return this._HttpClient.put(this.linkApi+'/'+id,user);
  }
  //  --------------get All-------------------
  getAll():Observable<any>{
    return this._HttpClient.get(this.linkApi);
  }
  //  --------------get by code-------------------
  getbycode(code:any):Observable<any>{
    return this._HttpClient.get(this.linkApi+'/'+code);
  }
  //  --------------getAllRole-------------------
  getAllRole():Observable<any>{
    return this._HttpClient.get(this.roleApi);
  }
  //  --------------Delete-------------------
  delete(id:any):Observable<any>{
    return this._HttpClient.delete(this.linkApi+'/'+id);
  }
}
