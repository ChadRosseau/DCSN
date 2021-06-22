import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { SharedDataService } from '@services/shared-data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  images;
  currentDepartment;
  profiles;
  number;

  constructor(public auth: AuthService, public sharedData: SharedDataService) { }

  ngOnInit(): void {
    this.images = {
      hero1Background: this.sharedData.dcImages.groupPhoto,
      hero3Background: this.sharedData.dcImages.map,
      hero5Background: this.sharedData.dcImages.groupwork,
    };
    this.currentDepartment = 'all';
    let dbProfileRef = this.auth.db.database.ref(`staffProfiles`);
    dbProfileRef.once('value', (snapshot) => {
      let data = Object.values(snapshot.val());
      for (let i = 0; i < data.length; i++) {
        if (!data[i]['public']) {
          data.splice(i, 1);
        } else {
          if (!data[i]['description'] || data[i]['description'] == 'none') {
            data[i]['description'] = this.makeDescription(data[i]['roles']);
          }
        }
      }
      data.sort((a, b) => {
        if (a['permission'] == 0) {
          a['permission'] = 1.5;
        } else if (b['permission'] == 0) {
          b['permission'] = 1.5;
        }

        if (a['permission'] < b['permission']) {
          return -1;
        } else if (b['permission'] < a['permission']) {
          return 1;
        } else {
          return 0;
        }
      });
      this.profiles = data;
    });
    this.number = Array(12).fill(0);
  }

  setDepartment(department) {
    this.currentDepartment = department;
    document.getElementById('staffWrapper').scrollTop = 0;
  }

  checkDepartment(array) {
    if (array.includes(this.currentDepartment) || this.currentDepartment == 'all') {
      return true;
    } else {
      return false;
    }
  }

  checkImportant(permission) {
    if (permission <= 5) {
      return true;
    } else {
      return false;
    }
  }

  makeDescription(roles) {
    let description = "";
    for (let i = 0; i < roles.length; i++) {
      const element = roles[i];
      switch (element) {
        case 'contributor':
          description += "Contributor";
          break;
        case 'moderator':
          description += "Moderator";
          break;
        case 'technology':
          description += "ICT Technician";
          break;
        case 'graphics':
          description += "Graphic Designer";
          break;
      }
      if (i < roles.length - 1) {
        description += ", ";
      }
    }
    return description;
  }
}
