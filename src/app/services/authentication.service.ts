import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { UserAccount } from '../models/user-account';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  token: any;
  cookieValue: any;
  userdata: any;


   httpOptions = {
    // headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    // withCredentials: true,

  };


  private useraccountSubject:BehaviorSubject<UserAccount>
  public user:Observable<UserAccount>;
  userloggedin$:Observable<boolean>;

  constructor(private httpC: HttpClient , private router: Router ,private cookieService: CookieService) {
    this.useraccountSubject = new BehaviorSubject<UserAccount>(null as any);
    this.user =this.useraccountSubject.asObservable();
    this.userloggedin$ =this.user.pipe(map(user => !!user));

    const cookieExists: boolean = this.cookieService.check('jwt');

    if (cookieExists){
  this.token = this.cookieService.get('jwt');
  this.userdata = jwt_decode(this.token);
  const user =this.userdata;
if (user){
  var string1 = JSON.stringify(user);
  this.useraccountSubject.next(JSON.parse(string1));


}
}



}

data:any;

  loginuser(email:string ,password:string){
    return this.httpC.post<any>(`http://127.0.0.1:8000/api/login`
    ,{email ,password },this.httpOptions).pipe(map((tok:any)=>{
      this.cookieService.set('jwt', tok.token,{ expires: 1, sameSite: 'Lax' });

      this.useraccountSubject.next(jwt_decode(tok.token));

      return tok;

    }));

    };


  logout() {
  this.httpC.post('http://127.0.0.1:8000/api/logout',this.httpOptions).subscribe(
    response => {

      this.useraccountSubject.next({} as any);
     this.cookieService.delete('jwt');
     this.router.navigate(['/']);
      setTimeout( () => {window.location.reload() }, 500 );

    }
  )
 }

 register(name:string ,email:string ,password:string){
  return this.httpC.post<any>(`http://127.0.0.1:8000/api/register`
  ,{name,email ,password },this.httpOptions);

}
}


