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
  dcEmail: boolean;
  permission: number;

  constructor(
    private afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public router: Router
  ) {

    sessionStorage.clear();
    this.dcEmail = false;
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.userKey = user.uid;
          this.checkPermission(user.uid, user.email, user.displayName, user.photoURL);
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
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.signOut();
    this.user$ = null;
    this.router.navigate(['/']);
    return location.reload();
  }

  async updateUserData({ uid, email, displayName, photoURL }: User) {
    // Set user data
    const dbUserRef = this.db.object<User>(`users/${uid}`);
    const data = {
      uid: uid,
      email: email,
      displayName: displayName,
      photoURL: photoURL
    }
    dbUserRef.set(data);
    this.user$ = dbUserRef.valueChanges();
    this.userKey = uid;
    if (email.includes("@dc.edu.hk")) {
      this.dcEmail = true;
    } else {
      this.dcEmail = false;
    }
    this.checkPermission(uid, email, displayName, photoURL);
    // return location.reload();
  }

  checkPermission(uid, email, displayName, photoURL) {
    this.db.object<any>('permissions').valueChanges().subscribe(value => {
      if (Object.keys(value).includes(this.userKey)) {
        this.isStaff = true;
        this.permission = value[this.userKey];
        let dbProfileRef = this.db.database.ref(`profiles/${this.userKey}`);
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
      } else {
        this.isStaff = false;
      }
    });
  }
}

