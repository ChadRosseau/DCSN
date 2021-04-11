import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { SharedDataService } from '@services/shared-data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  articles;
  staffProfiles;

  constructor(public auth: AuthService, public sharedData: SharedDataService, public router: Router) { }

  ngOnInit(): void {
    this.articles = {
      drafts: [],
      moderating: []
    };

    this.auth.db.object<any>('articles').valueChanges().subscribe(articles => {
      this.articles = {
        drafts: Object.values(articles.drafts),
        moderating: Object.values(articles.moderating)
      }
    })

    this.auth.db.object<any>('staffProfiles').valueChanges().subscribe(staff => {
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
}
