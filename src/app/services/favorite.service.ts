import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private HttpC: HttpClient) { }




  getFavoriteAdv( ) {
    return this.HttpC.get(`http://127.0.0.1:8000/api/favorites`);
    }
 deletFavoriteAdv(ID:number ) {
    return this.HttpC.delete(`http://127.0.0.1:8000/api/favorites/${ID}`);
    }
 addtoFavorte(advert_id:number ) {
    return this.HttpC.post(`http://127.0.0.1:8000/api/favorites`,{
      advert_id
    });
    }

  }
