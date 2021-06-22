import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StaffGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }
  async canActivate(next, state) {
    if (!this.auth.isStaff) {
      this.router.navigate(['/']);
      console.log("access denied");
    }
    return this.auth.isStaff;
  }

  async canActivateChild(next, state) {
    if (!this.auth.isStaff) {
      this.router.navigate(['/']);
      console.log("access denied");
    }
    return this.auth.isStaff;
  }
}
