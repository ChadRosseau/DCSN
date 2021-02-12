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
  // Filters for archive
  filters: {
    categories: Array<any>,
    subcategories: Array<any>,
    words: Array<any>
  }

  constructor(
    private afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public router: Router
  ) {

    this.filters = {
      categories: [],
      subcategories: [],
      words: []
    }

    sessionStorage.clear();
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.userKey = user.uid;
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
    console.log(this.userKey);
    // return location.reload();
  }
}

