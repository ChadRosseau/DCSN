import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ViewEncapsulation } from '@angular/core'
import { ArticleService } from '@services/article.service';

// Types
import { ArticleInfo } from '@interfaces/article';
import { StaffProfile } from '@interfaces/staff-profile';
import { DatabaseReference } from '@angular/fire/database/interfaces';

@Component({
  selector: 'app-new-stories',
  templateUrl: './new-stories.component.html',
  styleUrls: ['./new-stories.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewStoriesComponent implements OnInit {
  recentArticles;
  articles: Array<ArticleInfo>;

  constructor(private auth: AuthService, public sharedData: SharedDataService, public articleService: ArticleService) {
  }

  ngOnInit(): void {
    // Fetch data on 3 most recent articles from db.
    this.auth.db.database.ref('liveArticles')
      .orderByChild('writtenDate')
      .limitToLast(3)
      .once('value', (snapshot: any) => {

        if (snapshot.val() != null) {
          this.recentArticles = [];
          this.articles = Object.values(snapshot.val());
          this.articles.sort((a, b) => (a.writtenDate < b.writtenDate) ? 1 : -1);
          for (let i = 0; i < 3; i++) {
            this.loadArrayData(i);
          }
        }
      });
  }

  // Parse custom data from db into reader-friendly versions for display.
  loadArrayData(key) {

    let article = this.articles[key];

    // Format date for article
    const articleDate = new Date(article.writtenDate);
    let date = articleDate.getDate(),
      month = articleDate.getMonth(),
      year = articleDate.getFullYear();

    article['newDate'] = `${this.pad(date)}-${this.pad(month + 1)}-${year}`;

    // Code to get author data
    const authorRef: DatabaseReference = this.auth.db.database.ref(`staffProfiles/${article.author}`);
    authorRef.once('value', (snapshot) => {
      let author: StaffProfile = snapshot.val();
      article.author = `${author.firstName} ${author.lastName}`;
    }).then(() => {
      this.recentArticles.push(article);
      this.recentArticles.sort((a, b) => (a.writtenDate < b.writtenDate) ? 1 : -1);
    });
  }

  // Function used to pad dates into correct format.
  pad(n) {
    return n < 10 ? '0' + n : n;
  }

}
