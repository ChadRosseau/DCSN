import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

// Services
import { AuthService } from '@services/auth.service';
import { SharedDataService } from '@services/shared-data.service';
import { Router } from '@angular/router';

// Interfaces
import { User } from '@interfaces/user';
import { StaffProfile } from '@interfaces/staff-profile';

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
  staffIds;
  tableReady;
  minPermission;

  newProfileId;

  constructor(public auth: AuthService, public sharedData: SharedDataService, public router: Router) { }

  ngOnInit(): void {

    // Hide table until data fetched.
    this.tableReady = false;

    // Clear array of staff showing, ready to be filled.
    this.staff = [];

    // Set creating of new profile to initially false.
    this.newProfileId = "";

    // Determine permission editing power of user.
    if (this.auth.permission > 1) {
      this.minPermission = this.auth.permission + 1;
    } else {
      this.minPermission = this.auth.permission;
    }

    // Fetch data on all users of site.
    this.auth.db.database.ref('users').once('value', (snapshot) => {
      this.users = snapshot.val();
      this.usersArray = Object.values(this.users);
    })

    // Fetch data on all staff.
    this.auth.db.database.ref('staffProfiles').once('value', (snapshot) => {
      this.profiles = snapshot.val();
      this.staffIds = Object.keys(this.profiles);
      this.staff = Object.values(this.profiles);
      this.sortTable()
    })
    this.tableReady = true;
  }

  toggleRole(uid, role) {
    let index = this.findWithAttr(this.staff, 'uid', uid);
    if (this.canEdit(this.staff[index].permission)) {
      if (this.staff[index].roles.includes(role)) {
        this.staff[index].roles = this.staff[index].roles.filter(e => { return e !== role });
        this.staff[index].description = this.makeDescription(this.staff[index].roles);
      } else {
        this.staff[index].roles.push(role);
        this.staff[index].roles = this.sortRoles(this.staff[index].roles);
        this.staff[index].description = this.makeDescription(this.staff[index].roles);
      }
    }
  }

  togglePublic(uid) {
    let index = this.findWithAttr(this.staff, 'uid', uid);
    if (this.canEdit(this.staff[index].permission)) {
      this.staff[index].public = !this.staff[index].public;
    }

  }

  addStaff(uid) {
    if (!uid) {
      console.log("No user selected");
      return;
    }
    this.newProfileId = "";
    let user = this.users[uid];
    let names = this.makeName(user.displayName);
    let description = this.makeDescription(user.roles);
    let newMember: StaffProfile = {
      uid: user.uid,
      public: true,
      email: user.email,
      firstName: names.firstName,
      lastName: names.lastName,
      description: description,
      photoURL: user.photoURL,
      roles: [],
      permission: 10
    }
    this.staff.push(newMember);
    this.staffIds.push(uid);
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

  makeDescription(roles) {
    if (!roles) {
      return "";
    }
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

  deleteStaff(uid) {
    let index = this.findWithAttr(this.staff, 'uid', uid);
    if (this.canEdit(this.staff[index].permission)) {
      this.staff = this.staff.filter((member) => {
        return member.uid != uid;
      })
      this.staffIds = this.staffIds.filter((id) => { return id != uid });
    }
    else { console.log("Deletion not permitted, permission level too low") }
  }

  setPermissions() {
    let newStaffObject = {};
    this.staff.forEach(staff => {
      newStaffObject[staff.uid] = staff;
    });
    console.log(newStaffObject);
    this.auth.db.database.ref('staffProfiles').set(newStaffObject);
    this.router.navigateByUrl('/staff/overview');
  }

  findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }

  canEdit(permissionLevel) {
    if (permissionLevel >= this.minPermission || !Number.isInteger(permissionLevel)) {
      return true;
    } else {
      return false;
    }
  }

  checkValid(profile) {
    if (profile.firstName && profile.lastName && profile.roles.length > 0 && Number.isInteger(profile.permission)) {
      return true;
    } else {
      return false;
    }
  }

  checkMin(uid) {
    let index = this.findWithAttr(this.staff, 'uid', uid);
    if (!Number.isInteger(this.staff[index].permission)) {
      this.staff[index].permission = 10;
    }
    else if (this.staff[index].permission < this.minPermission) {
      this.staff[index].permission = this.minPermission;
    }
    this.sortTable();
  }

  sortTable() {
    this.staff.sort((a, b) => {
      if (a.permission < b.permission) {
        return -1;
      }
      if (b.permission < a.permission) {
        return 1;
      }
      return 0;
    })
  }

  sortRoles(array) {
    let presetOrder = ['contributor', 'moderator', 'technology', 'graphics']
    var result = [],
      i, j;
    for (i = 0; i < presetOrder.length; i++)
      while (-1 != (j = array.indexOf(presetOrder[i])))
        result.push(array.splice(j, 1)[0]);
    return result;
  }
}
