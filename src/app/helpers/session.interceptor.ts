import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders,
  HttpClientXsrfModule,
  HttpXsrfTokenExtractor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {
  token: any;
  cookieValue: any;
  userdata: any;
  xsrftoken: any
  constructor(private useraccounService:AuthenticationService , private router:Router,private cookieService: CookieService ,private HttpClientX:HttpXsrfTokenExtractor) {
    this.token = this.cookieService.get('jwt');
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request =request.clone({
      withCredentials: true,
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.token}`


        },)
    });
    return next.handle(request);
    // .pipe(
    //   tap(() => {} ,

    //     (err:any)=>{
    //       if (err instanceof HttpErrorResponse){
    //             if(err.status !== 401 && err.status !==500){
    //               return;
    //             }
    //               this.useraccounService.logout();
    //               this.router.navigate(['/auth/signin']);
    //           }
    //     }
    //   )
    // )
  }
}
