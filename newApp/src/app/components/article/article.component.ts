import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  currentArticleId: string;
  article;
  dataLoaded;

  constructor(private auth: AuthService, private route: ActivatedRoute, public sharedData: SharedDataService) { }

  ngOnInit(): void {

    // Set pagedata defaults
    this.dataLoaded = false;

    // Fetch current article id from URL.
    this.currentArticleId = this.route.snapshot.paramMap.get('articleId');

    console.log(this.currentArticleId);

    // Fetch data on current article from db.
    const dbPortfolioRef = this.auth.db.database.ref(`articles/moderating/${this.currentArticleId}`);
    dbPortfolioRef.once('value', (snapshot) => {
      let articleData = snapshot.val()
      console.log(articleData)

      // Code to get author data
      const authorRef = this.auth.db.database.ref(`users/${articleData.author}`);
      authorRef.once('value', (snapshot) => {
        let author = snapshot.val();
        console.log(author)
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
        this.dataLoaded = true;
      });
    });
  }

}
