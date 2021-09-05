import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  article$;

  constructor(private auth: AuthService, private router: Router) {
    this.article$ = this.auth.db.object<any>(`liveArticles`).query;
  }
}
