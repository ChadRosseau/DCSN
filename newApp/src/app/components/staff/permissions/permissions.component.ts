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
  users;

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
    }).then(() => {
      this.auth.db.database.ref('profiles').once('value', (snapshot) => {
        let data = snapshot.val();
        this.users = data;
        this.staff.forEach(member => {
          member['firstName'] = data[member.id]['firstName'];
          member['lastName'] = data[member.id]['lastName'];
          let rolesArray = data[member.id]['roles'];
          let rolesHTML = "";
          rolesArray.forEach(role => {
            if (role == "contributor") {
              rolesHTML += `<i class="roleIcon far fa-edit"></i>`;
            } else if (role == "moderator") {
              rolesHTML += `<i class="roleIcon far fa-copy"></i>`;
            } else if (role == "technology") {
              rolesHTML += `<i class="roleIcon fas fa-laptop-code"></i>`;
            } else if (role == "graphics") {
              rolesHTML += `<i class="roleIcon fas fa-palette"></i>`;
            } else {
              console.log("unknown role found");
            }
          });
          console.log(rolesHTML)
          member['rolesHTML'] = rolesHTML;
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
