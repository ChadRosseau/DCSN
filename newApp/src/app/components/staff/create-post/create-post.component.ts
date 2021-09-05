import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { SharedDataService } from '../../../services/shared-data.service';

import 'tinymce';
import 'tinymce/icons/default';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AsyncSubject, Subject } from 'rxjs';
import { maxLength } from './maxlength.validator';
import { Router, ActivatedRoute } from '@angular/router';
import { getLocaleTimeFormat } from '@angular/common';
import { TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

declare var tinymce;

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit, AfterViewInit, OnDestroy {
  showErrors;
  time = {};
  staffList;
  // public tinymce = tinymce.get()

  currentArticleId;
  createArticleForm = new FormGroup({
    category: new FormControl("?", Validators.required),
    subcategory: new FormControl("?", Validators.required),
    title: new FormControl("", Validators.required),
    subtitle: new FormControl("", Validators.required),
    thumbURL: new FormControl("", Validators.required),
    body: new FormControl("", Validators.required)
  });
  writerInfo;
  currentImage;
  referencesList: Array<any>;
  casList: Array<any>;

  moderations;
  staffSubscription;


  constructor(public auth: AuthService, public sharedData: SharedDataService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.writerInfo = {};
    this.currentArticleId = this.route.snapshot.paramMap.get('articleId');
    this.showErrors = false;
    this.getTime();

  }

  private editorSubject: Subject<any> = new AsyncSubject();

  ngAfterViewInit() {

    tinymce.init({
      base_url: '/tinymce', // Root for resources
      suffix: '.min',        // Suffix to use when loading resources
      selector: '#bodyEditor',
      plugins: 'wordcount image autoresize',
      min_height: 450,
      placeholder: "Body text for your article here...",
      contextmenu: 'link image imagetools table spellchecker lists',
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',

      // Images
      image_title: true,
      automatic_uploads: true,
      file_picker_types: 'image',
      /* and here's our custom image picker*/
      file_picker_callback: function (cb, value, meta) {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');

        /*
          Note: In modern browsers input[type="file"] is functional without
          even adding it to the DOM, but that might not be the case in some older
          or quirky browsers like IE, so you might want to add it to the DOM
          just in case, and visually hide it. And do not forget do remove it
          once you do not need it anymore.
        */

        input.onchange = () => {
          var file = input.files[0];

          var reader = new FileReader();
          reader.onload = () => {
            /*
              Note: Now we need to register the blob in TinyMCEs image blob
              registry. In the next release this part hopefully won't be
              necessary, as we are looking to handle it internally.
            */
            var id = 'blobid' + (new Date()).getTime();
            var blobCache = tinymce.activeEditor.editorUpload.blobCache;
            var base64 = (<string>reader.result).split(',')[1];
            var blobInfo = blobCache.create(id, file, base64);
            blobCache.add(blobInfo);

            /* call the callback and populate the Title field with the file name */
            cb(blobInfo.blobUri(), { title: file.name });
          };
          reader.readAsDataURL(file);
        };

        input.click();
      },
    });
    tinymce.get("bodyEditor").on('init', (e) => {
      tinymce.get("bodyEditor").setContent("");
      tinymce.images_upload_url = "./postAcceptor.php";
      if (!this.currentArticleId) {
        this.loadEmptyTemplate();
      } else {
        this.loadFullTemplate(this.currentArticleId);
      }
    });

    tinymce.activeEditor.on('blur', (e) => {
      this.fetchBody();
    })
  }

  loadEmptyTemplate() {
    if (this.auth.staffObject) {
      this.writerInfo = this.auth.staffObject;
    }
    this.referencesList = [];
    this.casList = [];
    this.moderations = [];
    this.createArticleForm.patchValue({
      subcategory: new FormControl({ value: "?", disabled: this.createArticleForm.value.category == '?' }, Validators.required)
    })
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
          body: new FormControl("", Validators.required)
        });
        tinymce.get("bodyEditor").setContent(articleObject.body);
        this.fetchBody();
        this.imageExists(articleObject.thumbURL);
        this.referencesList = articleObject.references || [];
        this.casList = articleObject.cas || [];
        this.moderations = Object.values(articleObject.moderations) || [];
        this.staffSubscription = this.auth.staff$.subscribe(data => {
          this.staffList = data;
          this.writerInfo = data[articleObject.author];
        });
      } else {
        this.router.navigate(['/']);
      }
    })
  }

  fetchBody() {
    this.createArticleForm.patchValue({
      body: tinymce.activeEditor.getContent()
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

      this.fetchBody();
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
        cas: this.casList.length > 0 ? this.casList : [" "],
        references: this.referencesList.length > 0 ? this.referencesList : [" "],
        moderations: destination == 'moderating' ? [] : this.moderations
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

  makeTime(timestamp) {
    return new Date(timestamp).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  getStaffName(uid) {
    let author = this.staffList[uid];
    return `${author['firstName']} ${author['lastName']}`;
  }

  trackByFn(index, item) { return index; }

  ngOnDestroy(): void {
    if (this.staffSubscription) {
      this.staffSubscription.unsubscribe();
    }
    tinymce.remove('#bodyEditor');
  }
}


