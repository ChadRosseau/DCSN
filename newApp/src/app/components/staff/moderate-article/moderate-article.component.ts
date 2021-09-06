import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { AuthService } from '@services/auth.service';
import { SharedDataService } from '@services/shared-data.service';

// Types
import { Article } from '@interfaces/article';
import { Criteria, Moderation } from '@interfaces/moderation';
import { StaffProfile } from '@interfaces/staff-profile';

@Component({
  selector: 'app-moderate-article',
  templateUrl: './moderate-article.component.html',
  styleUrls: ['./moderate-article.component.css']
})

export class ModerateArticleComponent implements OnInit {
  currentArticleId: string;
  article: Article | null = null;
  author: StaffProfile | null;
  date: String = "";
  dataLoaded: boolean = false;
  moderation: Moderation;

  constructor(public auth: AuthService, private route: ActivatedRoute, public sharedData: SharedDataService, private cd: ChangeDetectorRef, private ngZone: NgZone, private router: Router) {
    this.author = null;
  }

  ngOnInit(): void {

    // Empty moderation, overwritten if there is subsequently one fetched.
    this.moderation = <Moderation>{
      checklist: <Criteria>{
        criteria: false,
        neutral: false,
        law: false,
        language: false,
        references: false,
        cas: false,
        graphics: false
      },
      publishReady: false,
      comments: "",
      author: this.auth.staffObject.uid
    }

    // Fetch current article id from URL.
    this.currentArticleId = this.route.snapshot.paramMap.get('articleId');

    // Fetch data on current article from db.
    const dbArticleRef = this.auth.db.database.ref(`articles/moderating/${this.currentArticleId}`);
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

        // Get current moderation by user (if any)
        if (this.article.moderations) {
          if (this.article.moderations[this.auth.staffObject['uid']]) {
            this.moderation = this.article.moderations[this.auth.staffObject['uid']];
          }
        }

        // Set article data
        this.dataLoaded = true;
        this.cd.detectChanges();
      })
    });
  }

  submit() {
    this.moderation.timestamp = new Date().getTime();
    if (this.article.moderations != null) {
      this.article['moderations'][this.auth.staffObject['uid']] = this.moderation;
      if (Object.keys(this.article.moderations).length >= 2) {
        let passCheck = true;
        Object.values(this.article.moderations).forEach((moderation: Moderation) => {
          if (moderation.publishReady == false) { passCheck = false }
        });
        if (passCheck == true) {
          this.auth.db.database.ref(`articles/onhold/${this.currentArticleId}`).set(this.article);
          this.auth.db.database.ref(`articles/moderating/${this.currentArticleId}`).set(null);
        } else {
          this.auth.db.database.ref(`articles/drafts/${this.currentArticleId}`).set(this.article);
          this.auth.db.database.ref(`articles/moderating/${this.currentArticleId}`).set(null);
        }
      } else {
        this.auth.db.database.ref(`articles/moderating/${this.currentArticleId}/moderations/${this.auth.staffObject['uid']}`).set(this.moderation);
      }
    } else {
      this.auth.db.database.ref(`articles/moderating/${this.currentArticleId}/moderations/${this.auth.staffObject['uid']}`).set(this.moderation);
    }
    this.router.navigate(['/staff', 'overview']);
  }

  makeDate(timestamp: number) {
    return new Date(timestamp.toString()).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  authMove(destination) {
    if (this.auth.staffObject.permission > 2) return;
    if (destination == 'live') {
      this.auth.db.database.ref(`liveArticles/${this.currentArticleId}`).set(this.article);
    } else {
      this.auth.db.database.ref(`articles/${destination}/${this.currentArticleId}`).set(this.article);
    }
    this.auth.db.database.ref(`articles/moderating/${this.currentArticleId}`).set(null);
    this.router.navigate(['/staff', 'overview']);
  }
}
