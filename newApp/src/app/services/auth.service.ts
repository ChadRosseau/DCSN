import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import {
  AngularFireDatabase,
} from '@angular/fire/database';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  userKey: string;
  isStaff: boolean;
  permission: number;

  constructor(
    private afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public router: Router
  ) {

    sessionStorage.clear();
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.userKey = user.uid;
          this.checkPermission();
          return this.db.object<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  async googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    console.log(credential.user);
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
    this.userKey = uid;
    this.checkPermission();
    // return location.reload();
  }

  checkPermission() {
    this.db.object<any>('staffProfiles').valueChanges().subscribe(value => {
      if (Object.keys(value).includes(this.userKey)) {
        this.isStaff = true;
        this.permission = value[this.userKey]['permission'];
      } else {
        this.isStaff = false;
      }
    });
  }
}

