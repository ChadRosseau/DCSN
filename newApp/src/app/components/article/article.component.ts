import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from '@services/shared-data.service';
import { AuthService } from '@services/auth.service';

// Types
import { Article } from '@interfaces/article';
import { StaffProfile } from '@interfaces/staff-profile';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit {
  currentArticleId: string;
  article: Article | null = null;
  author: StaffProfile;
  date: String;
  dataLoaded: boolean = false;

  constructor(public auth: AuthService, private route: ActivatedRoute, public sharedData: SharedDataService, private cd: ChangeDetectorRef, private ngZone: NgZone) {
  }

  ngOnInit(): void {
    // Fetch current article id from URL.
    this.currentArticleId = this.route.snapshot.paramMap.get('articleId');

    // Fetch data on current article from db.
    const dbPortfolioRef = this.auth.db.database.ref(`liveArticles/${this.currentArticleId}`);
    dbPortfolioRef.once('value', (snapshot) => {
      let articleData = snapshot.val()
      this.article = articleData;
    }).then(() => {
      // Code to get author data
      const authorRef = this.auth.db.database.ref(`staffProfiles/${this.article.author}`);
      authorRef.once('value', (snapshot) => {
        this.author = snapshot.val();
      }).then(() => {

        // Code to convert timestamp
        const articleDate = new Date(this.article.writtenDate).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
        this.date = articleDate;

        // Set article data
        this.dataLoaded = true;
        this.cd.detectChanges();
      })
    });
  }

}
