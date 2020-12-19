import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title = 'ngSlick';


  slides = [
    "https://www.discovery.edu.hk/dcwebsite/wp-content/uploads/2015/02/Swimming-Banner-1500x550.jpg",
    "https://www.discovery.edu.hk/dcwebsite/wp-content/uploads/2015/02/Technology-Banner-1500x550.jpg",
    "https://www.discovery.edu.hk/dcwebsite/wp-content/uploads/2015/02/Athletics-Banner-1536x1024.jpg",
    "https://www.discovery.edu.hk/dcwebsite/wp-content/uploads/2015/02/Basketball-Banner-1536x1024.jpg",
    "https://www.discovery.edu.hk/dcwebsite/wp-content/uploads/2015/02/Cooking-Banner-1500x550.jpg"
  ];

  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "nextArrow": "<i class='nav-btn next-slide fas fa-angle-right'></i>",
    "prevArrow": "<i class='nav-btn prev-slide fas fa-angle-left'></i>",
    "dots": true,
    "infinite": true
  };

  addSlide() {
    this.slides.push("https://www.discovery.edu.hk/dcwebsite/wp-content/uploads/2015/02/Swimming-Banner-1500x550.jpg")
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }
  
}
