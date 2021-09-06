import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { SharedDataService } from '@services/shared-data.service';
import { ArchiveService } from '@services/archive.service';
import { ArticleService } from '@services/article.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})

export class ArchiveComponent implements OnInit, OnDestroy {
  images;
  dbArticles;
  articlesData;
  pageData = {
    filterMenu: false
  }

  articleSubscription;

  constructor(private auth: AuthService, public sharedData: SharedDataService, public archiveService: ArchiveService, public articleService: ArticleService) { }

  ngOnInit(): void {

    this.images = {
      hero1Background: this.sharedData.dcImages.library,
    };

    // Fetch all articles to show, and apply filters.
    this.articleSubscription = this.articleService.liveArticle$.subscribe(data => {
      if (data != null) {
        this.archiveService.articles = [];
        this.articlesData = Object.values(data);
        for (let i = 0; i < this.articlesData.length; i++) {
          this.loadArrayData(i);
        }
        this.archiveService.fillFilters();
        this.archiveService.applyFilters();
      }
    });
  }

  // Parse custom data from db into reader-friendly versions for display.
  loadArrayData(key) {

    let article = this.articlesData[key];

    // Set color of article tags
    switch (article.category) {
      case 'Economy':
        article['tagColor'] = 'rgb(253, 255, 156)';
        break;
      case 'Poverty':
        article['tagColor'] = 'rgb(255, 141, 141)';
        break;
      case 'Sustainability':
        article['tagColor'] = 'rgb(173, 255, 162)';
        break;
      case 'Politics':
        article['tagColor'] = 'rgb(166, 237, 255)';
        break;
      default:
        article['tagColor'] = 'rgb(180, 180, 180)';
        break;
    }

    // Format date for article
    const articleDate = new Date(article.writtenDate);
    let date = articleDate.getDate(),
      month = articleDate.getMonth(),
      year = articleDate.getFullYear();

    article['newDate'] = `${this.pad(date)}-${this.pad(month + 1)}-${year}`;

    article['previewData'] = {
      state: "default",
      bar: "150px",
      barTop: "-10px",
      title: true,
      background: "url('https://static01.nyt.com/images/2021/02/03/us/politics/03dc-repubs-1/03dc-repubs-1-jumbo.jpg?quality=90&auto=webp')"
    }

    this.archiveService.articles.push(article);
  }

  // Function used to pad dates into correct format.
  pad(n) {
    return n < 10 ? '0' + n : n;
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
  }
}
