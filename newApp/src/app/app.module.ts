import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Environment
import { environment } from '../environments/environment';

// Carousel
import { SlickCarouselModule } from 'ngx-slick-carousel';

// Firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Component imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { JoinUsComponent } from './components/join-us/join-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { CarouselComponent } from './components/home/carousel/carousel.component';
import { NewStoriesComponent } from './components/home/new-stories/new-stories.component';
import { GlobalGoalsComponent } from './components/home/global-goals/global-goals.component';
import { ArticleComponent } from './components/article/article.component';
import { ArchiveComponent } from './components/archive/archive.component';

// Service imports
import { AuthService } from './services/auth.service';
import { ArchiveService } from './services/archive.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    JoinUsComponent,
    ContactComponent,
    CreatePostComponent,
    CarouselComponent,
    NewStoriesComponent,
    GlobalGoalsComponent,
    ArticleComponent,
    ArchiveComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    SlickCarouselModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
