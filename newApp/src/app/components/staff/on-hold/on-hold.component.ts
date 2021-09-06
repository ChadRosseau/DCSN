import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { AuthService } from '@services/auth.service';
import { SharedDataService } from '@services/shared-data.service';

// Types
import { Article } from '@interfaces/article';
import { StaffProfile } from '@interfaces/staff-profile';

@Component({
  selector: 'app-on-hold',
  templateUrl: './on-hold.component.html',
  styleUrls: ['./on-hold.component.css']
})
export class OnHoldComponent implements OnInit {
  currentArticleId: string;
  article: Article | null = null;
  author: StaffProfile | null;
  date: String = "";
  dataLoaded: boolean = false;

  constructor(public auth: AuthService, private route: ActivatedRoute, public sharedData: SharedDataService, private cd: ChangeDetectorRef, private ngZone: NgZone, private router: Router) {
    this.author = null;
  }

  ngOnInit(): void {

    // Set pagedata defaults
    this.article = null;
    this.dataLoaded = false;

    // Fetch current article id from URL.
    this.currentArticleId = this.route.snapshot.paramMap.get('articleId');

    // Fetch data on current article from db.
    const dbArticleRef = this.auth.db.database.ref(`articles/onhold/${this.currentArticleId}`);
    dbArticleRef.once('value', (snapshot) => {
      let articleData = snapshot.val()
      this.article = articleData;
      console.log(this.article)
    }).then(() => {
      // Get author data
      const authorRef = this.auth.db.database.ref(`staffProfiles/${this.article.author}`);
      authorRef.once('value', (snapshot) => {
        this.author = snapshot.val();
      }).then(() => {

        // Convert timestamp
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

  submit(destination) {
    if (this.auth.staffObject.permission > 2) return;
    if (destination == 'live') {
      this.auth.db.database.ref(`liveArticles/${this.currentArticleId}`).set(this.article);
    } else {
      this.auth.db.database.ref(`articles/${destination}/${this.currentArticleId}`).set(this.article);
    }
    this.auth.db.database.ref(`articles/onhold/${this.currentArticleId}`).set(null);
    this.router.navigate(['/staff', 'overview']);
  }

  makeDate(timestamp: number) {
    return new Date(timestamp.toString()).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

}
