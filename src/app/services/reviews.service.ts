import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Addrev } from '../models/addrev';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }

    getreviewsofAdv(userId: number){

      return  this.http.get(`http://127.0.0.1:8000/api/rate/${userId}`)
    }
    addreviews(data:Addrev){

      return  this.http.post(`http://127.0.0.1:8000/api/rate`,data)
    }

}
