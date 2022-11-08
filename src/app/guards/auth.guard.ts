import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { AuthenticationService } from '../services/authentication.service';
import { map } from 'lodash';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  token: any;
  cookieValue: any;
  userdata: any;
  constructor(private cookieService: CookieService, private router: Router ,private useraccountse:AuthenticationService) {



  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {


    this.cookieValue = this.cookieService.get('jwt');
    const cookieExists: boolean = this.cookieService.check('jwt');

    this.token = this.cookieValue;
    this.userdata = jwt_decode(this.token);

        console.log(this.userdata);
    if (this.token && this.userdata.isbanned === 0 && cookieExists) {
      return true;
    } else {
      this.router.navigate(['/home1']);
    }
    return false;

  }

}
