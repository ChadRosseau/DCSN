import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  currentArticleId: string;
  article;
  pageData: {
    categoryColor: string;
    subcategoryColor: string;
    dataLoaded: boolean;
  }

  constructor(private auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    // Set pagedata defaults
    this.pageData = {
      categoryColor: "",
      subcategoryColor: "",
      dataLoaded: false
    }

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

        // Code to set color of tags
        this.setTagColors(articleData.category);

        // Set article data
        this.article = articleData;
        this.pageData.dataLoaded = true;
      });
    });
  }

  setTagColors(category) {
    switch (category) {
      case 'Economy':
        this.pageData.categoryColor = 'rgba(253, 255, 156, 0.85)';
        this.pageData.subcategoryColor = 'rgba(213, 214, 132, 0.6)';
        break;
      case 'Poverty':
        this.pageData.categoryColor = 'rgba(255, 141, 141, 0.85)';
        this.pageData.subcategoryColor = 'rgba(212, 119, 119, 0.6)';
        break;
      case 'Sustainability':
        this.pageData.categoryColor = 'rgb(173, 255, 162, 0.85)';
        this.pageData.subcategoryColor = 'rgba(128, 189, 120, 0.6)';
        break;
      case 'Politics':
        this.pageData.categoryColor = 'rgba(166, 237, 255, 0.85)';
        this.pageData.subcategoryColor = 'rgba(126, 203, 223, 0.6)';
        break;
      default:
        this.pageData.categoryColor = 'rgba(180, 180, 180, 0.85)';
        this.pageData.subcategoryColor = 'rgba(100, 100, 100, 0.6)';
        break;
    }
  }
}
