import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
  //public categories = ['Sustainability', 'Poverty', 'Economy', 'Politics'];
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
    console.log(value);
    this.currentSubcategories = this.subcategories[value];
  }
}


