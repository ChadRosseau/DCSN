import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { AuthService } from '@services/auth.service';
import { SharedDataService } from '@services/shared-data.service';

// Types
import { Article, ArticleInfo } from '@interfaces/article';
import { Criteria, Moderation } from '@interfaces/moderation';
import { StaffProfile } from '@interfaces/staff-profile';
import { DatabaseReference } from '@angular/fire/database/interfaces';

@Component({
  selector: 'app-moderate-article',
  templateUrl: './moderate-article.component.html',
  styleUrls: ['./moderate-article.component.css']
})

export class ModerateArticleComponent implements OnInit {
  currentArticleId: string;
  article: Article | null = null;
  articleInfo: ArticleInfo;
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
    const dbArticleRef: DatabaseReference = this.auth.db.database.ref(`articles/moderating/${this.currentArticleId}`);
    dbArticleRef.once('value', (snapshot) => {
      this.articleInfo = snapshot.val();
    }).then(() => {
      // Get article body data from database.
      const dbArticleBodyRef: DatabaseReference = this.auth.db.database.ref(`articleBodies/${this.currentArticleId}`);
      dbArticleBodyRef.once('value', (snapshot) => {
        // Combine article info with body for display.
        this.article = {
          ...this.articleInfo,
          body: snapshot.val()
        }
      }).then(() => {
        // Get author data
        const authorRef: DatabaseReference = this.auth.db.database.ref(`staffProfiles/${this.article.author}`);
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
      })
    })
  }

  submit() {
    // Get timestamp for moderation.
    this.moderation.timestamp = new Date().getTime();
    // If there are current other moderations, append the new moderation to the array.
    if (this.article.moderations != null) {
      this.article['moderations'][this.auth.staffObject['uid']] = this.moderation;

      // Check to see if article has passed moderations.
      let passCheck = true;

      // If there are 2 or more moderations.
      if (Object.keys(this.article.moderations).length >= 2) {
        Object.values(this.article.moderations).forEach((moderation: Moderation) => {
          if (moderation.publishReady == false) { passCheck = false }
        });
        // If so, move to onhold.
        if (passCheck == true) {
          this.auth.db.database.ref(`articles/onhold/${this.currentArticleId}`).set(this.article);
          this.auth.db.database.ref(`articles/moderating/${this.currentArticleId}`).set(null);

          // Otherwise, move back to drafts with feedback.
        } else {
          this.auth.db.database.ref(`articles/drafts/${this.currentArticleId}`).set(this.article);
          this.auth.db.database.ref(`articles/moderating/${this.currentArticleId}`).set(null);
        }
        // If there are no existing moderations, create and set moderations property on article in db to this moderation.
      } else {
        this.auth.db.database.ref(`articles/moderating/${this.currentArticleId}/moderations/${this.auth.staffObject['uid']}`).set(this.moderation);
      }
    } else {
      this.auth.db.database.ref(`articles/moderating/${this.currentArticleId}/moderations/${this.auth.staffObject['uid']}`).set(this.moderation);
    }

    // Redirect to home
    this.router.navigate(['/staff', 'overview']);
  }

  // Format date
  makeDate(timestamp: number) {
    return new Date(timestamp.toString()).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  // Moving functions for auth.
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
