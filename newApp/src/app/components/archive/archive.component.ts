import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  dbArticles;
  articles = [];
  filteredArticles = [];
  articlesData;
  filters: {
    categories: Array<any>,
    subcategories: Array<any>,
    words: Array<any>
  }

  // Active filter rules
  filterRules = {}

  constructor(private auth: AuthService) { }

  ngOnInit(): void {

    this.filters = {
      categories: ["Economy"],
      subcategories: ["Decent Work"],
      words: ["Chad"]
    }

    console.log(this.filters);

    this.dbArticles = this.auth.db.object<any>(`articles/moderating`).valueChanges().subscribe(data => {
      if (data != null) {
        this.articles = [];
        this.articlesData = Object.values(data);
        for (let i = 0; i < this.articlesData.length; i++) {
          this.loadArrayData(i);
        }
        this.applyFilters();
      }
    });
  }

  loadArrayData(key) {

    let article = this.articlesData[key];

    // Set color of article tags
    switch (article.category) {
      case 'Economy':
        article['tagColor'] = 'rgba(253, 255, 156, 0.75)';
        break;
      case 'Poverty':
        article['tagColor'] = 'rgba(255, 141, 141, 0.75)';
        break;
      case 'Sustainability':
        article['tagColor'] = 'rgba(173, 255, 162, 0.75)';
        break;
      case 'Politics':
        article['tagColor'] = 'rgba(166, 237, 255, 0.75)';
        break;
      default:
        article['tagColor'] = 'rgba(180, 180, 180, 0.75)';
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

    this.articles.push(article);
  }

  pad(n) {
    return n < 10 ? '0' + n : n;
  }

  applyFilters() {
    this.filteredArticles = [];
    this.articles.forEach(article => {
      if ((this.filters.categories.includes(article.category) || this.filters.categories.length == 0) &&
        (this.filters.subcategories.includes(article.subcategory) || this.filters.subcategories.length == 0) &&
        (this.checkWords(article.title, article.subtitle, this.filters.words) || this.filters.words.length == 0)) {
        this.filteredArticles.push(article);
      }
    });
  }

  checkWords(title, subtitle, array) {
    let match = false;
    array.forEach(word => {
      if (title.includes(word)) {
        match = true;
      } else if (subtitle.includes(word)) {
        match = true;
      }
    });
    return match;
  }
}
