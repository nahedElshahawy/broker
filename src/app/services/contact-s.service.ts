import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactSService {

  constructor(private HttpC: HttpClient) {




  }
  addcontact(con:any){
    return this.HttpC.post(`http://127.0.0.1:8000/api/contact`
    ,JSON.stringify(con));
  }
}
