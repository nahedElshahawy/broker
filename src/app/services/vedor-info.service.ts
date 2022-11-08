import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VedorInfoService {

  constructor(private HttpC: HttpClient) { }

  getuserSellAdv(ID:number) {
    return this.HttpC.get(`http://127.0.0.1:8000/api/vAdvforuserselle/${ID}`);
    }
  getuserRentAdv(ID:number) {
    return this.HttpC.get(`http://127.0.0.1:8000/api/vAdvforuserrent/${ID}`);
    }
  getuserdata(ID:number) {
    return this.HttpC.get(`http://127.0.0.1:8000/api/userinfo/${ID}`);
    }



}
