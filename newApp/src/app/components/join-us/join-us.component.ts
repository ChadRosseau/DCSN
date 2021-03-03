import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.css']
})
export class JoinUsComponent implements OnInit {
  guideRole;
  roles;
  images;

  constructor(public sharedData: SharedDataService) {
    this.setGuideRole('Contributors');
  }

  ngOnInit(): void {
    this.roles = Object.keys(this.sharedData.roleData);

    this.images = {
      hero1Background: this.sharedData.dcImages.groupPhoto,
      hero1Image: this.sharedData.dcImages.groupwork,
      hero3Background: 'url("https://www.discovery.edu.hk/dcwebsite/wp-content/uploads/2015/02/Cooking-Banner-1500x550.jpg")'
    }
  }

  setGuideRole(role) {
    this.guideRole = this.sharedData.roleData[role];
  }

}
