import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

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

  public colors = {
    categories: {
      Economy: 'rgba(253, 255, 156, 0.85)',
      Poverty: 'rgba(255, 141, 141, 0.85)',
      Sustainability: 'rgba(173, 255, 162, 0.85)',
      Politics: 'rgba(166, 237, 255, 0.85)'
    },
    subcategories: {
      Economy: 'rgba(213, 214, 132, 0.6)',
      Poverty: 'rgba(212, 119, 119, 0.6)',
      Sustainability: 'rgba(128, 189, 120, 0.6)',
      Politics: 'rgba(126, 203, 223, 0.6)'
    }
  }

  constructor() { }
}
