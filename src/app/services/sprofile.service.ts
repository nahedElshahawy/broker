import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SprofileService {

  constructor( private HttpC: HttpClient) { }


  getuserprofile() {
    return this.HttpC.get(`http://127.0.0.1:8000/api/profile`);
    }

    viewAdvForUser() {
    return this.HttpC.get(`http://127.0.0.1:8000/api/viewAdvForUser`);
    }
    viewAdvdeleted() {
    return this.HttpC.get(`http://127.0.0.1:8000/api/viewAdvdeleted`);
    }
  updateprofile(data: any){
    return this.HttpC.post(`http://127.0.0.1:8000/api/updateProfile`,data);
    }
    addtoarchefAdv(id: number){
    return this.HttpC.delete(`http://127.0.0.1:8000/api/advertisment/${id}`);
    }
    forcedeleteAdv(id: number){
    return this.HttpC.delete(`http://127.0.0.1:8000/api/forcedelerAdv/${id}`);
    }
    restorearchive(id: number){
    return this.HttpC.get(`http://127.0.0.1:8000/api/restoredelred/${id}`);
    }

  }
