import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

// Services
import { AuthService } from '@services/auth.service';
import { SharedDataService } from '@services/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {
  users;
  usersArray;
  profiles;
  profilesArray;
  staff;
  tableReady;
  minPermission;

  constructor(public auth: AuthService, public sharedData: SharedDataService, public router: Router) { }

  ngOnInit(): void {
    if (this.auth.permission > 1) {
      this.minPermission = this.auth.permission + 1;
    } else {
      this.minPermission = this.auth.permission;
    }
    this.auth.db.database.ref('users').once('value', (snapshot) => {
      this.users = snapshot.val();
      this.usersArray = Object.values(this.users);
    })
    this.staff = [];
    this.tableReady = false;
    this.auth.db.database.ref('profiles').once('value', (snapshot) => {
      this.profiles = snapshot.val();
      this.profilesArray = Object.values(this.profiles);
      this.profilesArray.forEach(member => {
        if (Number.isInteger(member['permission'])) {
          let rolesArray = member.roles;
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
          this.staff.push({
            uid: member.uid,
            photoURL: member.photoURL,
            firstName: member.firstName,
            lastName: member.lastName,
            rolesHTML: rolesHTML,
            permission: member.permission
          })
        }
      });
      this.staff.sort((a, b) => {
        if (a.permission < b.permission) {
          return -1;
        }
        if (b.permission < a.permission) {
          return 1;
        }
        return 0;
      })
    })
    this.tableReady = true;
  }

  addPermission(uid) {
    let dbProfileRef = this.auth.db.database.ref(`profiles/${uid}`);
    dbProfileRef.once('value', (snapshot) => {
      if (!snapshot.val()) {
        dbProfileRef.set({
          complete: false,
          uid: uid,
          email: email,
          firstName: "First Name",
          lastName: "Last Name",
          photoURL: photoURL,
          roles: []
        });
      }
    })
  }

  makeProfile(uid) {
    let user = this.users[uid];
    let names = this.makeName(user.displayName);
    let profile = {
      complete: false,
      uid: user.uid,
      email: user.email,
      firstName: names.firstName,
      lastName: names.lastName,
      photoURL: user.photoURL,
      roles: []
    }
    return profile;
  }

  makeName(nameString) {
    let firstNames = [], lastNames = [];
    let names = nameString.split(' ')
    nameLoop:
    for (let i = 0; i < names.length; i++) {
      let name = names[i];
      for (let j = 0; j < name.length; j++) {
        let character = name[j];
        if (character == character.toLowerCase()) {
          firstNames.push(name);
          continue nameLoop;
        }
      }
      lastNames.push(name);
    };

    let firstName, lastName;
    for (let i = 0; i < firstNames.length; i++) {
      let name = firstNames[i];
      if (i != 0) {
        firstName = firstName + " " + name;
      } else {
        firstName = name;
      }
    }
    for (let i = 0; i < lastNames.length; i++) {
      let name = lastNames[i];
      if (i != 0) {
        lastName = lastName + " " + name;
      } else {
        lastName = name;
      }
    }

    return {
      firstName,
      lastName
    }
  }

  deletePermission(uid) {
    this.staff = this.staff.filter((member) => {
      return member.uid != uid;
    })
  }

  setPermissions() {
    console.log(this.staff);
    this.staff.forEach(staff => {
      this.profiles[staff.uid].permission = staff.permission;
    });
    this.auth.db.database.ref('profiles').set(this.profiles);
    this.router.navigateByUrl('/staff/overview');
  }
}
