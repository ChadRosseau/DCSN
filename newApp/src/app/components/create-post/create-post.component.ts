import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SharedDataService } from '../../services/shared-data.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AsyncSubject, Subject } from 'rxjs';
import { maxLength } from './maxlength.validator';
import { TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {

  currentSubcategories;

  tinyInit;

  constructor(public auth: AuthService, public sharedData: SharedDataService) { }

  ngOnInit(): void {
    this.currentSubcategories = [];
    console.log(TINYMCE_SCRIPT_SRC);
    this.tinyInit = {
      icons: 'material',
      skin: 'borderless',
      // plugins: 'wordcount',
      plugins: [
        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars code fullscreen",
        "insertdatetime media nonbreaking save table contextmenu directionality",
        "emoticons template paste textcolor colorpicker textpattern"
      ],
      menubar: false,
      min_height: 150
    }
  }

  setCategory(value) {
    this.currentSubcategories = this.sharedData.subcategories[value];
    console.log(value);
    console.log(this.sharedData.subcategories[value]);
    console.log(this.currentSubcategories)
  }

  private editorSubject: Subject<any> = new AsyncSubject();

  public createArticleForm = new FormGroup({
    title: new FormControl("", Validators.required),
    category: new FormControl("", Validators.required),
    subcategory: new FormControl("", Validators.required),
    subtitle: new FormControl("", Validators.required),
    body: new FormControl("", Validators.required, maxLength(this.editorSubject, 10))
  });

  handleEditorInit(e) {
    this.editorSubject.next(e.editor);
    this.editorSubject.complete();
  }

  // createArticle(category, subcategory) {
  //   // Set category and subcategory info
  //   this.newArticle.category = category;
  //   this.newArticle.subcategory = subcategory;

  //   // Get timestamp for operation
  //   const currentDate = new Date();
  //   const timestamp = currentDate.getTime();

  //   // Upload article to db.
  //   const dbArticlesRef = this.auth.db.database.ref(`articles/moderating`);
  //   let newPush = dbArticlesRef.push()
  //   let pushId = newPush.key;
  //   newPush.set({
  //     articleId: pushId,
  //     author: this.auth.userKey,
  //     category: this.newArticle.category,
  //     subcategory: this.newArticle.subcategory,
  //     title: this.newArticle.title,
  //     subtitle: this.newArticle.subtitle,
  //     body: this.newArticle.body,
  //     writtenDate: timestamp
  //   });
  // }

  log(input) {
    console.log(input);
  }
}


