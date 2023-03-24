import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanLoad, CanActivate {

  constructor(private authService: AuthService,
    private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      //   if(this.authService.auth.id){
      //   return true
      // }
      // console.log(' Blocked by AuthGuard - CanActivate');
      // return false;


  return this.authService.verifyAuthentication()
  .pipe(
        tap( autenticado => {
            if (!autenticado) {
                this.router.navigate(['./auth/login'])
            }
        })
      )

  }


  canLoad(

    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean  {

      return this.authService.verifyAuthentication()
      .pipe(
        tap( autenticado => {
            if (!autenticado) {
                this.router.navigate(['./auth/login'])
            }
        })
      )

      // console.log('canload', true);
      // console.log( route );
      // console.log(segments);
      // if(this.authService.auth.id){
      //   return true
      // }

    //   console.log(' Blocked by AuthGuard - CanLoad');

    // return false;
  }


}
