import { Injectable, OnInit } from '@angular/core';
import { Observable ,BehaviorSubject} from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CustomerService   {
  user=new BehaviorSubject({id:0,fullName:'',phone:'',Notes:'',gender:"",category:''});
  addFormShow=new BehaviorSubject(false)
  constructor( private _HttpClient:HttpClient ) {

  }
  showAddCustomer(x:any){
    this.addFormShow.next(x)
  }
  //--------------get All Customer-------------------
    getAllCustomer():Observable<any> {
      return this._HttpClient.get(`${environment.apiUrl}/customers`)
    }
 //--------------get all category-------------------
    getAllCategory():Observable<any>{
      return this._HttpClient.get(`${environment.apiUrl}/catigory`)
  }
   //  --------------add Customer-------------------
   AddCustomer(customer:object):Observable<any>{
    console.log('customer',customer);
    return this._HttpClient.post(`${environment.apiUrl}/customers`,customer);
   }
 //--------------Delete-------------------
delete(id:any):Observable<any>{
  return this._HttpClient.delete(`${environment.apiUrl}/customers/${id}`);
}
 //--------------update-------------------
updateUser(id:any,user:any):Observable<any>{
  console.log(id);
   console.log(`${environment.apiUrl}/customers/`,id,user);
  return this._HttpClient.put(environment.apiUrl+'/'+id,user);
}

}
