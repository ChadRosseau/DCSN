import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  //public categories = ['Sustainability', 'Poverty', 'Economy', 'Politics'];
  public subcategories = [
    {
      key: 'Sustainability',
      value: [
        'Clean Energy',
        'Climate Action',
        'Life Below Water',
        'Sustainable Cities',
      ],
    },
    {
      key: 'Poverty',
      value: [
        'Hunger',
        'Health & Wellbeing',
        'Education',
        'Clean Water & Sanitation',
        'Gender Equality',
      ],
    },
    {
      key: 'Economy',
      value: [
        'Responsible Consumption',
        'Decent Work',
        'Industry & Innovation',
        'Wealth Inequality',
      ],
    },
    { key: 'Politics', value: ['Peace & Justice', 'Partnerships'] },
  ];
}
