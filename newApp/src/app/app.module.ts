import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

// Environment
import { environment } from '../environments/environment';

// Carousel
import { SlickCarouselModule } from 'ngx-slick-carousel';

// Tiny Text Editor
import { EditorModule } from '@tinymce/tinymce-angular';

// Firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Http requests
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArrayReversePipe } from './pipes/array-reverse.pipe';
import { FooterComponent } from './components/footer/footer.component';

// Pipes
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

// Guards
import { StaffGuard } from './guards/staff.guard';

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
    ArrayReversePipe,
    FooterComponent,
    SafeHtmlPipe,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    SlickCarouselModule,
    BrowserModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [StaffGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
