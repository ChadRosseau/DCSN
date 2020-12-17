import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Component imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { JoinUsComponent } from './join-us/join-us.component';
import { ContactComponent } from './contact/contact.component';
import { CreatePostComponent } from './create-post/create-post.component';

const firebaseConfig = {
  apiKey: 'AIzaSyD1qHH3zsiDBGVJL1lusKecWhZjTDyo1AU',
  authDomain: 'dcsn-e8f7a.firebaseapp.com',
  databaseURL: 'https://dcsn-e8f7a-default-rtdb.firebaseio.com',
  projectId: 'dcsn-e8f7a',
  storageBucket: 'dcsn-e8f7a.appspot.com',
  messagingSenderId: '327191415154',
  appId: '1:327191415154:web:a4653bfb4629a94f79f5eb',
  measurementId: 'G-300TVBWZ72',
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    JoinUsComponent,
    ContactComponent,
    CreatePostComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
