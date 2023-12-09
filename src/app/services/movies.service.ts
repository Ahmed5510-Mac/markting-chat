import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MoviesService implements OnInit{

  constructor(private _HttpClient:HttpClient) { }
  ngOnInit(): void {
   this._HttpClient.get(``)
  }


 getTrindingMovise(mediatype:any):Observable<any>  {
  return this._HttpClient.get(`https://api.themoviedb.org/3/trending/${mediatype}/week?api_key=f90921c99796feeb83e028ed6ca319b9`)
}


}
