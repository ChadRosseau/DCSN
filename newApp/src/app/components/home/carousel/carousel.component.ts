import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '@services/shared-data.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor(public sharedData: SharedDataService) { }

  ngOnInit(): void {
  }

  title = 'ngSlick';


  slides = [
    this.sharedData.dcImages.presentation,
    this.sharedData.dcImages.groupwork,
    this.sharedData.dcImages.map,
    this.sharedData.dcImages.techDuo
  ];

  slideConfig = {
    "autoplay": true,
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
    //   console.log('afterChange');
  }

  beforeChange(e) {
    //   console.log('beforeChange');
  }

}
