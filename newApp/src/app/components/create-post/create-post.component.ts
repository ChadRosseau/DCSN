import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SharedDataService } from '../../services/shared-data.service';

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

  public currentSubcategories;

  setCategory(value) {
    this.currentSubcategories = this.sharedData.subcategories[value];
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


