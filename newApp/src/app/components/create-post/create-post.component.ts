import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SharedDataService } from '../../services/shared-data.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AsyncSubject, Subject } from 'rxjs';
import { maxLength } from './maxlength.validator';
<<<<<<< HEAD
import { TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { express } from 'express';
import { jwt } from 'jsonwebtoken';
import { cors } from 'cors';

import { environment } from '../../../environments/environment';
=======
>>>>>>> parent of c269c95... incorporated text editor

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {

<<<<<<< HEAD
  currentSubcategories;
  privateKey;
  tinyInit;
=======
  newArticle: {
    category: string,
    subcategory: string,
    title: string,
    subtitle: string,
    body: string
  }
>>>>>>> parent of c269c95... incorporated text editor

  // public express = express;
  // public jwt = jwt;
  // public cord = cors;

  constructor(
    public auth: AuthService,
    public sharedData: SharedDataService,
    // public express: express,
    // public jwt: jwt,
    // public cord: cors
  ) { }


  ngOnInit(): void {
<<<<<<< HEAD

    const app = express();
    app.use(cors());
    this.privateKey = environment.privateKey;

    app.post("/jwt", function (req, res) {
      const payload = {
        sub: this.auth.userKey, // Unique user id string
        name: this.auth.userKey, // Full name of user
        exp: Math.floor(Date.now() / 1000) + 60 * 10, // 10 minutes expiration
      };
      try {
        const token = jwt.sign(payload, this.privateKey, { algorithm: "RS256" });
        res.set("content-type", "application/json");
        res.status(200);
        res.send(
          JSON.stringify({
            token: token,
          })
        );
      } catch (e) {
        res.status(500);
        res.send(e.message);
      }
    });

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
        "emoticons template paste textcolor colorpicker textpattern",
        "tinydrive"
      ],
      tinydrive_token_provider: function (success, failure) {
        success({ token: "jwt-token" }); failure('Could not create a jwt token');
      },
      // tinydrive_upload_path: "/some/other/path",
      toolbar: "insertfile",
      menu: {
        insert: { title: "Insert", items: "insertfile" },
      },
      menubar: false,
      min_height: 150
=======
    this.newArticle = {
      category: "",
      subcategory: "",
      title: "",
      subtitle: "",
      body: ""
>>>>>>> parent of c269c95... incorporated text editor
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

<<<<<<< HEAD


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
=======
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
>>>>>>> parent of c269c95... incorporated text editor
  }
}


