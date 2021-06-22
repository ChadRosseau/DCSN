import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userObject;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    if (this.auth.user$) {
      this.auth.user$.subscribe(u => {
        this.userObject = u;
      })
    }
  }

}
