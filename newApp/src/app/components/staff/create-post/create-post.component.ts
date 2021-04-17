import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { SharedDataService } from '../../../services/shared-data.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AsyncSubject, Subject } from 'rxjs';
import { maxLength } from './maxlength.validator';
import { Router, ActivatedRoute } from '@angular/router';
import { getLocaleTimeFormat } from '@angular/common';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit, OnDestroy {
  showErrors;
  time = {};
  tinymceInit = {
    // icons: 'material',
    skin: 'borderless',
    plugins: 'wordcount',
    placeholder: "Body text for your article here...",
    // menubar: false,
    min_height: 450,
    contextmenu: 'link image imagetools table spellchecker lists',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  };

  currentArticleId;
  createArticleForm = new FormGroup({
    category: new FormControl("", Validators.required),
    subcategory: new FormControl("", Validators.required),
    title: new FormControl("", Validators.required),
    subtitle: new FormControl("", Validators.required),
    thumbURL: new FormControl("", Validators.required),
    body: new FormControl("", Validators.required)
  });
  writerInfo;
  currentImage;
  referencesList: Array<any>;
  casList: Array<any>;

  staffSubscription;


  constructor(public auth: AuthService, public sharedData: SharedDataService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.writerInfo = {};
    this.currentArticleId = this.route.snapshot.paramMap.get('articleId');
    if (!this.currentArticleId) {
      this.loadEmptyTemplate();
    } else {
      this.loadFullTemplate(this.currentArticleId);
    }
    this.showErrors = false;

    this.getTime();

  }

  private editorSubject: Subject<any> = new AsyncSubject();

  loadEmptyTemplate() {
    if (this.auth.staffObject) {
      this.writerInfo = this.auth.staffObject;
    }
    this.referencesList = [];
    this.casList = [];
  }

  loadFullTemplate(articleId) {
    let dbArticleRef = this.auth.db.database.ref(`articles/drafts/${articleId}`);
    dbArticleRef.once('value', (snapshot) => {
      let articleObject = snapshot.val();
      if (articleObject) {
        this.createArticleForm = new FormGroup({
          category: new FormControl(articleObject.category, Validators.required),
          subcategory: new FormControl(articleObject.subcategory, Validators.required),
          title: new FormControl(articleObject.title, Validators.required),
          subtitle: new FormControl(articleObject.subtitle, Validators.required),
          thumbURL: new FormControl(articleObject.thumbURL, Validators.required),
          body: new FormControl(articleObject.body, Validators.required),
        });
        this.imageExists(articleObject.thumbURL);
        this.referencesList = articleObject.references || [];
        this.casList = articleObject.cas || [];
        this.staffSubscription = this.auth.staff$.subscribe(data => {
          this.writerInfo = data[articleObject.author];
        });
      } else {
        this.router.navigate(['/']);
      }
    })
  }




  handleEditorInit(e) {
    this.editorSubject.next(e.editor);
    this.editorSubject.complete();
  }

  imageExists(imageURL) {
    // Play loading gif while fetching.
    this.currentImage = "url('https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif')";

    fetch(imageURL, { method: 'HEAD' })
      .then(res => {
        if (res.status == 404) {
          this.currentImage = "url('../../../assets/images/image-not-found.jpg')";
        } else {
          this.currentImage = `url('${imageURL}')`;
        }
      }).catch(err => {
        if (err == 'TypeError: Failed to fetch') {
          this.currentImage = `url('${imageURL}')`;
        }
      });
  }

  addListing(list, value) {
    if (value != "") {
      this[list].push(value);
    }
  }

  removeListing(list, index) {
    this[list].splice(index, 1);
  }

  createArticle(destination) {

    if (this.createArticleForm.valid) {

      // Get timestamp for operation
      this.time['currentDate'] = new Date();
      this.time['timestamp'] = this.time['currentDate'].getTime();

      let dbArticlesRef;
      // Upload article to db.
      if (this.currentArticleId) {
        dbArticlesRef = this.auth.db.database.ref(`articles/${destination}/${this.currentArticleId}`);
      } else {
        dbArticlesRef = this.auth.db.database.ref(`articles/${destination}/`);
        this.currentArticleId = dbArticlesRef.push().key;
        dbArticlesRef = this.auth.db.database.ref(`articles/${destination}/${this.currentArticleId}`);
      }
      dbArticlesRef.set({
        articleId: this.currentArticleId,
        author: this.writerInfo.uid,
        category: this.createArticleForm.value.category,
        subcategory: this.createArticleForm.value.subcategory,
        title: this.createArticleForm.value.title,
        subtitle: this.createArticleForm.value.subtitle,
        body: this.createArticleForm.value.body,
        thumbURL: this.createArticleForm.value.thumbURL,
        writtenDate: this.time['timestamp'],
        cas: this.casList,
        references: this.referencesList
      });
      if (destination == 'moderating') {
        this.auth.db.database.ref(`articles/drafts/${this.currentArticleId}`).set(null);
      }
      this.router.navigate(['/staff', 'overview']);
    } else {
      this.showErrors = true;
    }
  }

  getTime() {
    if (!this.time['currentDate']) {
      this.time['currentDate'] = new Date();
      this.time['timestamp'] = this.time['currentDate'].getTime();
      this.time['displayTime'] = this.time['currentDate'].toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    }
  }

  trackByFn(index, item) { return index; }

  ngOnDestroy(): void {
    if (this.staffSubscription) {
      this.staffSubscription.unsubscribe();
    }
  }
}


