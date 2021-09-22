import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChiefGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  async canActivate(next, state) {
    if (this.auth.staffObject.permission <= 1) {
      return true;
    }
    this.router.navigate(['/']);
    console.log("access denied - not editor in chief");
    return false;
  }

}
