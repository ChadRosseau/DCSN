import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  article$: Observable<any>;
  liveArticle$: Observable<any>;

  constructor(private auth: AuthService, private router: Router) {
    this.article$ = this.auth.db.object<any>(`articles`).valueChanges();
    this.liveArticle$ = this.auth.db.object<any>(`liveArticles`).valueChanges();
  }
}
