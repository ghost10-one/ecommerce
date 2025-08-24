
import { map, Observable, take } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../serviceProduct/auth.service';
import{
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService , private router : Router) {}
  /**
   * @param  next
   * @param state
   * @return {Observable<boolean> | UrlTree | Promise<boolean | UrlTree> | boolean | UrlTree}
   */

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.AuthState$.pipe(
      take(1),
      map((isAuthenticated: any) => {
        if (isAuthenticated) {
          return true;
        } else {
          console.log('Access denied - Redirected to login');
          return this.router.createUrlTree(['/dashboard/login']);
        }
      })
    );
  }
}




