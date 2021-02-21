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

  constructor(public sharedData: SharedDataService) {
    this.setGuideRole('Contributors');
  }

  ngOnInit(): void {
    this.roles = Object.keys(this.sharedData.roleData);
  }

  setGuideRole(role) {
    this.guideRole = this.sharedData.roleData[role];
    console.log(this.guideRole);
  }

}
