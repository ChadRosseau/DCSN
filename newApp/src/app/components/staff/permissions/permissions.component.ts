import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

// Services
import { AuthService } from '@services/auth.service';
import { SharedDataService } from '@services/shared-data.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {
  staff;
  constructor(public auth: AuthService, public sharedData: SharedDataService) { }

  ngOnInit(): void {
    this.auth.db.database.ref('permissions').once('value', (snapshot) => {
      let data = snapshot.val();
      this.staff = Object.keys(data).map(key => {
        return {
          id: key,
          permission: data[key]
        };
      })
      // console.log(this.staff);
      // for (let i = 0; i < this.staff.length; i++) {
      //   this.staff[i] = {
      //     id: this.staff[i][0],
      //     permission: this.staff[i][1]
      //   }
      // }
      console.log(this.staff);
    }).then(() => {
      this.auth.db.database.ref('profiles').once('value', (snapshot) => {
        let data = snapshot.val();
        this.staff.forEach(member => {
          member['firstName'] = data[member.id]['firstName'];
          member['lastName'] = data[member.id]['lastName']
        });
        this.staff.sort((a, b) => {
          if (a['permission'] < b['permission']) {
            return -1;
          }
          if (b['permission'] < a['permission']) {
            return 1;
          }
          return 0;
        })
      })
    }
    )
  }

}
