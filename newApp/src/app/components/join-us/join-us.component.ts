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
      hero1Background: this.sharedData.dcImages.presentation,
      hero1Image: this.sharedData.dcImages.groupwork,
    }
  }

  setGuideRole(role) {
    this.guideRole = this.sharedData.roleData[role];
  }

}
