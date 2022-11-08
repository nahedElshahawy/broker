import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Iadve, IviewAdv } from '../models/iadve';
import { topOffer } from '../pages/catalog/rent/rent.model';

@Injectable({
  providedIn: 'root'
})
export class AdversmentSService {




  constructor( private HttpC: HttpClient) {


   }

  addadversmint(newadv:Iadve):Observable<Iadve>{
    return this.HttpC.post<Iadve>(`http://127.0.0.1:8000/api/advertisment`
    ,JSON.stringify(newadv));
  }


  viewPremAd() {
    return this.HttpC.get(`http://127.0.0.1:8000/api/premAdver`);
    }
  viewrentadv() {
    return this.HttpC.get("http://127.0.0.1:8000/api/gettyperent")
    }
  viewrentadvsel() {
    return this.HttpC.get("http://127.0.0.1:8000/api/gettypesale")
    }
      getadvbyid(id:number) {
    return this.HttpC.get(`http://127.0.0.1:8000/api/getbyid/${id}`);
    }
      getadvsellbyid(id:number) {
    return this.HttpC.get(`http://127.0.0.1:8000/api/VABI/${id}`);
    }


  viewsearch(foor:any,city:any,type:any,price:any) {
    return this.HttpC.post("http://127.0.0.1:8000/api/search",{
      foor,city,type,price
    }

    )
    }






}
