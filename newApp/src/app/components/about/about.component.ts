import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  images;

  constructor(public sharedData: SharedDataService) { }

  ngOnInit(): void {
    this.images = {
      hero1Background: this.sharedData.dcImages.groupPhoto,
      hero3Background: this.sharedData.dcImages.map,
      hero5Background: this.sharedData.dcImages.groupwork,
    };
  }

}
