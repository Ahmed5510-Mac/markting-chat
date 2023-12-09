import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor() { }
  url = 'http://localhost:3000/locations';
}
