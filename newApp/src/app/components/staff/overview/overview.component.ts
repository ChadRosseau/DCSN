import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '@services/article.service';
import { AuthService } from '@services/auth.service';
import { SharedDataService } from '@services/shared-data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, OnDestroy {
  articles;
  staffProfiles;

  articleSubscription;
  staffSubscription;

  constructor(public auth: AuthService, public sharedData: SharedDataService, public router: Router, public articleService: ArticleService) { }

  ngOnInit(): void {

    this.staffProfiles = {};

    this.articleSubscription = this.articleService.article$.subscribe(articles => {
      this.articles = {
        drafts: Object.values(articles.drafts),
        moderating: Object.values(articles.moderating),
        onhold: Object.values(articles.onhold)
      }
    })

    this.staffSubscription = this.auth.staff$.subscribe(staff => {
      this.staffProfiles = staff;
    })
  }

  log() {
    console.log(this.articles);
  }

  formatDate(datetime) {
    const articleDate = new Date(datetime);
    let date = articleDate.getDate(),
      month = articleDate.getMonth(),
      year = articleDate.getFullYear();

    return `${this.pad(date)}-${this.pad(month + 1)}-${year}`;
  }

  pad(n) {
    return n < 10 ? '0' + n : n;
  }

  getObjectLen(object) {
    if (object != undefined) {
      return Object.keys(object).length;
    } else {
      return 0;
    }
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
    this.staffSubscription.unsubscribe();
  }
}
