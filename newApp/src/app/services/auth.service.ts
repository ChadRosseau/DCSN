import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import {
  AngularFireDatabase,
} from '@angular/fire/database';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  user;
  staff$;
  staffObject;
  isStaff: boolean;
  permission: number;

  constructor(
    private afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public router: Router
  ) {
    sessionStorage.clear();
    this.user = {};
    this.staffObject = null;
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          let newUid;
          if (user.email.includes("@dc.edu.hk")) {
            newUid = user.email.split("@")[0];
          } else {
            newUid = user.uid;
          }
          this.user.userKey = newUid;
          this.checkPermission();
          return this.db.object<User>(`users/${newUid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
    this.staff$ = this.db.object<any>(`staffProfiles`).valueChanges();
  }

  async googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.signOut();
    this.user$ = null;
    this.router.navigate(['/']);
    return location.reload();
  }

  async updateUserData({ uid, email, displayName, photoURL }: User) {
    let newUid;
    if (email.includes("@dc.edu.hk")) {
      newUid = email.split("@")[0];
    } else {
      newUid = uid;
    }
    // Set user data
    const dbUserRef = this.db.object<User>(`users/${newUid}`);
    const data = {
      uid: newUid,
      email: email,
      displayName: displayName,
      photoURL: photoURL
    }
    dbUserRef.set(data);
    this.user$ = dbUserRef.valueChanges();
    this.user$.subscribe(data => {
      this.user = data;
      console.log(this.user);
    });
    this.checkPermission();
    // return location.reload();
  }

  checkPermission() {
    this.db.object<any>(`staffProfiles/${this.user.userKey}`).valueChanges().subscribe(value => {
      if (value) {
        this.isStaff = true;
        console.log(value)
        this.staffObject = value;
      } else {
        this.isStaff = false;
      }
    });
  }

  canEditArticle(overridePermission, role, author) {
    if (this.staffObject.permission <= overridePermission) {
      return true;
    } else {
      if (role == "contributor") {
        if (this.staffObject.roles.includes(role) && (this.staffObject.uid == author || author == null)) {
          return true;
        } else {
          return false;
        }
      } else if (role == "moderator") {
        if (this.staffObject.roles.includes(role) && (this.staffObject.uid != author || author == null)) {
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }
}

