import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeadGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  async canActivate(next, state) {
    if (this.auth.staffObject.permission > 2) {
      this.router.navigate(['/']);
      console.log(this.auth.staffObject.permission)
      console.log("access denied - not a department head");
      return false;
    }
    return true;
  }

}
