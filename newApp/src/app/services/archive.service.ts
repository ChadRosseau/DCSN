import { Injectable } from '@angular/core';
import { ArticleInfo } from '@interfaces/article';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  // Filters for archive
  filters: {
    categories: Array<any>,
    subcategories: Array<any>,
    words: String
  }

  // Article storage for nav and archive.
  articles: Array<ArticleInfo> = [];
  filteredArticles: Array<ArticleInfo> = [];

  constructor(public sharedData: SharedDataService) {
    this.filters = {
      categories: [],
      subcategories: [],
      words: ""
    }
  }

  fillFilters() {
    // On loading of the page, if no category filter is applied, load all categories.
    if (this.filters.categories.length == 0) {
      this.sharedData.categories.forEach(category => {
        this.filters.categories.push(category);
      });
    }

    // On loading of the page, if a category filter is applied but no subcategory filter is specified, load subcategories filter with all subcategories from that category.
    if (this.filters.categories.length != 0 && this.filters.subcategories.length == 0) {
      this.filters.categories.forEach(category => {
        this.sharedData.subcategories[category].forEach(subcategory => {
          this.filters.subcategories.push(subcategory);
        });
      });
    }
  }

  // Search articles for articles conforming to filters, and load filteredArticles with those articles.
  applyFilters() {
    this.filteredArticles = [];
    this.articles.forEach(article => {
      if ((this.filters.categories.includes(article.category) || this.filters.categories.length == 0) &&
        (this.filters.subcategories.includes(article.subcategory)) &&
        (this.checkWords(article.title, article.subtitle, this.filters.words) || this.filters.words.length == 0)) {
        this.filteredArticles.push(article);
      }
    });
  }

  // Check if article title or subtitle contains search terms.
  checkWords(title, subtitle, string) {
    let array = string.split(" ");

    if (array.length == 1 && array[0] == "") {
      return true;
    } else {
      let match = false;
      array.forEach(word => {
        word = word.toLowerCase();
        if (title.toLowerCase().includes(word) || subtitle.toLowerCase().includes(word)) {
          match = true;
        }
      });
      return match;
    }
  }

  updateFilter(type, category) {
    if (this.filters[type].includes(category)) {
      let index = this.filters[type].indexOf(category);
      this.filters[type].splice(index, 1);
      if (type == "categories") {
        this.sharedData.subcategories[category].forEach(subcategory => {
          let index = this.filters['subcategories'].indexOf(subcategory);
          if (index != -1) {
            this.filters['subcategories'].splice(index, 1);
          }
        });
      }
    } else {
      this.filters[type].push(category)
      if (type == "categories") {
        this.sharedData.subcategories[category].forEach(subcategory => {
          this.filters['subcategories'].push(subcategory);
        });
      }
    }
    this.applyFilters();
  }

  resetFilters() {
    this.filters = {
      categories: [],
      subcategories: [],
      words: ""
    }
    this.fillFilters();
    this.applyFilters();
  }
}
