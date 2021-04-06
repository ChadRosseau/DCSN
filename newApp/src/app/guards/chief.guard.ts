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
    if (this.auth.permission > 1) {
      this.router.navigate(['/']);
      console.log(this.auth.permission)
      console.log("access denied");
      return false;
    }
    return true;
  }

}
