import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private router: Router,
    private loginService: LoginService
    ) {
  }

  verifyToken(hash:string): any{

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {

    let token;
    token = localStorage.getItem('token');
    console.log(state.url, 'state')
    console.log(route, 'route')
    if (token != null){
      let verify = { token: token }
      this.loginService.verifyToken(verify).subscribe(
        data => {
          return true
        },
        error => {
          this.router.navigate(['/auth/login'])
          localStorage.removeItem('token')
          return false
        }
      )
    }else{
      this.router.navigate(['/auth/login'])
      return false
    }
  }

}
