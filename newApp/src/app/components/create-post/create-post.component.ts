import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
    blurb: string,
    body: string
  }

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.newArticle = {
      category: "",
      subcategory: "",
      title: "",
      subtitle: "",
      blurb: "",
      body: ""
    }
  }

  public subcategories = {
    Economy: [
      'Responsible Consumption',
      'Decent Work',
      'Industry & Innovation',
      'Wealth Inequality',
    ],
    Poverty: [
      'Hunger',
      'Health & Wellbeing',
      'Education',
      'Clean Water & Sanitation',
      'Gender Equality'
    ],
    Sustainability: [
      'Clean Energy',
      'Climate Action',
      'Life On Land',
      'Life Below Water',
      'Sustainable Cities'
    ],
    Politics: [
      'Peace & Justice',
      'Partnerships'
    ]
  };

  public categories = Object.keys(this.subcategories);

  public currentSubcategories;

  setCategory(value) {
    this.currentSubcategories = this.subcategories[value];
  }

  createArticle(category, subcategory) {
    // Set category and subcategory info
    this.newArticle.category = category;
    this.newArticle.subcategory = subcategory;

    // Upload article to db.
    console.log(this.newArticle);

    const dbArticlesRef = this.auth.db.database.ref(`articles/${category}/${subcategory}`);
    let newPush = dbArticlesRef.push()
    let pushId = newPush.key;
    newPush.set({
      articleId: pushId,
      author: this.auth.userKey,
      category: this.newArticle.category,
      subcategory: this.newArticle.subcategory,
      title: this.newArticle.title,
      subtitle: this.newArticle.subtitle,
      blurb: this.newArticle.blurb,
      body: this.newArticle.body
    });
  }
}


