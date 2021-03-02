import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ViewEncapsulation } from '@angular/core'
@Component({
  selector: 'app-new-stories',
  templateUrl: './new-stories.component.html',
  styleUrls: ['./new-stories.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewStoriesComponent implements OnInit {
  recentArticles;
  articlesData;


  constructor(private auth: AuthService, public sharedData: SharedDataService) {
    // Fetch data on current article from db.
    this.auth.db.object<any>(`articles/moderating`).valueChanges().subscribe(data => {
      if (data != null) {
        this.recentArticles = [];
        this.articlesData = Object.values(data);
        this.articlesData.sort((a, b) => (a.writtenDate < b.writtenDate) ? 1 : -1);
        for (let i = 0; i < 3; i++) {
          this.loadArrayData(i);
        }
        console.log(this.recentArticles);
      }
    });
  }

  ngOnInit(): void {
  }

  // Parse custom data from db into reader-friendly versions for display.
  loadArrayData(key) {

    let article = this.articlesData[key];

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

    // Code to get author data
    const authorRef = this.auth.db.database.ref(`users/${article.author}`);
    authorRef.once('value', (snapshot) => {
      let author = snapshot.val();
      article.author = author;
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
