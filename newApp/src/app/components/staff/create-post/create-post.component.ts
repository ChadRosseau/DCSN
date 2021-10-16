// Angular
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Services
import { AuthService } from '../../../services/auth.service';
import { SharedDataService } from '../../../services/shared-data.service';

// Tinymce - Rich text editor
import 'tinymce';
import 'tinymce/icons/default';
declare var tinymce;

// RXJS
import { AsyncSubject, Subject, Subscription } from 'rxjs';

// Types
import { Moderation } from '@interfaces/moderation';
import { DraftArticleInfo } from '@interfaces/article';
import { StaffList, StaffProfile } from '@interfaces/staff-profile';
import { DatabaseReference } from '@angular/fire/database/interfaces';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit, AfterViewInit, OnDestroy {
  showErrors: boolean;
  time = {};

  currentArticleId;
  createArticleForm = new FormGroup({
    category: new FormControl("?", Validators.required),
    subcategory: new FormControl("?", Validators.required),
    title: new FormControl("", Validators.required),
    subtitle: new FormControl("", Validators.required),
    thumbURL: new FormControl("", Validators.required),
    body: new FormControl("", Validators.required)
  });
  currentImage: string;
  referencesList: Array<String>;
  casList: Array<String>;
  moderations: Array<Moderation> | [];

  writerInfo: StaffProfile;
  staffList: StaffList;
  subscriptions: Array<Subscription> = [];


  constructor(public auth: AuthService, public sharedData: SharedDataService, public router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) { }

  // On page load
  ngOnInit(): void {
    this.currentArticleId = this.route.snapshot.paramMap.get('articleId');
    this.getTime();
    this.showErrors = false;
    this.moderations = [];
  }

  private editorSubject: Subject<any> = new AsyncSubject();

  // Initialise text editor after viewport loads
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
      this.tieBody();
    })
  }

  // Load empty draft template
  private loadEmptyTemplate() {
    if (this.auth.staffObject) {
      this.writerInfo = this.auth.staffObject;
    }
    this.referencesList = [];
    this.casList = [];
    this.moderations = [];
    this.createArticleForm.patchValue({
      subcategory: new FormControl({ value: "?", disabled: this.createArticleForm.value.category == '?' }, Validators.required)
    })
    this.cd.detectChanges();
  }

  private loadFullTemplate(articleId) {
    // Get current article's info from db.
    const dbArticleRef: DatabaseReference = this.auth.db.database.ref(`articles/drafts/${articleId}`);
    dbArticleRef.once('value', (snapshot) => {
      let articleObject: DraftArticleInfo = snapshot.val();
      if (articleObject) {
        // Initialise form with data from db.
        this.createArticleForm = new FormGroup({
          category: new FormControl(articleObject.category, Validators.required),
          subcategory: new FormControl(articleObject.subcategory, Validators.required),
          title: new FormControl(articleObject.title, Validators.required),
          subtitle: new FormControl(articleObject.subtitle, Validators.required),
          thumbURL: new FormControl(articleObject.thumbURL, Validators.required),
          body: new FormControl("", Validators.required)
        });

        // Fetch article body from db and insert into editor.
        this.auth.db.database.ref(`articleBodies/${articleId}`).once('value', (bodyData) => {
          let body: string = bodyData.val() || "";
          tinymce.get("bodyEditor").setContent(body);
          this.tieBody();
        })

        // Check image url.
        this.imageExists(articleObject.thumbURL);

        // Initialise references, CAS and moderations.
        this.referencesList = articleObject.references || [];
        this.casList = articleObject.cas || [];
        this.moderations = articleObject.moderations != undefined ? Object.values(articleObject.moderations) : [];

        // Set up database subscription for article author.
        this.subscriptions.push(this.auth.db.object<StaffProfile>(`staffProfiles/${articleObject.author}`).valueChanges().subscribe(data => {
          this.writerInfo = data;
          this.staffList = {
            [this.writerInfo.uid]: this.writerInfo
          }
        }));

        if (this.moderations.length > 0) {
          this.subscriptions.push(this.auth.staff$.subscribe(data => {
            this.staffList = data;
          }))
        }
      } else {
        // If no data exists for this article ID, redirect to home.
        this.router.navigate(['/']);
      }
    })

    // Refresh UI
    this.cd.detectChanges();
  }

  // Tie tinymce rich text editor to form controller.
  private tieBody() {
    this.createArticleForm.patchValue({
      body: tinymce.activeEditor.getContent()
    })
  }

  // Initialise tinymce editor.
  public handleEditorInit(e) {
    this.editorSubject.next(e.editor);
    this.editorSubject.complete();
  }

  // Fetch image using URL in textbox.
  public imageExists(imageURL) {
    // Play loading gif while fetching.
    this.currentImage = "url('https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif')";

    // Perform fetch http request.
    fetch(imageURL, { method: 'HEAD' })
      .then(res => {
        // If not found, display error.
        if (res.status == 404) {
          this.currentImage = "url('../../../assets/images/image-not-found.jpg')";
          // If found, display image
        } else {
          this.currentImage = `url('${imageURL}')`;
        }
        // Catch error
      }).catch(err => {
        if (err == 'TypeError: Failed to fetch') {
          this.currentImage = `url('${imageURL}')`;
        }
      });
  }


  public addListing(list, value) {
    if (value != "") {
      this[list].push(value);
    }
  }

  public removeListing(list, index) {
    this[list].splice(index, 1);
  }

  public createArticle(destination) {

    if (destination == 'delete') {
      if (this.currentArticleId) {
        this.auth.db.database.ref(`articles/drafts/${this.currentArticleId}`).set(null);
      }
      this.router.navigate(['/staff', 'overview']);
    } else if (this.createArticleForm.valid) {

      // Get timestamp for operation
      this.time['currentDate'] = new Date();
      this.time['timestamp'] = this.time['currentDate'].getTime();

      let dbArticlesRef: DatabaseReference;
      // Upload article to db.
      if (this.currentArticleId) {
        dbArticlesRef = this.auth.db.database.ref(`articles/${destination}/${this.currentArticleId}`);
      } else {
        dbArticlesRef = this.auth.db.database.ref(`articles/${destination}/`);
        this.currentArticleId = dbArticlesRef.push().key;
        dbArticlesRef = this.auth.db.database.ref(`articles/${destination}/${this.currentArticleId}`);
      }

      this.tieBody();

      // Update article info
      dbArticlesRef.set(<DraftArticleInfo>{
        articleId: this.currentArticleId,
        author: this.writerInfo.uid,
        category: this.createArticleForm.value.category,
        subcategory: this.createArticleForm.value.subcategory,
        title: this.createArticleForm.value.title,
        subtitle: this.createArticleForm.value.subtitle,
        thumbURL: this.createArticleForm.value.thumbURL,
        writtenDate: this.time['timestamp'],
        cas: this.casList.length > 0 ? this.casList : [" "],
        references: this.referencesList.length > 0 ? this.referencesList : [" "],
        moderations: destination == 'moderating' ? [] : this.moderations
      });

      // Update body
      this.auth.db.database.ref(`articleBodies/${this.currentArticleId}`).set(
        this.createArticleForm.value.body
      )

      // If pushing forward from drafts, remove from drafts.
      if (destination != 'drafts') {
        this.auth.db.database.ref(`articles/drafts/${this.currentArticleId}`).set(null);
      }

      // Return to homepage
      this.router.navigate(['/staff', 'overview']);
    } else {
      // If form checks are failed, display errors.
      this.showErrors = true;
    }
  }

  public deleteArticle() {
    this.auth.db.database.ref(`articles/drafts/${this.currentArticleId}`).set({});
    this.auth.db.database.ref(`articleBodies/${this.currentArticleId}`).set({});
  }

  // Get current time
  private getTime() {
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

  // Format time for display
  public makeTime(timestamp) {
    return new Date(timestamp).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  // Format name for display
  public getStaffName(uid) {
    if (this.staffList) {
      const author = this.staffList[uid];
      return `${author['firstName']} ${author['lastName']}`;
    } else {
      return "Name loading...";
    }
  }

  // Track ngfor
  public trackByFn(index, item) { return index; }

  ngOnDestroy(): void {
    if (this.subscriptions?.length > 0) {
      this.subscriptions.forEach((subscription: Subscription) => {
        subscription.unsubscribe();
      });
    }
    tinymce.remove('#bodyEditor');
  }
}


