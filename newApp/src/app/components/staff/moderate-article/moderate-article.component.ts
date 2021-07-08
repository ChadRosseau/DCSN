import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { SharedDataService } from '@services/shared-data.service';

@Component({
  selector: 'app-moderate-article',
  templateUrl: './moderate-article.component.html',
  styleUrls: ['./moderate-article.component.css']
})
export class ModerateArticleComponent implements OnInit {
  article;
  currentArticleId;
  dataLoaded;
  showErrors;

  constructor(public auth: AuthService, public sharedData: SharedDataService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentArticleId = this.route.snapshot.paramMap.get('articleId');
    this.showErrors = false;
    const dbPortfolioRef = this.auth.db.database.ref(`articles/moderating/${this.currentArticleId}`);
    dbPortfolioRef.once('value', (snapshot) => {
      let articleData = snapshot.val()

      // Code to get author data
      const authorRef = this.auth.db.database.ref(`users/${articleData.author}`);
      authorRef.once('value', (snapshot) => {
        let author = snapshot.val();
        articleData.author = author;
      }).then(() => {

        // Code to convert timestamp
        const articleDate = new Date(articleData.writtenDate).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
        articleData.writtenDate = articleDate;

        // Set article data
        this.article = articleData;
        console.log(this.article)
        this.dataLoaded = true;
      });
    });
  }

}
