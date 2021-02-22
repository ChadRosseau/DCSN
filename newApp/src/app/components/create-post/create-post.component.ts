import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SharedDataService } from '../../services/shared-data.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AsyncSubject, Subject } from 'rxjs';
import { maxLength } from './maxlength.validator';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {

  newArticle: {
    category: string,
    subcategory: string,
    title: string,
    subtitle: string,
    body: string
  }

  constructor(public auth: AuthService, public sharedData: SharedDataService) { }

  ngOnInit(): void {
    this.newArticle = {
      category: "",
      subcategory: "",
      title: "",
      subtitle: "",
      body: ""
    }
  }

  public currentSubcategories = [];

  setCategory(value) {
    this.currentSubcategories = this.sharedData.subcategories[value];
  }

  private editorSubject: Subject<any> = new AsyncSubject();

  public createArticleForm = new FormGroup({
    title: new FormControl("", Validators.required),
    subtitle: new FormControl("", Validators.required),
    body: new FormControl("", Validators.required, maxLength(this.editorSubject, 10))
  });

  handleEditorInit(e) {
    this.editorSubject.next(e.editor);
    this.editorSubject.complete();
  }

  createArticle(category, subcategory) {
    // Set category and subcategory info
    this.newArticle.category = category;
    this.newArticle.subcategory = subcategory;

    // Get timestamp for operation
    const currentDate = new Date();
    const timestamp = currentDate.getTime();

    // Upload article to db.
    const dbArticlesRef = this.auth.db.database.ref(`articles/moderating`);
    let newPush = dbArticlesRef.push()
    let pushId = newPush.key;
    newPush.set({
      articleId: pushId,
      author: this.auth.userKey,
      category: this.newArticle.category,
      subcategory: this.newArticle.subcategory,
      title: this.newArticle.title,
      subtitle: this.newArticle.subtitle,
      body: this.newArticle.body,
      writtenDate: timestamp
    });
  }
}


