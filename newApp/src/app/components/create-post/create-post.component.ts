import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SharedDataService } from '../../services/shared-data.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AsyncSubject, Subject } from 'rxjs';
import { maxLength } from './maxlength.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  showErrors;
  writerInfo;
  time = {};
  tinymceInit = {
    icons: 'material',
    skin: 'borderless',
    plugins: 'wordcount',
    placeholder: "Body text for your article here...",
    menubar: false,
    min_height: 450
  };
  public currentImage;


  constructor(public auth: AuthService, public sharedData: SharedDataService, public router: Router) { }

  ngOnInit(): void {
    this.showErrors = false;
    if (!this.time['currentDate']) {
      this.time['currentDate'] = new Date();
      this.time['timestamp'] = this.time['currentDate'].getTime();
      this.time['displayTime'] = this.time['currentDate'].toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    }
    if (this.auth.userKey && !this.writerInfo) {
      this.auth.db.object<any>(`users/${this.auth.userKey}`).valueChanges().subscribe(data => {
        this.writerInfo = data;
      });
    }
  }

  private editorSubject: Subject<any> = new AsyncSubject();

  public createArticleForm = new FormGroup({
    category: new FormControl("", Validators.required),
    subcategory: new FormControl("", Validators.required),
    title: new FormControl("", Validators.required),
    subtitle: new FormControl("", Validators.required),
    thumbURL: new FormControl("", Validators.required),
    body: new FormControl("", Validators.required)
    // body: new FormControl("", Validators.required, maxLength(this.editorSubject, 10))
  });

  handleEditorInit(e) {
    this.editorSubject.next(e.editor);
    this.editorSubject.complete();
  }

  createArticle(destination) {

    if (this.createArticleForm.valid) {

      // Get timestamp for operation
      this.time['currentDate'] = new Date();
      this.time['timestamp'] = this.time['currentDate'].getTime();

      // Upload article to db.
      const dbArticlesRef = this.auth.db.database.ref(`articles/${destination}`);
      let newPush = dbArticlesRef.push()
      let pushId = newPush.key;
      newPush.set({
        articleId: pushId,
        author: this.auth.userKey,
        category: this.createArticleForm.value.category,
        subcategory: this.createArticleForm.value.subcategory,
        title: this.createArticleForm.value.title,
        subtitle: this.createArticleForm.value.subtitle,
        body: this.createArticleForm.value.body,
        thumbURL: this.createArticleForm.value.thumbURL,
        writtenDate: this.time['timestamp']
      });
      this.router.navigate(['/']);
    } else {
      this.showErrors = true;
    }
  }

  imageExists(imageURL) {
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


}


