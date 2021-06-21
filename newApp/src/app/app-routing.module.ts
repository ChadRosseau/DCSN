import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@components/login/login.component';

// Components
import { AboutComponent } from './components/about/about.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { ArticleComponent } from './components/article/article.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { HomeComponent } from './components/home/home.component';
import { JoinUsComponent } from './components/join-us/join-us.component';

import { StaffGuard } from './guards/staff.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'join-us', component: JoinUsComponent },
  {
    path: 'create-post',
    component: CreatePostComponent,
    canActivate: [StaffGuard]
  },
  { path: 'article/:articleId', component: ArticleComponent },
  { path: 'archive', component: ArchiveComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
